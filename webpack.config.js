var webpack = require('webpack');
var path = require('path');
const { resolve } = require('path');

module.exports = {
    entry : [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'script-loader!jquery/dist/jquery.min.js',
        'script-loader!foundation-sites/dist/foundation.min.js',
        'script-loader!foundation-sites/js/foundation.dropdown.js',
        'script-loader!foundation-sites/js/foundation.dropdownMenu.js',
        'script-loader!foundation-sites/js/foundation.util.keyboard.js',
        'script-loader!foundation-sites/js/foundation.util.box.js',
        'script-loader!foundation-sites/js/foundation.util.nest.js',
        'script-loader!foundation-sites/js/foundation.sticky.js',
        'script-loader!foundation-sites/js/foundation.util.triggers.js',
        'script-loader!foundation-sites/js/foundation.core.js',
        'script-loader!foundation-sites/js/foundation.util.mediaQuery.js',
        './app/index.jsx'
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
    context: resolve(__dirname),
    output : {
        path : resolve(__dirname, 'public'),
        filename : 'bundle.js',
        publicPath : '/'
    },
    resolve : {
        modules : [
            __dirname,
            'node_modules',
            './app/actions',
            './app/api',
            './app/components',
            './app/reducers',
            './app/store',
            './app/styles'
        ],
        extensions : ['.js', '.jsx'],
        alias : {app : 'app', applicationStyles : 'app/styles/app.scss'}
    },
    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: resolve(__dirname, 'public'),
        // match the output path

        publicPath: '/',
        // match the output `publicPath`

        //fallback to root for other urls
        historyApiFallback: true,
        //port
        port : 3000
      },

    module : {
        rules : [{
            test : /\.jsx?$/,
            use : {
                loader : 'babel-loader',
            },
            exclude : [/node_modules/]
        }, {
            test: /\.(sass|scss)$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader : 'sass-loader',
                options : {
                    includePaths : path.resolve(__dirname, './node_modules/foundation-sites/scss')
                }
              }
            ],
        }] 
    },
    devtool : 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
      ],
};
