module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: ['babel-loader'],
    query: {
      presets: ['react', 'es2015', 'stage-0'],
      plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
    }
  },
  {
    test: /\.css$/,
    loader: 'style!css-loader'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: "file"
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?prefix=font/&limit=5000"
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&mimetype=application/octet-stream"
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: "url?limit=10000&mimetype=image/svg+xml"
  },
  {
    test: /\.gif/,
    loader: "file?name=./images/[sha512:hash:base64:7].[ext]"
  },
  {
    test: /\.jpg/,
    loader: "file?name=./images/[sha512:hash:base64:7].[ext]"
  },
  {
    test: /\.png/,
    loader: "file?name=./images/[sha512:hash:base64:7].[ext]"
  }
];