//get type helper
var Transpile = require('fuse-box-typechecker').TypeHelper
const { task, src } = require('fuse-box/sparky');

// configure
var transpileTo = function (outDir, moduleType) {
    var transpile = Transpile({
        tsConfig: './tsconfig.build.json',
        basePath: './',
        tsLint: './tslint.json',
        name: `building:${moduleType}, at: ${outDir}`,
        shortenFilenames: true,
        yellowOnLint: true,
        emit: true,
        clearOnEmit: true
    });

    transpile.options.tsConfigJsonContent.compilerOptions.outDir = outDir;
    transpile.options.tsConfigJsonContent.compilerOptions.module = moduleType;
    transpile.options.tsConfigJsonContent.paths = {};
    transpile.options.tsConfigJsonContent.exclude = ['node_modules', 'dist', 'src/sample', 'dev', 'distTS'];
    return transpile.runSync();
}

var errors = transpileTo('dist/commonjs/', 'commonjs');

// if commonjs had no errors then we do amd/system and copy css/html
if (!errors) {

    // transpile too
    transpileTo('dist/amd/', 'amd');
    transpileTo('dist/system/', 'system');


    task('default', () => {
        src('**/*.*', { base: 'src/aurelia-v-grid' })
            .clean('distTS/')
            .dest('distTS/')
            .exec();

        // css

        // clean
        src('./dist/**/*.*').clean('*.css')

        //copy
        src('**/*.css', { base: 'src/aurelia-v-grid/grid/styles' })
            .dest('dist/commonjs/grid/styles')
            .dest('dist/amd/grid/styles')
            .dest('dist/system/grid/styles')
            .exec();



        // html

        // clean
        src('./dist/**/*.*').clean('*.html')

        // copy
        src('**/*.html', { base: 'src/aurelia-v-grid/grid' })
            .dest('dist/commonjs/grid/')
            .dest('dist/amd/grid/')
            .dest('dist/system/grid/')
            .exec();

    });

}
