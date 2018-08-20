<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-warning"></i> 权限测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理员权限页面</h1>
            <p>只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
            <p>想尝试一下，请<router-link to="/login" class="logout">退出登录</router-link>，随便输入个账号名，再进来试试看。</p>
            <p class="btnline">
                <button v-on:click="show = !show">Toggle1</button>
                <button v-on:click="show1 = !show1">Toggle1</button>
                <button v-on:click="show2 = !show2">Toggle2</button>
                <button v-on:click="show3 = !show3">Toggle2</button>
            </p>
        </div>
        <div id="demo">
            <transition
                name="custom-classes-transition"
                enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight"
            >
                <p v-if="show">hello</p>
            </transition>
            <transition name="fade">
                <p class="testshow" v-if="show1">hello</p>
            </transition>
            <transition name="slide-fade">
                <p class="testshow" v-if="show2">hello</p>
            </transition>
            <transition name="bounce">
                <p class="testshow" v-if="show3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
            </transition>
            <transition name="bounce" 
                :duration="{ enter: 300, leave: 8000 }"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                v-on:enter-cancelled="enterCancelled"

                v-on:before-leave="beforeLeave"
                v-on:leave="leave"
                v-on:after-leave="afterLeave"
                v-on:leave-cancelled="leaveCancelled">

                <p class="testshow" v-if="show3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
            </transition>

            
            
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                show:true,
                show1:true,
                show2:true,
                show3:true,
                time:new Date()
            }
        },
        methods:{
            tshow:function(){
                this.show1 = !this.show1;
            },

            beforeEnter: function (el) {
                console.log('beforeEnter');
                // ...
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            enter: function (el, done) {
                // ...
                this.time = Date.now();
                console.log('enter');
                done()
            },
            afterEnter: function (el) {
                console.log('afterEnter');
                // ...
            },
            enterCancelled: function (el) {
                console.log('enterCancelled');
                console.log(Date.now() - this.time);
                // ...
            },

            // --------
            // 离开时
            // --------

            beforeLeave: function (el) {
                console.log('beforeLeave');
                // ...
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            leave: function (el, done) {
                console.log('leave');
                // ...
                done()
            },
            afterLeave: function (el) {
                console.log('afterLeave');
                // ...
            },
            // leaveCancelled 只用于 v-show 中
            leaveCancelled: function (el) {
                console.log('leaveCancelled');
                // ...
            }
        }
    }
</script>

<style scoped>
h1{
    text-align: center;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
.testshow{
    width:200px;
    height:200px;
    background:#000;
}
.btnline button{
    margin:2px;
    padding:5px;
    cursor:pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

/* CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。 */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>