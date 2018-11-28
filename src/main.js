import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'swiper/dist/css/swiper.css';
import "babel-polyfill";
import globe from './components/common/Globe'

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$globe=globe;

/* 注入vue全局中，这样我们可以在组件内或者JS内通过使用this.$qs来使用qs库*/
import qs from 'qs'
import tokenHttp from './libs/tokenHttp'
import local from './libs/local'
Vue.prototype.$qs = qs
Vue.prototype.$tokenHttp = tokenHttp
Vue.prototype.$local = local

import config from './libs/config'
Vue.config.webConfig = config

import compoents from './components/common';
import directives from './components/directives';
//import filters from './components/filters';
import * as custom from './components/filters'
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/404');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
});

//全局定义验证规则
Vue.prototype.phoneRule=(rule,value,callback)=>{
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!value){
        callback(new Error('请输入您的手机号码'))
    }else  if (!reg.test(value)){
        callback(new Error('请输入正确的11位手机号码'))
    }else {
        callback()
    }
};

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
