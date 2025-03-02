import { type FC, useState } from 'react';
import FeatureDemo from '../feature-demo';
import styles from './index.module.scss';

interface Feature {
  title: string;
  description: string;
  codeDemos: Array<{
    code: string;
    filename?: string;
  }>;
  isReversed?: boolean;
  lang?: string;
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
        codeDemos={feature.codeDemos}
        isReversed={feature.isReversed}
      />
    </div>
  );
};

export default FeatureGroup;