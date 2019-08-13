const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const paths = require("./paths")
const baseConfig = require("./base.config")

const config = {
  ...baseConfig,
  entry: {
    server: paths.resolveRoot("src/server")
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    path: paths.resolveRoot("dist/server"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: false
    }),
    new CleanWebpackPlugin(),
  ]
}

module.exports = config
