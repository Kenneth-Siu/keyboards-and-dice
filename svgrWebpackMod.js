const WebpackConfigHelpers = require("razzle-dev-utils/WebpackConfigHelpers");
const Helpers = new WebpackConfigHelpers(process.cwd());

module.exports = function (opts) {
    const config = opts.webpackConfig;

    config.module.rules[config.module.rules.findIndex(Helpers.makeLoaderFinder("file-loader"))].exclude.push(
        /\.(svg)$/
    );

    config.module.rules = [
        ...config.module.rules,
        {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        },
    ];
    return config;
};
