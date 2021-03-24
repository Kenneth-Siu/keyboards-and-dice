const svgrWebpackMod = require("./svgrWebpackMod");

module.exports = {
    plugins: ["scss"],
    modifyWebpackConfig(opts) {
        return svgrWebpackMod(opts);
    },
};
