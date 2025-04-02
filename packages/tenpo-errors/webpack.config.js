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
    projectName: 'errors',
    webpackConfigEnv,
    argv,
  });

  const isProd = argv.mode === 'production';

  return merge(defaultConfig, {
    devServer: {
      port: 9083,
      https: Boolean(process.env.HTTPS),
      host: process.env.HOST_DEV,
      onListening: ({ compiler }) => {
        const { https, port, host } = compiler.options.devServer;
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
    module: {
      rules: [
        {
          test: /\.(sa|sc)ss$/i,
          exclude: [path.resolve('./node_modules/')],
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              options: { esModule: false },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                esModule: false,
                modules: {
                  exportLocalsConvention: 'dashes',
                  localIdentName: '[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  silenceDeprecations: ['legacy-js-api'],
                },
              },
            },
          ],
        },
        {
          test: /\.(ico|png|svg|jpg|jpeg|gif|svg|webp|tiff)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        process: { env: JSON.stringify(process.env) },
      }),
    ].concat(isProd ? [new MiniCssExtractPlugin()] : []),
  });
};
