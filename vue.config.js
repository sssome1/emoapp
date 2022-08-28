const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'/',
  pages:{
    index:{
      title:'网易雨音乐',
      entry:'src/main.js'
    }
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  // devServer: {
  //   open:true,
  //   host:'192.168.43.130',
  //   port:8080,
  //   proxy: {
  //     '/musicAPI': {
  //       target: 'http://localhost:3000',
  //       pathRewrite: { '^/musicAPI': '' },
  //     },
  //   },
  // },
})
