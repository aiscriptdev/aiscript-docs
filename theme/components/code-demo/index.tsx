import { type FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
const style = {
  'comment': { color: '#8B8B8B' },
  'function': { color: '#8B5CF6' },
  'string': { color: '#4CAF50' },
  'keyword': { color: '#F92672' },
  'number': { color: '#FF8B00' }
};
import styles from './index.module.scss';

interface CodeDemoProps {
  code?: string;
  img?: string;
  width?: string | number;
  height?: string | number;
  language?: string;
}

const CodeDemo: FC<CodeDemoProps> = ({ 
  code, 
  img,
  width = '800px', 
  height, 
  language = 'rust'
}) => {
  return (
    <div className={styles.codeDemo} style={{ maxWidth: width }}>
      <div className={styles.codeContainer} style={{ height }}>
        {code ? (
          <SyntaxHighlighter
            language={language}
            style={style}
            customStyle={{ margin: 0, padding: '0.6rem', background: 'transparent' }}
            codeTagProps={{
              className: styles.code
            }}
          >
            {code}
          </SyntaxHighlighter>
        ) : img ? (
          <img src={img} alt="Code demo" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : null}
      </div>
    </div>
  );
};

export default CodeDemo;