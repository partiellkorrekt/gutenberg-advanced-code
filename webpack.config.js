module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/wp-content/plugins/gutenberg-advanced-code/dist/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: './dist'
  },
  externals: {
    react: 'React',
    jquery: 'jQuery',
    lodash: 'lodash'
  }
};
