var webpack = require('webpack');
var entryPoint = ['./app/app.jsx'];
const jsxLoaders = ['jsx?harmony'];

module.exports = {
  entry: entryPoint,
  output: {
    // Output the bundled file.
    path: `${__dirname}/lib/`,
    // Use the name specified in the entry key as name for the bundle file.
    filename: 'bundle.js',

    // *********************
    // for Remote publicPath
    // *********************
    publicPath: '/react-address-book/lib/',

    // ********************
    // for Local publicPath
    // ********************
    // publicPath: '/lib/',

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
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        loader: 'url?limit=10000&minetype=image/png',
      }, {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=image/svg+xml',
      },
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
