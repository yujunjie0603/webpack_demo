const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
console.log( process.env.type);
if (process.env.type == "build") {
    var directPath = {
        path: "http://localhost",
        port: ""
    }
} else {
    var directPath = {
        path: "http://127.0.0.1",
        port: ":8081"
    }
}
module.exports={
    entry: {
        entry:'./src/entry.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: directPath.path + directPath.port + "/"
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
            },{
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [
                        {loader:"css-loader"},
                        {loader:"less-loader"}
                    ],
                    fallback: "style-loader",
                })
            },{
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2000,
                            outputPath: 'images/',
                        }
                    }
                ]
            },{
                test: /\.(htm|html)/i,
                use: [
                    {loader:'html-withimg-loader'}
                ]
            },{
                test: /\.(js|jsx)$/,
                use:{
                    loader: 'babel-loader',
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        //new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template: './src/index.html'
        }),
        new extractTextPlugin('css/main.css'),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        compress: true,
        port: 8081
    }
}