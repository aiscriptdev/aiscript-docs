import { useState, type FC } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDemo = codeDemos[activeIndex];

  return (
    <div className={styles.featureDemo}>
      <div className={`${styles.container} ${isReversed ? styles.reversed : ''}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.codeWrapper}>
          <CodeDemo 
            code={activeDemo.code} 
            filename={activeDemo.filename} 
            codeDemos={codeDemos}
            activeIndex={activeIndex}
            onTabChange={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureDemo;