/*
 * @Descripttion:
 * @version:
 * @Author: tommy
 * @Date: 2021-08-26 16:17:09
 * @LastEditors: tommy
 * @LastEditTime: 2021-08-26 16:17:09
 */
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/style.scss";`
      }
    }
  }
}
