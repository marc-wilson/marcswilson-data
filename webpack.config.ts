import * as webpack from 'webpack';
import * as copywebpack from 'copy-webpack-plugin';

module.exports = {
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
        // new copywebpack([
        //     {
        //         from: 'node_modules',
        //         to: './node_modules'
        //     }
        // ])
    ],
    entry: __dirname + '/src/database-handler.js',
    output: {
        path: __dirname + '/dist',
        filename: 'database-handler.js'
    },
    target: 'node'
}