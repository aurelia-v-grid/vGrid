const { FuseBox, HTMLPlugin, WebIndexPlugin, CSSPlugin } = require("fuse-box");
const { src, task } = require("fuse-box/sparky");


const typechecker = require('fuse-box-typechecker').TypeChecker({
    tsConfig: './tsconfig.json',
    name: 'src',
    basePath: './',
    tsLint: './tslint.json',
    yellowOnLint: true,
    shortenFilenames: true,
    tsConfigOverride: {
        exclude: [
            "node_modules",
            "dev"
        ],
    }
});
typechecker.startTreadAndWait();

let run = (production) => {
    const fuse = FuseBox.init({
        target: "browser@es6",
        homeDir: 'src',
        output: 'dev/$name.js',
        alias: { "aurelia-v-grid": "~/aurelia-v-grid" },
        runAllMatchedPlugins: true,
        cache: false,
        log: false,
        sourceMaps: { project: true, vendor: true },
        plugins: [
            HTMLPlugin(),
            CSSPlugin(),
            WebIndexPlugin({
                template: './index.html',
                path: './'
            })
        ]
    });
    fuse.bundle("app")
        .instructions(`
            > sample/main.ts 
            + **/*.{ts,html,css}`)
        .watch()
        .completed(proc => {
            console.log(`\x1b[36m%s\x1b[0m`, `app bundled- running type check`);
            typechecker.useThreadAndTypecheck();
        });
    fuse.dev();
    fuse.run();
};

task('clean', async () => await src('dev/*').clean('dev').exec());
task("default", ['clean'], () => run(false));
