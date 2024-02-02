const svgrWebpackMod = require("./svgrWebpackMod");

module.exports = {
    plugins: ["scss"],
    modifyWebpackConfig(opts) {
        opts.webpackConfig.performance = { maxAssetSize: 1000000, maxEntrypointSize: 1000000 };
        return svgrWebpackMod(opts);
    },
};
