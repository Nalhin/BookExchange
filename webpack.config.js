const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = env => {
  return {
    mode: env.development ? 'development' : 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      publicPath: env.development ? '/' : './',
      filename: 'bundle.[hash].js',
      chunkFilename: 'chunk.[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: env.development ? 'eval-source-map' : 'source-map',
    devServer: {
      contentBase: [
        path.join(__dirname, 'public'),
        path.join(__dirname, 'dist'),
      ],
      hot: true,
      open: false,
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: [/\.js$/],
          exclude: /node_modules/,
          loader: ['babel-loader', 'eslint-loader'],
        },
        {
          test: [/\.(scss|css)$/],
          loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            useRelativePath: true,
            outputPath: 'src/assets/images',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'bundle.[hash].css',
        chunkFilename: 'chunk.[chunkhash].css',
      }),
      new webpack.BannerPlugin({
        banner:
          'Copyright (c) 2019 Krzysztof Olipra and Karol Oleszek.\n' +
          'Source Code available @ https://github.com/Nalhin/BookExchange \n',
      }),
    ],
    performance: {
      hints: false,
    },
  };
};
