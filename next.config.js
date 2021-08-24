// eslint-disable-next-line no-undef
module.exports = {
  distDir: "out",
  target: "serverless",
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "ru",
  },
  webpack: (config) => {
    // modify the `config` here
    config.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return config;
  },
};
