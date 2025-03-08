import { type FC } from 'react';
import styles from './index.module.scss';

const VersionCard: FC = () => {
    return (
        <div className={styles.versionCard}>
            <div className={styles.content}>
                <div className={styles.version}>
                    <span className={styles.label}>Latest Version</span>
                    <span className={styles.value}>v0.1.0</span>
                </div>
                <div className={styles.command}>
                    <code className={styles.commandText}>
                        curl https://aiscript.dev/install.sh | sh
                    </code>
                </div>
            </div>
        </div>
    );
};

export default VersionCard;