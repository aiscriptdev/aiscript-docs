import { BackgroundImage } from '../background-image';
import { Hero } from '../hero';
import FeatureGroup from '../feature-group';
import VersionCard from '../version-card';
import styles from './index.module.scss';

import { useCallback } from 'react';
import { useNavigate } from 'rspress/runtime';
import featureData from './features.yaml';

const LandingPage = () => {
    const navigate = useNavigate();
    const onClickGetStarted = useCallback(() => {
        navigate('/guide/getting-started/introduction');
    }, [navigate]);

    return (
        <div className={styles.landingPage}>
            <BackgroundImage />
            <Hero
                showStars
                subTitle="The next generation language for human and AI."
                getStartedButtonText='getStarted'
                githubURL="https://github.com/aiscriptdev/aiscript"
                onClickGetStarted={onClickGetStarted}
            />
            <VersionCard />
            {
                Object.entries(featureData).map(([key, features], index) => {
                    const featureList = features.map((feature) => ({
                        ...feature,
                        isReversed: index % 2 === 0,
                    }));
                    return <FeatureGroup key={key} features={featureList} />;
                })
            }
        </div>
    );
};

export default LandingPage;
