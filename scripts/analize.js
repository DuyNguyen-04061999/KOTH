process.env.NODE_ENV = "production";

const webpack = require("webpack");
const BundleAnalizePlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpackConfigProd = require("react-scripts/config/webpack.config")(
  "production"
);

webpackConfigProd.plugins.push(new BundleAnalizePlugin());

webpack(webpackConfigProd, (err, stats) => {
  if (err) {
    console.log(err);
  }
});
