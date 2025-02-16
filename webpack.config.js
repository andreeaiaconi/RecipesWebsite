const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const isProduction = !!env.WEBPACK_BUILD;
  return {
    mode: isProduction ? "production" : "development",
    entry: ["./src/index.js"],
    devtool: isProduction ? false : "inline-source-map",
    devServer: {
      static: ["src"],
      watchFiles: ["src/**/*.*"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
      }),
      new HtmlWebpackPlugin({
        template: "./src/bakes.html",
        filename: "bakes.html"
      }),
      new HtmlWebpackPlugin({
        template: "./src/mains.html",
        filename: "mains.html"
      }),
      new HtmlWebpackPlugin({
        template: "./src/sides.html",
        filename: "sides.html"
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader"
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "docs"),
      publicPath: ""
    }
  };
};
