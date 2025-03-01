import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'AIScript',
  icon: '/tuocan.png',
  logo: {
    light: '/aiscript-logo.svg',
    dark: '/aiscript-logo.svg',
  },
  themeConfig: {
    footer: {
        message:
          '<p>AIScript Community &copy; 2025.</p>',
      },
    prevPageText: 'Prev Page',
    nextPageText: 'Next Page',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/aiscriptdev/aiscript',
      },
    ],
  },
});
