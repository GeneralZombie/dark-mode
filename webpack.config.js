const path = require('path');

module.exports = (env) => {
    return {
        target: 'web',
        entry: './src/dark-mode.js',
        devtool: env.build? false : 'inline-source-map',
        output: {
            filename: 'dark-mode' + (env.build? '.min' : '') + '.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'DarkMode',
            libraryTarget: 'umd',
            globalObject: 'window',
            umdNamedDefine: true,
            libraryExport: 'default'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    options: {
                        fix: true
                    }
                }
            ]
        }
    }
}
