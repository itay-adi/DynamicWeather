const path = require('path');

module.exports = {
  entry: './src/weatherWidget.ts', // Adjust the path to your TypeScript entry file
  output: {
    filename: 'weatherWidget.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
