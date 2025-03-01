import { type FC, useState } from 'react';
import FeatureDemo from '../feature-demo';
import styles from './index.module.scss';

interface Feature {
  title: string;
  description: string;
  code: string;
  filename?: string;
  isReversed?: boolean;
}

interface FeatureGroupProps {
  features: Feature[];
}

const FeatureGroup: FC<FeatureGroupProps> = ({ features }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const feature = features[activeIndex];
  return (
    <div className={styles.featureGroup}>
      <div className={styles.tabs}>
        {features.map((feature, index) => (
          <button
            key={index}
            className={`${styles.tab} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {feature.title}
          </button>
        ))}
      </div>
      <FeatureDemo
        title={feature.title}
        description={feature.description}
        code={feature.code}
        filename={feature.filename}
        isReversed={feature.isReversed}
      />
    </div>
  );
};

export default FeatureGroup;