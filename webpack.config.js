import path from 'path';

let config = {
  entry: './src/scripts/entry.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
      }
    ]
  },
  output: {
    path: path.join(__dirname,'dist'),
    filename: 'bundle.js'
  }
};

module.exports = config;
