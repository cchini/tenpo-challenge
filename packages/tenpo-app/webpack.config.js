const singleSpaDefaults = require('webpack-config-single-spa-ts');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

// this will update the process.env with environment variables in .env file
dotenv.config();

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'tenpo';
  const isLocal = webpackConfigEnv ? webpackConfigEnv.isLocal : false;
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: 'app',
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const webpackConfig = {
    devServer: {
      host: webpackConfigEnv.HOST_DEV,
    },
    ...defaultConfig,
    plugins: [
      ...defaultConfig.plugins,
      new HtmlWebpackPlugin({
        inject: false,
        filename: 'index.html',
        template: 'src/index.ejs',
        templateParameters: {
          isLocal,
          orgName,
          FEATURE_APP_DATA: process.env.FEATURE_APP_DATA,
          CDN_BASE: process.env.CDN_BASE,
          HOST_DEV: process.env.HOST_DEV,
        },
      }),
      new webpack.DefinePlugin({
        process: { env: JSON.stringify(process.env) },
      }),
    ],
  };

  return webpackConfig;
};
