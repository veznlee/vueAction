<template>
    <div>
        <h1>参数测试页面{{id}}</h1>
        <param-test :id="id"></param-test>
    </div>
</template>

<script>
import ParamTest from "../common/ParamTest";
export default {
    data() {
        return {
            id:'3'
        }
    },
    components:{
        ParamTest
    },
    //如果没有路由监听$route，url参数改变，页面的参数不会变
    // watch: {
    //     '$route': {
    //         // 使用watch来监控是否是同一个路由，这样能保证每次参数改变，页面的数据跟着改变
    //         // 尽管这样做了，当前页面数据会生效，但是ParamTest组件的数据还是没有改变，
    //         //如果需要同样的改变，需要在ParamTest组件进行同样的操作
    //         handler: 'resetData',
    //         immediate: true
    //     }
    // },
    methods: {
        resetData() {
            this.loading = false
            this.error = null
            this.post = null
            this.getPost(this.$route.params.id)
        },
        getPost(id){ 
            this.id = id;
        }
    },
    mounted(){
        
    },
    created(){
        this.id = this.$route.params.id
    }
}
</script>
