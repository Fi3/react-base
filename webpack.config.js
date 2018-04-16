const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') //eslint-disable-line no-undef
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
    ],

  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), //eslint-disable-line no-undef
    inline: true,
    stats: { colors: true },
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
};


