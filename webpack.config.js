var webpack = require('webpack');

var entryPoint = ['./app/app.jsx'];

module.exports = {
  entry: entryPoint,
  output: {
    // Output the bundled file.
    path: './lib',
    // Use the name specified in the entry key as name for the bundle file.
    filename: 'bundle.js'
  },
  resolve: {
    // Include empty string '' to resolve files by their explicit extension
    // (e.g. require('./somefile.ext')).
    // Include '.js', '.jsx' to resolve files by these implicit extensions
    // (e.g. require('underscore')).
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: [
            'react',
            'es2015'
          ],
        },
      },
    ]
  }
};
