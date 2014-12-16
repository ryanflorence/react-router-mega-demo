var path = require('path');

module.exports = {
  entry: "./app/client",

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.join('public', 'js'),
    publicPath: '/js/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM' },
      { test: require.resolve('react'), loader: 'expose?React' }
    ]
  }
};

