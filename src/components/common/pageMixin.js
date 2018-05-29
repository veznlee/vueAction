var pageMixin = {
    methods:{
        queryList:function(){
            console.log('queryList');
        },
        delete:function(item){
            console.log('delete',item);
            this.$tokenHttp.get(this.urlDelete,{params:{item:item}})
            .then(function(){
                this.queryList();
            },function(){
                this.queryList();
            })
        },
        add:function(){

        }
    },
    created:function(){
        this.queryList();
    }
}
export default pageMixin