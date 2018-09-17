const { FuseBox, HTMLPlugin, WebIndexPlugin, CSSPlugin } = require("fuse-box");
const { src, task } = require("fuse-box/sparky");

let run = (production) => {
    const fuse = FuseBox.init({
        target: "browser@es6",
        homeDir: 'src',
        output: 'dev/$name.js',
        alias: { "aurelia-v-grid": "aurelia-v-grid" },
        runAllMatchedPlugins: true,
        cache: false,
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
        .instructions(` > sample/main.ts + **/*.{ts,html,css}`)
        .watch();
    fuse.dev();
    fuse.run();
};

task('clean', async () => await src('dev/*').clean('dev').exec());
task("default", ['clean'], () => run(false));
