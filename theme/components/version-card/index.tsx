import { type FC } from 'react';
import styles from './index.module.scss';
import { useState, useCallback, useEffect, useRef } from 'react';

const VersionCard: FC = () => {
    const [copied, setCopied] = useState(false);
    const [currentTab, setCurrentTab] = useState('cargo');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const commands = {
        cargo: 'cargo install aiscript',
        shell: 'curl https://aiscript.dev/install.sh | sh',
        powershell: 'iwr https://aiscript.dev/install.ps1 | iex',
    };

    const handleCopy = useCallback(() => {
        if (isMobile) return;
        navigator.clipboard.writeText(commands[currentTab]).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [currentTab, commands, isMobile]);

    const handleTabClick = useCallback((tab: keyof typeof commands) => {
        setCurrentTab(tab);
    }, []);

    return (
        <div className={styles.versionCard}>
            <div className={styles.content}>
                <div className={styles.version}>
                    <span className={styles.label}>Latest Version</span>
                    <span className={styles.value}>v0.2.0</span>
                </div>
                <div style={{ marginTop: '15px', width: '100%' }}>
                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${currentTab === 'cargo' ? styles.active : ''}`}
                            onClick={() => handleTabClick('cargo')}
                        >
                            cargo
                        </button>
                        <button
                            className={`${styles.tab} ${currentTab === 'shell' ? styles.active : ''}`}
                            onClick={() => handleTabClick('shell')}
                        >
                            shell
                        </button>
                        <button
                            className={`${styles.tab} ${currentTab === 'powershell' ? styles.active : ''}`}
                            onClick={() => handleTabClick('powershell')}
                        >
                            powershell
                        </button>
                    </div>
                    <div className={`${styles.command} ${copied ? styles.copied : ''}`}>
                        <code className={styles.commandText}>
                            {commands[currentTab]}
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
        </div>
    );
};

export default VersionCard;