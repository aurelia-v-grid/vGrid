const { FuseBox, QuantumPlugin, WebIndexPlugin, Sparky, HTMLPlugin, CSSPlugin } = require("fuse-box");

// get typechecker 
const typechecker = require('fuse-box-typechecker').TypeHelper({
    tsConfig: './tsconfig.json',
    name: 'src',
    basePath: './',
    tsLint: './tslint.json',
    yellowOnLint: true,
    shortenFilenames:true
})

// create thread
typechecker.createThread();


let runTypeChecker = () => {
    // same color..
    console.log(`\x1b[36m%s\x1b[0m`, `app bundled- running type check`);
    
    //call thread
    typechecker.inspectCodeWithWorker(Object.assign(typechecker.options, { quit: false, type: 'watch' }));
    typechecker.printResultWithWorker();

}

// variables
let fuse, bundle;
let isProduction = false;
let target = "browser@es6";
let bundleName = "app";

let instructions = `
    > sample/main.ts 
    + **/*.{ts,html,css} 
    + fuse-box-css
    + mframejs`;

let webIndexTemplate =
    `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <title>mframejs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link  href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
        <link  href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
        <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
        <link  rel="stylesheet" href="//demo.productionready.io/main.css">
    
        
    </head>
    <body>
    </body>
    <script type="text/javascript" charset="utf-8" src="./app.js"></script>
    </html>`


Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "src",
        globals: { 'default': '*' }, // we need to expore index in our bundles
        target: target,
        output: "dev/$name.js",
        cache: false,
        log: false,
        tsConfig: [{ target: bundleName }], // override tsConfig
        alias: { mframejs: "~/mframejs" },
        plugins: [
            CSSPlugin(),
            HTMLPlugin(),
            WebIndexPlugin({ templateString: webIndexTemplate })
        ]
    })

    fuse.bundle(bundleName)
        .instructions(instructions)
        .sourceMaps(true)
        .watch()
        .completed(proc => {
            runTypeChecker();
        });
});


Sparky.task("clean", () => {
    return Sparky.src("dev/").clean("dev/");
});


Sparky.task("default", ["clean", "config"], () => {
    fuse.dev();
    fuse.run();
});