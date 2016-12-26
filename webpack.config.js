var resolve = require("path").resolve;

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname + "/app/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /\.js$/,
        include: resolve(__dirname, "src"),
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  }
};
