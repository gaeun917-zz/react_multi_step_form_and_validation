var config = {
    devtool: 'eval-source-map',
    entry: __dirname + "/app/App.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {

        rules: [
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true
    }
};

if (process.env.NODE_ENV === 'production') {

    const webpack = require('webpack');

    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ];
}

module.exports = config;
