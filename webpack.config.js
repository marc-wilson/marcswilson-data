"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
    ],
    entry: __dirname + '/src/database-handler.js',
    output: {
        path: __dirname + '/dist',
        filename: 'database-handler.js'
    },
    target: 'node'
};
//# sourceMappingURL=webpack.config.js.map