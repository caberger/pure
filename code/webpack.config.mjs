import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const isProduction = process.env.NODE_ENV == "production";
//const stylesHandler = "style-loader"

const config = {
  entry: "./src/index.ts",
  output: {
    path: resolve("./target"),
    filename: "bundle-[fullhash].js",
    chunkFilename: "[name]_[fullhash].bundle.js",
  },
  devtool: "cheap-source-map",
  devServer: {
    open: true,
    host: "localhost",
    port: 4200,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      scriptLoading: "module",
      hash: true,
    }),
    new CleanWebpackPlugin({ verbose: false }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "styles", to: "styles" },
        { from: "images", to: "images" },
        { from: "node_modules/purecss/build/pure-min.css", to: "styles" },
        { from: "data", to: "data" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [resolve("./", "src", "lib", "loaders", "style-loader.js")],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\-(template\.html)$/,
        use: [resolve("./", "src", "lib", "loaders", "template-loader.js")],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".html"],
    alias: {
      lib: resolve("./src/lib"),
      features: resolve("./src/features"),
      components: resolve("./src/components"),
    },
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
