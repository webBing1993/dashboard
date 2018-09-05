<template>
  <div>
    素材
    素材
    素材
    素材
    素材
  </div>
</template>
<script>
    import {mapActions,mapState} from 'vuex'

    export default {
        components:{
        },
        data(){
            return{

            }
        },
        methods:{
            ...mapActions([
                'goto',
                'getLvyeCopList',

            ]),

        },
        computed:{
            ...mapState([
                'route',
                'Interface'
            ]),

        },
        mounted(){

        }
    }
</script>
<style lang="less" scoped>

</style>
