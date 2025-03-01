const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  const isProduction = !!env.WEBPACK_BUILD;
  return {
    mode: isProduction ? "production" : "development",
    entry: ["./src/index.js"], // Entry point for your application
    devtool: isProduction ? false : "inline-source-map", // Source maps for development
    devServer: {
      static: ["src"], // Serve files from the "src" directory
      watchFiles: ["src/**/*.*"] // Watch for changes in all files in "src"
    },
    plugins: [
      // Generate HTML files from templates
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
      }),
      new HtmlWebpackPlugin({
        template: "./src/vegan.html",
        filename: "vegan.html"
      }),
      new HtmlWebpackPlugin({
        template: "./src/recipe.html",
        filename: "recipe.html"
      }),
      // Extract CSS into a separate file
      new MiniCssExtractPlugin({
        filename: "style.css" // Output CSS file name
      })
    ],
    module: {
      rules: [
        // Load HTML files
        {
          test: /\.html$/i,
          loader: "html-loader"
        },
        // Load and extract CSS files
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"] // Use MiniCssExtractPlugin.loader instead of style-loader
        }
      ]
    },
    output: {
      filename: "main.js", // Output JavaScript file name
      path: path.resolve(__dirname, "docs"), // Output directory
      publicPath: "" // Public path (adjust if deploying to a subdirectory)
    }
  };
};
