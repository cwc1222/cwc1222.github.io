import tsconfigPaths from 'vite-tsconfig-paths';

export default {
    plugins: [
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            "@bootstrap": "bootstrap",
            "@fortawesome": "@fortawesome",
            "@static": "static",
        }
    },
}