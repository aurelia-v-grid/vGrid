//get type helper
var Transpile = require('fuse-box-typechecker').TypeHelper
const { task, src } = require('fuse-box/sparky');
const packageName = require('./package.json').name;

// configure
var transpileTo = function (outDir, moduleType) {
    var transpile = Transpile({
        tsConfig: './tsconfig.json',
        basePath: './',
        tsLint: './tslint.json',
        name: `building:${moduleType}, at: ${outDir}`,
        shortenFilenames: true,
        yellowOnLint: true,
        emit: true,
        clearOnEmit: true
    });

    transpile.options.tsConfigJsonContent.compilerOptions.rootDir = `src/${packageName}`;
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
    transpileTo('dist/es2015/', 'es2015');


    task('default', () => {


        // ------------------------------------------
        // ts code
        // ------------------------------------------

        src('**/*.*', { base: `src/${packageName}` })
            .clean('distTS/')
            .dest('distTS/')
            .exec();



        // ------------------------------------------
        // css
        // ------------------------------------------

        // clean
        src('./dist/**/*.*').clean('*.css')

        //copy
        src('**/*.css', { base: `src/${packageName}` })
            .dest('dist/commonjs/')
            .dest('dist/amd/')
            .dest('dist/system/')
            .dest('dist/es2015/')
            .exec();



        // ------------------------------------------
        // html
        // ------------------------------------------

        // clean
        src('./dist/**/*.*').clean('*.html')

        // copy
        src('**/*.html', { base: `src/${packageName}` })
            .dest('dist/commonjs/')
            .dest('dist/amd/')
            .dest('dist/system/')
            .dest('dist/es2015/')
            .exec();

    });

}
