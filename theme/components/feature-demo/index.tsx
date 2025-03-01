import { type FC } from 'react';
import CodeDemo from '../code-demo';
import styles from './index.module.scss';

interface FeatureDemoProps {
  title: string;
  description: string;
  code: string;
  filename?: string;
  isReversed?: boolean;
}

const FeatureDemo: FC<FeatureDemoProps> = ({
  title,
  description,
  code,
  filename,
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
          <CodeDemo code={code} filename={filename} />
        </div>
      </div>
    </div>
  );
};

export default FeatureDemo;