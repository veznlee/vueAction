<template>
    <div>
        <h1>定义组建时，render方法里的on里面的事件，是指元素自身触发的事件，而组件标签上的v-on事件，是组件往外发出的事件，注意两者的关系</h1>
        <div class="container">
            
        </div>
        <div id="demo">

        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    
    export default {
        data: function(){
            return {
                value:'111',
                checkValue:'',
                show:true,
                show1:true,
                show2:true,
                show3:true,
                label:'测试',
                value1:'111',
                time:new Date(),
                items:['hehe','haha','heihei']
            }
        },
        methods:{
            input:function(value){
                this.value = value;
            },
            change:function(value){
                this.checkValue = value;
            },
            onFocus:function(){
                console.log('onfocus');
            }
        }
    }
</script>

<style scoped>
    input{
        border:1px solid #666;
    }
</style>