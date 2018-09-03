<template>
    <div>
        <h1>定义组建时，render方法里的on里面的事件，是指元素自身触发的事件，而组件标签上的v-on事件，是组件往外发出的事件，注意两者的关系</h1>
        <div class="container">
            <anchored-heading :level="1">Hello world!</anchored-heading>
            <h1>
                自己实现v-model
                <vue-model :value="value" v-on:input="input"></vue-model><span>{{value}}</span>
            </h1>
            <h1>
                特殊input的v-model使用
                <base-checkbox v-model="show" v-on:change="change"></base-checkbox><span>{{show}}</span>
                <p><span>{{checkValue}}</span></p>
            </h1>

            <h1>
                将原生事件绑定到组件
                <p>1能触发focus</p>   
                <base-focus v-on:focus.native="onFocus"></base-focus>
                <p>2不能，因为2的input在label里面，实际监听的是根元素label</p>
                <div><base-focus2 v-on:focus.native="onFocus"></base-focus2></div>
                <p>为了解决这个问题，Vue 提供了一个 $listeners 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。</p>
                <div><base-focus3 :label="label" :value="value1" v-on:focus.native="onFocus"></base-focus3></div>
            </h1>
            <ul>
                <li v-for="(item, index) in items" :key=index><span>{{item.name}}</span></li>
            </ul>
        </div>
        <div id="demo">

        </div>
    </div>
</template>


<script>
    import Vue from 'vue';
    Vue.component('anchored-heading', {
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

    var getChildrenTextContent = function (children) {
        return children.map(function (node) {
            return node.children
            ? getChildrenTextContent(node.children)
            : node.text
        }).join('')
    };

    // Vue.component('anchored-heading', {
    //     render: function (createElement) {
    //         // 创建 kebabCase 风格的ID
    //         var headingId = getChildrenTextContent(this.$slots.default)
    //         .toLowerCase()
    //         .replace(/\W+/g, '-')
    //         .replace(/(^\-|\-$)/g, '')

    //         return createElement(
    //             'h' + this.level,
    //             [
    //                 createElement('a', {
    //                 attrs: {
    //                     name: headingId,
    //                     href: '#' + headingId
    //                 }
    //                 }, this.$slots.default)
    //             ]
    //         )
    //     },
    //     props: {
    //         level: {
    //         type: Number,
    //         required: true
    //         }
    //     }
    // })









    Vue.component('vue-model', {
        props: ['value'],
        render: function (createElement) {
            var self = this
            return createElement('input', {
                domProps: {
                    value: self.value
                },
                on: {
                    input: function (event) {
                        self.$emit('input', event.target.value)
                    }
                }
            })
        }
    });

    Vue.component('base-checkbox', {
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: Boolean
        },
        template: `
            <input
            type="checkbox"
            v-bind:checked="checked"
            v-on:change="$emit('change', $event.target.checked)"
            >
            `
    });

    Vue.component('base-focus', {
        props: ['value'],
        template: `
            <input
            type="text"
            v-bind:value="value"
            v-on:change="$emit('change', $event.target.value)"
            >
            `
    });

    Vue.component('base-focus2', {
        props: ['value'],
        template: `
            <label>
            测试
                <input
                    type="text"
                    v-bind="$attrs"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value)"
                >
                </label>
            `
    });

    Vue.component('base-focus3', {
        inheritAttrs: false,
        props: ['label', 'value'],
        computed: {
            inputListeners: function () {
                var vm = this
                // `Object.assign` 将所有的对象合并为一个新对象
                return Object.assign({},
                    // 我们从父级添加所有的监听器
                    this.$listeners,
                    // 然后我们添加自定义监听器，
                    // 或覆写一些监听器的行为
                    {
                        // 这里确保组件配合 `v-model` 的工作
                        input: function (event) {
                            vm.$emit('input', event.target.value)
                        }
                    }
                )
            }
        },
        template: `
            <label>
            {{ label }}
            <input
                type="text"
                v-bind="$attrs"
                v-bind:value="value"
                v-on="inputListeners"
            >
            </label>
        `
    })


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