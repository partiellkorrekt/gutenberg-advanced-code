module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '../wp-content/plugins/gutenberg-advanced-code/dist/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: './dist'
  },
  externals: {
    react: 'React',
    jquery: 'jQuery',
    lodash: 'lodash'
  },
  performance: { hints: false }
}
