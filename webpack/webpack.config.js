import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// ENTRIES
const entries = [
  './src/js/index.js',
  './src/sass/app.scss',
];

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
    outputStyle: 'expanded',
    sourcemaps: true,
  },
}];

// PLUGINS
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.join(__dirname, '..', 'src', 'index.html'),
    filename: 'index.html',
  }),
  new ExtractTextPlugin({ filename: '[name].[contenthash:8].css', allChunks: true }),
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '..', 'src', 'images'),
    to: './images',
  }]),
  new WebpackNotifierPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];


// LOADERS
const loaders = [{
  test: /\.(js|jsx)$/i,
  use: [{ loader: 'babel-loader' }],
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
}];

export default {
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: 5000,
    ignored: /node_modules/,
  },
  entry: entries,
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      'node_modules',
      path.join(__dirname, '..', 'src', 'js'),
      path.join(__dirname, '..', 'src', 'js', 'core'),
    ],
  },
  module: {
    rules: loaders,
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};
