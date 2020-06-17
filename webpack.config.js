const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.jsx',
    context: path.resolve(__dirname),
    devtool: 'eval-source-map',
  
    resolve: {
      extensions: ['.jsx', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: '/',
    },
  
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
      ],
    },

    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
            from: './src/assets/images/',
            to: './images'
            }    
        ]
      })
    ],

    devServer: {
      contentBase: '/',
      port: 8181,
      historyApiFallback: true,
      inline: true,
      hot: true,
      open: true,
    },
};
    