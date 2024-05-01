import Sitemap from 'vite-plugin-sitemap';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as mdp from 'vite-plugin-markdown';
import packageJson from './package.json';

const { plugin: mdPlugin, Mode } = mdp;

import { readdirSync } from 'node:fs';

const routes = [
    "/articles",
    "/projects",
    "/about"
]
const articles = readdirSync("static/markdown/articles")
    .map(f => f.split(".")[0])
    .map(f => `/articles/${f}`);

export default {
    plugins: [
        tsconfigPaths(),
        mdPlugin({ mode: [Mode.HTML, Mode.TOC] }),
        Sitemap({
            hostname: packageJson.homepage,
            dynamicRoutes: [...routes, ...articles],
            generateRobotsTxt: true,
        }),
    ],
    resolve: {
        alias: {
            "@bootstrap": "bootstrap",
            "@fortawesome": "@fortawesome",
            "@static": "static",
        }
    },
    build: {
        minify: "esbuild"
    }
}