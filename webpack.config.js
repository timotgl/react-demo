var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/js/main.jsx',
  output: {
    path: './client/js',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/assets/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
