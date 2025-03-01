import { BackgroundImage } from '../background-image';
import { Hero } from '../hero';
import FeatureGroup from '../feature-group';
import styles from './index.module.scss';

import { useCallback } from 'react';
import { useNavigate } from 'rspress/runtime';
import { features } from './features.json';

const LandingPage = () => {
    const navigate = useNavigate();
    const onClickGetStarted = useCallback(() => {
        navigate('/guide');
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
            <FeatureGroup features={features} />
        </div>
    );
};

export default LandingPage;
