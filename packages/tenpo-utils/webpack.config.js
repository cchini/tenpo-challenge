const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('node:path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// this will update the process.env with environment variables in .env file
dotenv.config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'tenpo',
    projectName: 'utils',
    webpackConfigEnv,
    argv,
  });

  const isProd = argv.mode === 'production';

  return merge(defaultConfig, {
    devServer: {
      port: 9081,
      https: Boolean(process.env.HTTPS),
      host: process.env.HOST_DEV,
      onListening: ({ compiler }) => {
        const { https, host, port } = compiler.options.devServer;
        const { publicPath, filename } = compiler.options.output;
        const protocol = https ? 'https://' : 'http://';
        const path = ['', 'auto'].includes(publicPath) ? '/' : publicPath;
        console.log(
          `⚡️ single-spa application entry: ${protocol}${host}:${port}${path}${filename}`,
        );
      },
    },
    externals: [
      /^@tenpo\//,
      'rxjs',
      'react',
      'react-dom',
      'single-spa',
      'single-spa-react',
    ],
    cache: false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      clean: true,
    },
    module: {},
    plugins: [
      new webpack.DefinePlugin({
        process: { env: JSON.stringify(process.env) },
      }),
    ].concat(isProd ? [new MiniCssExtractPlugin()] : []),
  });
};
