const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: '/dist',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  context: path.resolve(__dirname, '..', 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'es2016', 'react', 'stage-1'],
        plugins: ['transform-runtime'],
      },
    }, {
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.scss$/,
      exclude: /(node_modules|public)/,
      loader: ExtractTextPlugin.extract('style-loader',['css-loader','postcss-loader','sass-loader']),
    }, {
      test: /\.css$/,
      exclude: /(node_modules|public)/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader','postcss-loader?sourceMap=inline'])
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      exclude: /node_modules/,
      loaders: [
        'url?limit=10000&name=images/[hash:8].[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../src/index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin('js/common.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/styles.css'),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
  postcss: () => [autoprefixer],
};

