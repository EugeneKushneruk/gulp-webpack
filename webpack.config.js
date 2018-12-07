const webpack = require('webpack');
const { isDev } = require('./gulp-utils/env');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : 'hidden-source-map',
  watch: isDev,
  entry: {
    bundle: './src/js/index.js'
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: isDev
    }),
    // new BundleAnalyzerPlugin()
  ]
};
