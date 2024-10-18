const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    // proxy: {
    //   "^/api": {
    //     target: "https://ilm.bagicuat.bajajallianz.com",
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
    port: process.env.VUE_APP_PORT, //run on port based on env mode
  },
});
