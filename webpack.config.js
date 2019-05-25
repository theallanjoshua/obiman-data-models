const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const outputDir = path.join(__dirname, 'lib');

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/index.js'],
  mode: 'production',
  output: {
    path: outputDir,
    filename: 'index.js',
    library: 'obiman-data-model',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          compress: { inline: false }
        }
      })
    ]
  }
}