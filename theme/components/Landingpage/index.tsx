import { BackgroundImage } from '../background-image';
import { Hero } from '../hero';
// import CodeDemo from '../code-demo';
import FeatureDemo from '../feature-demo';
import styles from './index.module.scss';

import { useCallback } from 'react';
import { useNavigate } from 'rspress/runtime';

const demoCode = `// Define a function that takes a prompt and returns a response
fn generate_response(prompt: string) -> string {
    // Call the AI model to generate a response
    let response = ai.generate({
        model: "gpt-4",
        prompt: prompt,
        max_tokens: 100
    });
    
    return response;
}

// Example usage
let result = generate_response("Tell me a joke");
print(result);`;

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
            <FeatureDemo
                title='AI Native'
                description='AIscript is designed to be the first-class language for AI development. It is designed to be easy to learn and use, and it is designed to be fast and efficient.'
                code={demoCode}
                filename='main.ai' />

            <FeatureDemo
                title='AI Native'
                description='AIscript is designed to be the first-class language for AI development. It is designed to be easy to learn and use, and it is designed to be fast and efficient.'
                code={demoCode}
                isReversed={true}
                filename='main.ai' />
        </div>
    );
};

export default LandingPage;
