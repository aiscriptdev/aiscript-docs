import { type FC } from 'react';
import styles from './index.module.scss';
import { useState, useCallback, useEffect, useRef } from 'react';

const VersionCard: FC = () => {
    const [copied, setCopied] = useState(false);
    const [currentCommand, setCurrentCommand] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout>();

    const commands = [
        'curl https://aiscript.dev/install.sh | sh',
        'cargo install aiscript'
    ];

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(commands[currentCommand]).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [currentCommand, commands]);

    const switchCommand = useCallback(() => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentCommand((prev) => (prev + 1) % commands.length);
            setIsFading(false);
        }, 300);
    }, [commands.length]);

    useEffect(() => {
        if (!isHovered) {
            intervalRef.current = setInterval(switchCommand, 3000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, switchCommand]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    return (
        <div className={styles.versionCard}>
            <div className={styles.content}>
                <div className={styles.version}>
                    <span className={styles.label}>Latest Version</span>
                    <span className={styles.value}>v0.1.0</span>
                </div>
                <div 
                    className={`${styles.command} ${copied ? styles.copied : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <code className={`${styles.commandText} ${isFading ? styles.fade : ''}`}>
                        {commands[currentCommand]}
                    </code>
                    <button 
                        className={styles.copyButton}
                        onClick={handleCopy}
                        title="Copy to clipboard"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VersionCard;