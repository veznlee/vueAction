<template>
    <div>
        <h1>定义组建时，render方法里的on里面的事件，是指元素自身触发的事件，而组件标签上的v-on事件，是组件往外发出的事件，注意两者的关系</h1>
        <div class="container">
            <anchored-header :level="1">Hello world!</anchored-header>
            <!-- <anchored-header2 :level="1">
                <div slot :text="message">Hello world!</div>
            </anchored-header2> -->
            <mycom :v="nnum" @input="updateValue"></mycom>
            <div>{{nnum}}</div>
            <BUTTON @click="change()">change</BUTTON>

            <base-component :message="message">
                <template slot-scope="ssName">
                    {{ssName.text}}
                </template>
            </base-component>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue';

    Vue.component('anchored-header', {
        render: function (createElement) {
            return createElement(
                'h' + this.level,   // tag name 标签名称
                this.$slots.default // 子组件中的阵列
            )
        },
        props: {
            level: {
                type: Number,
                required: true
            }
        }
    });

    Vue.component('BaseComponent', {
        props: ['message'],
        /*template: `
        <div><slot :text="message"></slot></div>
        `,*/
        render: function (createElement) {
            console.log(this)
            return createElement('div', [
                this.$scopedSlots.default({
                    text: this.message
                })
            ])
        }
    })


    Vue.component('mycom',{
        render:function(createElement){
            var self=this;
            var inp=createElement('input',
                {
                    domProps:{
                        value:self.v
                    },
                    on:{
                        input:function(event){
                            self.$emit('input',event.target.value)
                        }
                    }
                }
            );
            return createElement('div',[inp])
        },
        props:{
            v:{
                type:Number,
                default:0
            }
        }
    });
    
    export default {
        data: function(){
            return {
                value:'111',
                checkValue:'',
                message:'hello world!',
                label:'测试',
                value1:'111',
                time:new Date(),
                items:['hehe','haha','heihei'],
                nnum:100,
                arr:[1,2,3,4,5,6,7,8]
            }
        },
        methods:{
            updateValue:function(value){
                this.nnum=parseFloat(value);
            },
            change:function () {
                this.nnum = 100;
            }
        }
    }
</script>

<style scoped>
    input{
        border:1px solid #666;
    }
</style>