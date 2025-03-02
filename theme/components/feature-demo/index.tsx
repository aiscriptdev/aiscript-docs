import { type FC } from 'react';
import { Tab, Tabs } from 'rspress/theme';
import CodeDemo from '../code-demo';
import styles from './index.module.scss';

interface CodeDemoItem {
    code: string;
    filename?: string;
}

interface FeatureDemoProps {
    title: string;
    description: string;
    codeDemos: CodeDemoItem[];
    isReversed?: boolean;
}

const FeatureDemo: FC<FeatureDemoProps> = ({
    title,
    description,
    codeDemos,
    isReversed = false,
}) => {
    return (
        <div className={styles.featureDemo}>
            <div className={`${styles.container} ${isReversed ? styles.reversed : ''}`}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.codeWrapper}>
                    <Tabs>
                        {codeDemos.map((demo) => (
                            <Tab key={demo.filename} label={demo.filename}>
                                <CodeDemo
                                    code={demo.code}
                                />
                            </Tab>
                        ))}
                    </Tabs>

                </div>
            </div>
        </div>
    );
};

export default FeatureDemo;