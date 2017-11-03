
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');


// so fusebox uses correct path
process.env.PROJECT_ROOT = path.resolve(process.cwd(), './sample/')

// builtin plugins
const {
    RawPlugin,
    FuseBox,
    HTMLPlugin,
    CSSPlugin,
    Sparky
} = require("../sample/node_modules/fuse-box");

// typechecker
var TypeHelper = require('../sample/node_modules/fuse-box-typechecker').TypeHelper

// TODO: add tslint (maybe to the typechecker)


var injectBoostrapAndLoader =function() {
    var loader = function(){}
    loader.prototype.init = function(context) {}
    loader.prototype.bundleEnd = function(context) {
        context.source.addContent(`FuseBox.import("fuse-box-aurelia-loader")`);
        context.source.addContent(`FuseBox.import("aurelia-bootstrapper")`);
        context.source.addContent(`window.FUSEBOX_AURELIA_LOADER_RELOAD = true;`);
        context.source.addContent(`window.FUSEBOX_AURELIA_LOADER_LOGGING = true;`);
    }
    return new loader();
}


// sample typechecker
gulp.task('sample-typechecker', function() {
    // set correct dir first..
    
    var testWatch = TypeHelper({
        tsConfig: './tsconfig.json',
        name: 'Sample Watch',
        basePath:'./sample'
    })
    testWatch.runWatch('./src')
    return true; 
});

// plugin(grid) typechecker
gulp.task('plugin-typechecker', function() {
    // set correct dir first..
    var testWatch = TypeHelper({
        tsConfig: './tsconfig.json',
        name: 'Plugin Watch',
        tsLint:'./tslint.json',
        basePath:'./',
        yellowOnLint: true
    })
    testWatch.runWatch('./src')
    return true; 
});



// this task will start fusebox
gulp.task('fuse-sample', function() {
// typechecker (minor bug first time when caching vendor bundle, its on my todo list(vegar)... just need to talk to fusebox team..)
    const TypeCheckPlugins = require('../sample/node_modules/fuse-box-typechecker').TypeCheckPlugin;
    
    // init fusebox
    const fuse = FuseBox.init({
        homeDir: './src',
        output: './dist/$name.js',
        plugins: [
            injectBoostrapAndLoader(),
            CSSPlugin(),
            HTMLPlugin(),
            RawPlugin(['.css', '.woff'])
        ]
    });


    // vendor bundle
    fuse.bundle("vendor")
        .cache(true)
        .instructions(` 
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
        + fuse-box-aurelia-loader
`)


    // app bundle
    // todo, we need to have vendor bundle and app bundle...
    fuse.bundle('app')
        .watch().cache(false).hmr()
        .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css}]
        `);

    // web server    
    fuse.dev({
        root: './'
    });

    // run
    return fuse.run()
});


// this task will start fusebox
gulp.task('fuse-plugin', function() {
    
    // package init
    const fuse = FuseBox.init({
        homeDir: '../src',
        output: './dist/$name.js',
        plugins: [
            HTMLPlugin({
                useDefault: true
            }),
            RawPlugin(['.css', '.woff'])
        ],
        package: {
            name: "aurelia-v-grid",
            main: "index.ts"
        },
    });


    // plugin bundle
    fuse.bundle('aurelia-v-grid')
        .watch().cache(false)
        .instructions(`
            + [**/*.html] 
            + [**/*.ts]
            + [**/*.css]
        `).sourceMaps(true);


    //build file    
    return fuse.run();
});


// this task will start fusebox
gulp.task('watch', function() {
    return runSequence(
    'fuse-plugin', 'fuse-sample', 'plugin-typechecker', 'sample-typechecker'
  );
});