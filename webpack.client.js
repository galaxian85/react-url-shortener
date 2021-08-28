const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: "node",
  entry: "./src/client/client.tsx",
  devtool: 'inline-source-map',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
