import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginYaml } from "@rsbuild/plugin-yaml";

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'AIScript',
  icon: '/toucan.png',
  logo: {
    light: '/aiscript-logo.svg',
    dark: '/aiscript-logo-white.svg',
  },
  route: {
    cleanUrls: true,
  },
  mediumZoom: true,
  builderPlugins: [pluginYaml()],
  themeConfig: {
    enableScrollToTop: true,
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
