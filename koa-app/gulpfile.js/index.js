const {series, src, dest, watch} = require('gulp')
const clean = require('gulp-clean') // clean directory or file
const babel = require('gulp-babel') // babel compiler
const concat = require('gulp-concat') // combine files into a single file
const nodemon = require('gulp-nodemon')
const uglify = require('gulp-uglify') // 压缩文件
const webpack = require('gulp-webpack')
const path = require('path')

// delete current dist directory
// read: false 不读取文件内容，且无法通过 `dest()` 将其写入磁盘
async function cleanDist() {
    src('dist/', {read: false, allowEmpty: true}).pipe(clean())
}

// start the app
async function start() {
    nodemon({
        script: 'dist/index.js',
        env: {
            'NODE_ENV': 'development'
        }
    })
}

// babel compile 'src' directory's *.js file
// concat used to compress the whole directory to 'app.min.js'
async function babelDev() {
    src('src/**/*.js').pipe(babel({
        presets: ['@babel/env'],
    })).pipe(concat('index.js')).pipe(dest('dist', {sourcemaps: true}))
}

async function build() {
    src('src/**/*.js', {sourcemaps: true}).pipe(webpack({
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [{
                        loader: 'babel-loader',
                        presets: ['@babel/preset-env'],
                    }],
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            // root: path.resolve('../src'),
            // modules: [
            //     'node_modules'
            // ],
            modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
            extensions: ['.js'],
        },
    })).pipe(dest('dist', {sourcemaps: true}))
}

async function watchSource() {
    watch('src/**/*.js', babelDev)
}

exports.start = series(watchSource, start)
// export default as default method
exports.default = series(cleanDist, build)