import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginYaml } from "@rsbuild/plugin-yaml";

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'AIScript',
  icon: '/tuocan.png',
  logo: {
    light: '/aiscript-logo.svg',
    dark: '/aiscript-logo.svg',
  },
  route: {
    cleanUrls: true,
  },
  builderPlugins: [pluginYaml()],
  themeConfig: {
    footer: {
        message: '<p>AIScript Community &copy; 2025.</p>',
    },
    lastUpdated: true,
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
