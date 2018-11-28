import Vue from 'vue'
 
/**
* 首字母大写
* @param str 字符串
* @example heheHaha
* @return  HeheHaha
*/
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
 
/**
* 对符合'xx/xx.vue'组件格式的组件取组件名
* @param str fileName
* @example abc/bcd/def/basicTable.vue
* @return {string} BasicTable
*/
function validateFileName(str) {
  return /^S+.vue$/.test(str) &&
    str.replace(/^S+/(w+).vue$/, (rs, $1) => capitalizeFirstLetter($1))
}

//借助一下神器webpack，使用 require.context() 方法来创建自己的模块上下文
const requireComponent = require.context('./', true, /.vue$/)
 
// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath)
  const fileName = validateFileName(filePath)
  const componentName = fileName.toLowerCase() === 'index'
    ? capitalizeFirstLetter(componentConfig.default.name)
    : fileName
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// https://mp.weixin.qq.com/s/JZlQBEHW_hDjooQiZsQI6w
// 文件夹结构
// components
// │ componentRegister.js
// ├─BasicTable
// │ BasicTable.vue
// ├─MultiCondition
// │ index.vue
// 这里对组件名做了判断，如果是index的话就取组件中的name属性处理后作为注册组件名，
// 所以最后注册的组件为：multi-condition、basic-table 最后我们在main.js中
// import ‘components/componentRegister.js’，然后我们就可以随时随地使用这些基础组件，无需手动引入了~