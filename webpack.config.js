const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.export = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: 'production',
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
      })],

    devServer: {
        static: {
          directory: path.resolve(__dirname),
          publicPath: '/'
        },
        proxy: {
          '/api/leaders': 'http://localhost:3000', // change this proxy root
        },
        compress: true,
    },

    module: {
      rules: [
        {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }   
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
            ],
        }
        ]
    }

};