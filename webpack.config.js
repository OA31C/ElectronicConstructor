const path = require('path');

// FIXME: add FLOW checker

module.exports = {
  devtool: 'source-map',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'es2016', 'es2017'],
            plugins: [
              ['babel-plugin-transform-builtin-extend', {
                globals: ['Error', 'Array'],
              }],
              'transform-flow-strip-types',
            ],
          },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
