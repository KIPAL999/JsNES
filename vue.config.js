module.exports = {
    publicPath:  './',
    // devServer: {
    //     open: true,
    //     host: '192.168.10.4',
    //     port: 9090,
    //     https: false,
    //     //以上的ip和端口是我们本机的;下面为需要跨域的
    //     proxy: {//配置跨域
    //         '/api': {
    //             target: 'http://47.96.233.71:80/gameServer/',//这里后台的地址模拟的;应该填写你们真实的后台接口
    //             ws: true,
    //             changOrigin: true,//允许跨域
    //             pathRewrite: {
    //                 '^/api': ''//请求的时候使用这个api就可以
    //             }
    //         }

    //     }
    // },
    // 别名配置
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views'
            }
        }
    }
}