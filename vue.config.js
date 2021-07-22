const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        if (!options) {
          options = {};
        }
        options.esModule = false;
        options.limit = true;
        return options;
      })
      .end();

    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        if (!options) {
          options = {};
        }
        options.esModule = false;
        options.limit = true;
        return options;
      })
      .end();
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "dist.html",
        template: "public/index.html",
        inlineSource: ".(js|css)$",
        inject: "body",
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    ],
  },
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    i18n: {
      locale: "ru",
      fallbackLocale: "ru",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
