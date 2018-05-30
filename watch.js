const { FuseBox, QuantumPlugin, WebIndexPlugin, Sparky, HTMLPlugin, CSSPlugin } = require("fuse-box");
const packageName = require('./package.json').name;


// get typechecker 
const typechecker = require('fuse-box-typechecker').TypeHelper({
    tsConfig: './tsconfig.json',
    name: 'src',
    basePath: './',
    tsLint: './tslint.json',
    yellowOnLint: true,
    shortenFilenames: true
})

// create thread
typechecker.createThread();
typechecker.options.tsConfigJsonContent.compilerOptions.paths = {
    [packageName]: [
        `./src/${packageName}`
    ]
}

let runTypeChecker = () => {
    // same color..
    console.log(`\x1b[36m%s\x1b[0m`, `app bundled- running type check`);

    //call thread
    typechecker.inspectCodeWithWorker(Object.assign(typechecker.options, { quit: false, type: 'watch' }));
    typechecker.printResultWithWorker();

}

var injectBoostrapAndLoader = function () {
    var loader = function () { }
    loader.prototype.init = function (context) { }
    loader.prototype.bundleEnd = function (context) {
        context.source.addContent(`FuseBox.import("fuse-box-aurelia-loader")`);
        context.source.addContent(`FuseBox.import("aurelia-bootstrapper")`);
        context.source.addContent(`window.FUSEBOX_AURELIA_LOADER_RELOAD = true;`);
        context.source.addContent(`window.FUSEBOX_AURELIA_LOADER_LOGGING = true;`);
    }
    return new loader();
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
    + aurelia-bootstrapper
    + aurelia-framework
    + aurelia-pal
    + aurelia-metadata
    + aurelia-loader-default
    + aurelia-polyfills
    + aurelia-fetch-client
    + aurelia-pal-browser
    + aurelia-animator-css
    + aurelia-logging-console 
    + aurelia-templating-binding 
    + aurelia-templating-resources 
    + aurelia-event-aggregator 
    + aurelia-history-browser 
    + aurelia-templating-router
    + fuse-box-aurelia-loader`;

let webIndexTemplate =
    `<!DOCTYPE html>
    <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Welcome to Aurelia with FuseBox</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>   
        
    </head>
    <body aurelia-app="sample/main"></body>
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
        tsConfig: [{ // override tsConfig
            target: bundleName,
            "paths": {
                [packageName]: [
                    `./src/${packageName}`
                ]
            }
            // todo: override path, not possible atm (only in typechecker...)
        }],
        alias: { [packageName]: `~/${packageName}` }, // <- why cant I have `~/plugin` <-is that a bug ?
        plugins: [
            injectBoostrapAndLoader(),
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


// load
var TypeHelper = require('fuse-box-typechecker').TypeHelper
// it checks entire program every time
// see interface at bottom at readme for all options

