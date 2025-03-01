import { BackgroundImage } from '../background-image';
import { Hero } from '../hero';
import styles from './index.module.scss';

import { useCallback } from 'react';
import { useNavigate } from 'rspress/runtime';

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
                // title="AIScript"
                subTitle="The next generation language for human and AI."
                getStartedButtonText='getStarted'
                githubURL="https://github.com/aiscriptdev/aiscript"
                onClickGetStarted={onClickGetStarted}
            />
        </div>
    );
};

export default LandingPage;
