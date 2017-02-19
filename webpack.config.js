var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry : [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/foundation.min.js',
        'script!foundation-sites/js/foundation.dropdown.js',
        'script!foundation-sites/js/foundation.util.keyboard.js',
        'script!foundation-sites/js/foundation.util.box.js',
        'script!foundation-sites/js/foundation.util.nest.js',
        'script!foundation-sites/js/foundation.sticky.js',
        'script!foundation-sites/js/foundation.util.triggers.js',
        'script!foundation-sites/js/foundation.core.js',
        'script!foundation-sites/js/foundation.util.mediaQuery.js',
        './app/app.jsx'
    ],
    externals : {
        jquery : 'jQuery',
        foundation: 'Foundation'
    },
    plugins : [
        new webpack.ProvidePlugin({
            '$' : 'jquery',
            'jQuery' : 'jquery'
        })
    ],
    output : {
        path : __dirname,
        filename : './public/bundle.js'
    },
    resolve : {
        root : __dirname,
        modulesDirectories : [
            'node_modules',
            './app/components',
            './app/api'
        ],
        alias : {
            Main : 'app/components/Main.jsx',
            applicationStyles : 'app/styles/app.scss',
            actions : 'app/actions/actions.jsx',
            reducers : 'app/reducers/reducers.jsx',
            configureStore : 'app/store/configureStore.jsx'
        },
        extensions : ['', '.js', '.jsx']
    },
    module : {
        loaders : [{
            loader : 'babel-loader',
            query : {
                presets : ['react', 'es2015', 'stage-0']
            },
            test : /\.jsx?$/,
            exclude : /(node_modules|bower_components)/
        }] 
    },
    sassLoader : {
        includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    devtool : 'cheap-module-eval-source-map'
};
