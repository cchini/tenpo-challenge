const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'tenpo',
    projectName: 'states',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9080,
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
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      clean: true,
    },
  });
};
