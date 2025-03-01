import { type FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.module.scss';

interface CodeDemoProps {
  code: string;
  filename?: string;
  width?: string | number;
  height?: string | number;
  language?: string;
}

const CodeDemo: FC<CodeDemoProps> = ({ code, filename, width = '800px', height, language = 'rust' }) => {
  return (
    <div className={styles.codeDemo} style={{ maxWidth: width }}>
      {filename && <div className={styles.filename}>{filename}</div>}
      <div className={styles.codeContainer} style={{ height }}>
        <SyntaxHighlighter
          language={language}
          style={style}
          customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
          codeTagProps={{
            className: styles.code
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeDemo;