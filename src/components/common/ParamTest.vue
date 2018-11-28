<template>
    <h1>{{value}}</h1>
</template>
<script>
    export default {
        data(){
            return {
                value:this.id === undefined || this.id === null ? '没有获取到参数': this.id,
            }
        },
        props:{
            id: [String, Number]
        }
    }
</script>
