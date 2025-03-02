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
  code: string;
  filename?: string;
  width?: string | number;
  height?: string | number;
  language?: string;
  codeDemos?: Array<{ code: string; filename?: string }>;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
}

const CodeDemo: FC<CodeDemoProps> = ({ 
  code, 
  filename, 
  width = '800px', 
  height, 
  language = 'rust',
  codeDemos = [],
  activeIndex = 0,
  onTabChange
}) => {
  return (
    <div className={styles.codeDemo} style={{ maxWidth: width }}>
      <div className={styles.filenameBar}>
        {codeDemos.map((demo, index) => (
          <button
            key={index}
            className={`${styles.filenameTab} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => onTabChange?.(index)}
          >
            {demo.filename || `Example ${index + 1}`}
          </button>
        ))}
      </div>
      <div className={styles.codeContainer} style={{ height }}>
        <SyntaxHighlighter
          language="javascript"
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