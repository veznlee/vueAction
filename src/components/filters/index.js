/**
// 官方注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})
// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')


我们可以抽出到独立文件，然后使用Object.keys在main.js入口统一注册
/src/common/filters.js
let dateServer = value => value.replace(/(d{4})(d{2})(d{2})/g, '$1-$2-$3')
export { dateServer }

/src/main.js
import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))
然后在其他的.vue 文件中就可愉快地使用这些我们定义好的全局过滤器了
*/

let dateServer = value => value.replace(/(d{4})(d{2})(d{2})/g, '$1-$2-$3')
export { dateServer }