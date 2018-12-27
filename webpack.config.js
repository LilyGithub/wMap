var webpack = require('webpack');

module.exports = {

    entry: __dirname + "/src/index.js",              //需要打包的文件  output: { 
    output:{
        path: __dirname + "/dist",             //打包后的js文件存放的地方 
        filename: "bundle.js"                   //打包后的js文件名  
    },
    devtool:'inline-source-map',
    devServer: {
        contentBase: "dist", //本地服务器所加载的页面所在的目录
        port: 8888,
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        hot: true // 开启热重载
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use:[
                    {
                        loader: 'url-loader'
                    }
                ]
            },
            
        ]
        
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

};
