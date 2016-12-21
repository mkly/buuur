module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname + '/app/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
