const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cssLoaderConfig = ({ shouldHasHash }) => [{
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: `[local]${shouldHasHash ? '__[hash:base64:5]' : ''}`,
    discardComments: true,
  },
}, {
  loader: 'postcss-loader',
}, {
  loader: 'sass-loader',
  options: {
    outputStyle: 'compressed',
    sourcemaps: false,
  },
}];

const rules = [{
  test: /\.(js|jsx)$/i,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'stage-2', 'react'],
      plugins: [
        'add-module-exports',
        'transform-runtime',
        'react-hot-loader/babel',
        ['transform-runtime', {
          polyfill: true,
          regenerator: true,
        }],
      ],
    },
  }],
  exclude: /node_modules/,
  include: [path.resolve(__dirname, '..', 'src', 'js')],
}, {
  test: /\.scss/,
  use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: cssLoaderConfig({ shouldHasHash: false }) }),
}, {
  test: /\.css/,
  use: [{ loader: 'style-loader' }, ...cssLoaderConfig({ shouldHasHash: true })],
}, {
  test: /\.html$/,
  use: [{ loader: 'html-loader' }],
}, {
  test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  use: [{ loader: 'file-loader' }],
}, {
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [{ loader: 'file-loader', options: { name: '[path][name].[ext]' } }],
}, {
  test: /\.json$/,
  use: [{ loader: 'json-loader' }],
}];

module.exports = {
  entry: [
    'whatwg-fetch',
    './src/js/index.js',
    './src/sass/app.scss',
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle-[hash].js',
    publicPath: '/',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      'node_modules',
      path.join(__dirname, '..', 'src', 'js'),
      path.join(__dirname, '..', 'src', 'js', 'core'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '..', 'src', 'index.html'),
      filename: 'index.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '..', 'src', 'images'),
      to: './images',
    }]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      output: {
        comments: false, // Also removes licences
      },
    }),
  ],
};
