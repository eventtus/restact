var extraWebpackConfig = {
  resolve: {
    alias: {
      Types: path.resolve(__dirname, 'src/@types')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    extra: extraWebpackConfig
  }
}
