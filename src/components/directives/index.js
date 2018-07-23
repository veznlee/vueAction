import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});

Vue.directive('clickoutside',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click',documentHandler);
    },
    unbind:function(el){
        document.removeEventListener('click',el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
})

Vue.directive('resize',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__resize__ = documentHandler;
        window.addEventListener('resize',documentHandler);
    },
    unbind:function(el,binding,vnode){
        window.removeEventListener('resize',el.__resize__);
        delete el.__resize__;
    }
});

Vue.directive('oncontextmenu',{
    bind:function(el,binding,vnode){
        function documentHandler(e){
            var event = e || window.event;
            event.preventDefault?(event.preventDefault()):(event.returnValue = false);
            // var pageX = event.pageX?event.pageX:(event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft)),
            //     pageY = event.pageY?event.pageY:(event.clientY+(document.body.scrollTop||document.documentElement.scrollTop));
            if(binding.expression){
                binding.value.fn(event,binding.value.args);
            }
        }
        el.__handEvent__ = documentHandler;
        el.addEventListener('contextmenu',documentHandler);
    },
    unbind:function(el,binding,vnode){
        el.removeEventListener('contextmenu',el.__handEvent__);
        delete el.__handEvent__;
    }
});