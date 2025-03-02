import { type FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tab, Tabs, getCustomMDXComponent } from 'rspress/theme';
import CodeDemo from '../code-demo';
import styles from './index.module.scss';

interface CodeDemoItem {
    code?: string;
    img?: string;
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
                    <ReactMarkdown
                        components={getCustomMDXComponent() as Record<string, React.ElementType>}
                        skipHtml={true}
                    >
                        {description}
                    </ReactMarkdown>
                </div>
                <div className={styles.codeWrapper}>
                    <Tabs>
                        {codeDemos.map((demo) => (
                            <Tab key={demo.filename} label={demo.filename}>
                                <CodeDemo
                                    code={demo.code}
                                    img={demo.img}
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