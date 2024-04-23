import tsconfigPaths from 'vite-tsconfig-paths';
import * as mdp from 'vite-plugin-markdown';

const { plugin: mdPlugin, Mode } = mdp;

export default {
    plugins: [
        tsconfigPaths(),
        mdPlugin({ mode: [Mode.HTML, Mode.TOC] }),
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