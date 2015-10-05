var path = require('path');
var webpack = require('webpack');

function addDeps(to) {
    return [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'bootstrap-webpack!' + path.resolve(__dirname + '/bootstrap.config.js'),
        '!style!css!!less!' + path.resolve(__dirname + '/ortho-automatons.less'),
    ].concat(to);
}

module.exports = {
    devtool: 'eval',
    entry: {
        BoardPlay: addDeps('./src/page/BoardPlayPage'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel?plugins=babel-plugin-object-assign'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.woff2?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf$/,
            loader: "file-loader"
        }, {
            test: /\.eot$/,
            loader: "file-loader"
        }, {
            test: /\.svg$/,
            loader: "file-loader"
        }]
    },
    resolve: {
        extensions: ['', '.js', '.webpack.js', '.jsx']
    }
};
