
import Vue from "vue";
Vue.component('ButtonDelete',{
    template:'<button class="el-button el-button--mini btn-green" @click="handleDelete()">删除</button>',
    props:{
        url:{
            type:String
        },
        params:{
            type:Object
        }
    },
    methods:{
        handleDelete:function(params) {
            console.log(0);
            console.log(this.url,this.params);
            this.$tokenHttp.get(this.url,{params:this.params})
            .then(function(res){
                console.log(res);
            },function(res){
                console.log(res);
            })
        }
    }
})