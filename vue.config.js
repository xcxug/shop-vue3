const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === "production" ? "/vueclidemo/" : "/", // 配置项目路径
  // outputDir: "dist", // 构建输出目录，默认目录dist
  // assetsDir: "assets", // 静态资源目录（js,css,image），默认是src/assets
  // lintOnSave: false, // 是否开启eslint检测，false不开启，有效值：true || false
  // productionSourceMap: false, // 生产环境下面开启sourceMap用于代码的调试，true开启，false关闭，默认是true
  devServer: {
    // open: true, // 是否运行项目自动打开默认浏览器，默认是false
    // host: "192.168.43.230", // 主机，0.0.0.0支持局域网地址，可以用真机测试，默认是0.0.0.0，也可以是ip地址（192.168.43.230）
    // port: 8081, // 端口，默认是8080
    // https: false, // 是否启动https，默认是false
    // 配置跨域代理http,https
    proxy: {
      "/api": {
        // target: "https://community-admin-uat.test.hihonor.com", // 接口地址
        target: process.env.VUE_APP_API, // 接口地址
        changeOrigin: true, // 开启代理，如果设置为true，那么本地会虚拟一个服务端接收你的请求并代你发送该请求
        pathRewrite: { "^/api": "" }, // 地址重定向，相当于/api等于http://vueshop.glbuys.com/api
      },
    },
  },
  // configureWebpack: {
  //   devtool: "source-map", // 配置开发者环境的sourceMap用于代码调试
  // },
});
