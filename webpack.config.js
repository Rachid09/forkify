const path = require("path");
const WebpackHtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "js/app.js",
  },

  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new WebpackHtmlPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
