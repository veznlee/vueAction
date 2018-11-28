import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name:'Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    name:'Home',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/administrator',
                    name:'Administrator',
                    component: resolve => require(['../components/page/sjg_administrator.vue'], resolve),
                    meta: { title: '管理员' }
                },
                {
                    path: '/param',
                    name:'ParamTable',
                    component: resolve => require(['../components/page/paramTable.vue'], resolve),
                    meta: { title: '参数配置' }
                },
                {
                    name:'Paramtest',
                    path: '/paramtest/:id',
                    component: resolve => require(['../components/page/Param.vue'], resolve),
                    meta: { title: '参数测试' }
                },
                {
                    path: '/table',
                    name:'BaseTable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/list',
                    name:'BaseList',
                    component: resolve => require(['../components/page/BaseList.vue'], resolve),
                    meta: { title: '基础列表' }
                },
                {
                    path: '/tabs',
                    name:'Tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    name:'BaseForm',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    name:'VueEditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    name:'Markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    name:'Upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    name:'BaseCharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    name:'DragList',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    name:'Permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    // render函数
                    path: '/render',
                    name:'Render',
                    component: resolve => require(['../components/page/Render.vue'], resolve),
                    meta: { title: 'render函数', permission: true }
                },
                {
                    // render函数之插槽
                    path: '/slot',
                    name:'Slot',
                    component: resolve => require(['../components/page/Slot.vue'], resolve),
                    meta: { title: 'slot插槽', permission: true }
                },
                {
                    // render函数之函数式组件
                    path: '/functional',
                    name:'Functional',
                    component: resolve => require(['../components/page/Functional.vue'], resolve),
                    meta: { title: '函数式组件', permission: true }
                },
            ]
        },
        {
            path: '/login',
            name:'Login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/dashboard',
        }
    ]
})
