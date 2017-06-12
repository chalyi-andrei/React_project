import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from './webpack.config';

const PORT = 3000;

config.entry.unshift(
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${PORT}/`,
  'webpack/hot/only-dev-server',
);

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());

new WebpackDevServer(webpack(config), {
  port: PORT,
  inline: true,
  compress: true,
  historyApiFallback: true,
  contentBase: path.join(__dirname, '..', 'dist'),
  watchContentBase: true,
  proxy: {
    '/api': {
      // target: 'http://118.178.122.111:9005', //China
      // target: 'http://118.178.32.179', //China-prod
      target: 'http://34.249.151.32:9005',
      pathRewrite: { '^/api': '' },
      secure: false,
    },
    '/geo': {
      target: 'http://localhost:8010',
      secure: false,
    },
    '/mock': {
      target: 'http://localhost:8010',
      secure: false,
    },
  },
  stats: 'errors-only',
}).listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at localhost:${PORT}`);
});
