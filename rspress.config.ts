import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginYaml } from "@rsbuild/plugin-yaml";
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import pluginSitemap from 'rspress-plugin-sitemap';

const PUBLISH_URL = 'https://aiscript.dev';
export default defineConfig({
    root: path.join(__dirname, 'docs'),
    title: 'AIScript',
    icon: '/toucan.png',
    logo: {
        light: '/aiscript-logo.svg',
        dark: '/aiscript-logo-white.svg',
    },
    search: {
        codeBlocks: true,
    },
    route: {
        cleanUrls: true,
    },
    ssg: {
        strict: true,
    },
    mediumZoom: true,
    plugins: [
        pluginSitemap({
            domain: PUBLISH_URL,
        }),
    ],
    builderPlugins: [
        pluginOpenGraph({
            title: 'AIScript',
            type: 'website',
            url: PUBLISH_URL,
            image: 'https://aiscript.dev/aiscript-social-image.png',
            description: 'AIScript is a unique combination of interpreter programming language and web framework, both written in Rust, designed to help developers build AI applications effortlessly.',
        }),
        pluginYaml(),
    ],
    globalStyles: path.join(__dirname, 'theme/index.css'),
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
            {
                icon: 'discord',
                mode: 'link',
                content: 'https://discord.gg/bXRqsweNPb',
            },
        ],
    },
});
