<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-tags></v-tags>
        <v-sidebar></v-sidebar>
        <!-- <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div> -->
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <!-- 当vue-router从/post-page/a，跳转到/post-page/b。然后我们惊人的发现，页面跳转后数据竟然没更新？
                    原因是vue-router”智能地”发现这是同一个组件，然后它就决定要复用这个组件，
                    所以你在created函数里写的方法压根就没执行，可以使用下面的方式-->
                    <!-- <router-view :key="$route.fullpath+ +new Date()"></router-view> -->

                    <!-- 如果组件被放在<keep-alive>中的话，可以把获取新数据的方法放在activated钩子，
                        代替原来在created、mounted钩子中获取数据的任务。 -->
                    <keep-alive>
                        <router-view :key="$route.fullpath+ +new Date()"></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from '../common/bus';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>
