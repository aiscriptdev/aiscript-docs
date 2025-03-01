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
        title={features[activeIndex].title}
        description={features[activeIndex].description}
        code={features[activeIndex].code}
        filename={features[activeIndex].filename}
        isReversed={features[activeIndex].isReversed}
      />
    </div>
  );
};

export default FeatureGroup;