#!/bin/sh
# AIScript Installer
# This script detects the user's OS and architecture and downloads the appropriate AIScript binary

set -e

# Print error message and exit
die() {
    echo "Error: $1" >&2
    exit 1
}

# Get latest version from GitHub API
get_latest_version() {
    if command -v curl >/dev/null 2>&1; then
        VERSION=$(curl -s https://api.github.com/repos/aiscript-dev/aiscript/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    elif command -v wget >/dev/null 2>&1; then
        VERSION=$(wget -q -O- https://api.github.com/repos/aiscript-dev/aiscript/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
    else
        die "Neither curl nor wget found, please install one of them"
    fi

    if [ -z "$VERSION" ]; then
        die "Could not determine the latest version"
    fi

    echo "$VERSION"
}

# Detect OS and architecture
detect_platform() {
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)

    case "$OS" in
        linux*)
            OS="linux"
            ;;
        darwin*)
            OS="macos"
            ;;
        msys* | mingw* | cygwin* | win*)
            OS="windows"
            ;;
        *)
            die "Unsupported operating system: $OS"
            ;;
    esac

    case "$ARCH" in
        x86_64 | amd64)
            ARCH="x86_64"
            ;;
        arm64 | aarch64)
            if [ "$OS" = "macos" ]; then
                ARCH="arm64"
            else
                die "Unsupported architecture: $ARCH for $OS"
            fi
            ;;
        *)
            die "Unsupported architecture: $ARCH"
            ;;
    esac

    # Return platform identifier
    if [ "$OS" = "windows" ]; then
        echo "aiscript-$OS-$ARCH.exe"
    else
        echo "aiscript-$OS-$ARCH"
    fi
}

# Download a file
download() {
    URL="$1"
    OUTPUT="$2"

    if command -v curl >/dev/null 2>&1; then
        HTTP_CODE=$(curl -L -s -w "%{http_code}" "$URL" -o "$OUTPUT")
        if [ "$HTTP_CODE" != "200" ]; then
            die "Failed to download $URL (HTTP Status: $HTTP_CODE)"
        fi
    elif command -v wget >/dev/null 2>&1; then
        if ! wget --server-response -q "$URL" -O "$OUTPUT" 2>&1 | grep -q '200 OK'; then
            die "Failed to download $URL"
        fi
    else
        die "Neither curl nor wget found, please install one of them"
    fi
}

# Verify the checksum of the downloaded file
verify_checksum() {
    FILE="$1"
    EXPECTED_CHECKSUM="$2"

    if command -v shasum >/dev/null 2>&1; then
        ACTUAL_CHECKSUM=$(shasum -a 256 "$FILE" | cut -d ' ' -f 1)
    elif command -v sha256sum >/dev/null 2>&1; then
        ACTUAL_CHECKSUM=$(sha256sum "$FILE" | cut -d ' ' -f 1)
    else
        echo "Warning: Neither shasum nor sha256sum found, skipping checksum verification"
        return 0
    fi

    if [ "$ACTUAL_CHECKSUM" != "$EXPECTED_CHECKSUM" ]; then
        die "Checksum verification failed (expected: $EXPECTED_CHECKSUM, got: $ACTUAL_CHECKSUM)"
    fi

    echo "Checksum verification successful"
}

# Main function
main() {
    echo "AIScript Installer"
    echo "----------------"

    # Detect platform
    PLATFORM=$(detect_platform)
    echo "Detected platform: $PLATFORM"

    # Get latest version
    VERSION=$(get_latest_version)
    echo "Latest version: $VERSION"

    # Download binary
    BINARY_URL="https://github.com/aiscript-dev/aiscript/releases/download/${VERSION}/${PLATFORM}"
    CHECKSUM_URL="https://github.com/aiscript-dev/aiscript/releases/download/${VERSION}/checksums.txt"
    
    echo "Downloading AIScript binary..."
    TMP_DIR=$(mktemp -d)
    BINARY_PATH="$TMP_DIR/aiscript"
    CHECKSUM_PATH="$TMP_DIR/checksums.txt"
    
    download "$BINARY_URL" "$BINARY_PATH"
    download "$CHECKSUM_URL" "$CHECKSUM_PATH"

    # Verify checksum
    echo "Verifying checksum..."
    EXPECTED_CHECKSUM=$(grep "$PLATFORM" "$CHECKSUM_PATH" | cut -d ' ' -f 1)
    verify_checksum "$BINARY_PATH" "$EXPECTED_CHECKSUM"

    # Install binary
    INSTALL_DIR="$HOME/.aiscript/bin"
    INSTALL_PATH="$INSTALL_DIR/aiscript"
    
    mkdir -p "$INSTALL_DIR"
    
    echo "Installing AIScript to $INSTALL_PATH..."
    cp "$BINARY_PATH" "$INSTALL_PATH"
    chmod +x "$INSTALL_PATH"

    # Clean up
    rm -rf "$TMP_DIR"

    # Add to PATH if needed
    if [ -n "$SHELL" ]; then
        SHELL_NAME=$(basename "$SHELL")
        if [ "$SHELL_NAME" = "bash" ]; then
            PROFILE="$HOME/.bashrc"
        elif [ "$SHELL_NAME" = "zsh" ]; then
            PROFILE="$HOME/.zshrc"
        elif [ "$SHELL_NAME" = "fish" ]; then
            PROFILE="$HOME/.config/fish/config.fish"
        else
            PROFILE="$HOME/.profile"
        fi

        if ! echo "$PATH" | grep -q "$INSTALL_DIR"; then
            echo "Adding AIScript to PATH in $PROFILE..."
            if [ "$SHELL_NAME" = "fish" ]; then
                echo 'set -gx PATH $PATH '"$INSTALL_DIR" >> "$PROFILE"
            else
                echo 'export PATH="$PATH:'"$INSTALL_DIR"'"' >> "$PROFILE"
            fi
            echo "Please restart your shell or run 'source $PROFILE' to update your PATH."
        fi
    else
        echo "To use AIScript, add $INSTALL_DIR to your PATH."
    fi

    echo "AIScript $VERSION has been installed successfully!"
    echo "Run 'aiscript --help' to get started."
}

main