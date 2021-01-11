let HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    config.plugin("html").tap(args => {
      args[0].inlineSource = ".(js|css)$";
      return args;
    });
    config.plugin("inline-source").use(HtmlWebpackInlineSourcePlugin);
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
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
      .tap(options => {
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
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    i18n: {
      locale: "ru",
      fallbackLocale: "ru",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
