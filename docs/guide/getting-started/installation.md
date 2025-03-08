# Installation

## Quick Install

You can quickly install AIScript using our installation script directly from GitHub:

```bash
curl https://aiscript.dev/install.sh | sh
```

Or if you prefer wget:

```bash
wget -q -O- https://aiscript.dev/install.sh | sh
```

This script will:
1. Detect your OS and architecture
2. Download the appropriate binary
3. Verify the checksum
4. Install AIScript to `~/.aiscript/bin/`
5. Add this directory to your PATH (if needed)

## Install via Cargo

```
$ cargo install aiscript

$ aiscript --version
```

## Manual Installation

If you prefer manual installation, you can download the appropriate binary for your platform from the [Releases page](https://github.com/aiscript-dev/aiscript/releases).

## Linux

```bash
# Download the binary
curl -L -o aiscript https://github.com/aiscript-dev/aiscript/releases/latest/download/aiscript-linux-x86_64

# Make it executable
chmod +x aiscript

# Move to a directory in your PATH
sudo mv aiscript /usr/local/bin/
```

## macOS

```bash
# Download the appropriate binary for your architecture (Intel or M1/M2)
# For Intel Macs (x86_64):
curl -L -o aiscript https://github.com/aiscript-dev/aiscript/releases/latest/download/aiscript-macos-x86_64
# For Apple Silicon (M1/M2):
curl -L -o aiscript https://github.com/aiscript-dev/aiscript/releases/latest/download/aiscript-macos-arm64

# Make it executable
chmod +x aiscript

# Move to a directory in your PATH
sudo mv aiscript /usr/local/bin/
```

## Windows

1. Download the [Windows executable](https://github.com/aiscript-dev/aiscript/releases/latest/download/aiscript-windows-x86_64.exe)
2. Rename it to `aiscript.exe` if desired
3. Move it to a directory in your PATH or create a directory for it and add that to your PATH

## Building from Source

If you prefer to build AIScript from source, you'll need Rust installed:

```bash
# Clone the repository
$ git clone https://github.com/aiscript-dev/aiscript.git
$ cd aiscript
# Build in release mode
$ cargo build --release

# The binary will be in target/release/aiscript
```
