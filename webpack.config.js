const path = require('path');
const webpack = require('webpack');

module.exports = {
  // this is from were webpack starts looking for files
  context: path.join(__dirname, '/app'),
  entry: './client/js/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build'),
    publicPath: '/build',
  },
  resolve: {
    /**
     * find 'import' and 'require' references
     * with the following extensions:
     * (may be broken in v2.2.1)
     */
    // extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // look for .js and .jsx
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
