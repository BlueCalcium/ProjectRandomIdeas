const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public')
    },
    port: 3000,
    // Set open to true ("open: true") for production development in order to set to default browser.
    open: {
      app: {
        // This specifies what browser to use for the dev server. GChrome is 'chrome' for Windows, 'google-chrome' on Linux, and 'Google Chrome' for macOS.
        name: 'chrome' 
      }
    },
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http:localhost:5000'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'src/favicon.ico',
    //       to: 'favicon.ico'
    //     }
    //   ]
    // })
  ]
}