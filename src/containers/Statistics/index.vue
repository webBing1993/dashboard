<!--<template>-->
  <!--<div>-->
    <!--<div class="module-wrapper">-->
      <!--&lt;!&ndash;<p class="side_title" v-show="list.length > 0">&ndash;&gt;-->
        <!--&lt;!&ndash;<span v-for="(obj, index) in list" @click="breadGo(obj.path)">{{obj.name}}</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;默认显示了三级路由的页面&ndash;&gt;-->
      <!--<router-view class="third-router"/>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import '../../assets/styles/asideMenu_title/index.less';-->
    <!--import {mapActions,mapGetters, mapState, mapMutations} from 'vuex'-->
    <!--export default {-->
       <!--components:{-->

        <!--},-->
        <!--data(){-->
            <!--return {-->

            <!--}-->
        <!--},-->
        <!--computed: {-->
            <!--list () {-->
                <!--let bread = [];-->
                <!--for (let obj of this.$route.matched) {-->
                    <!--if (obj.path === '/statistics/orderStatistics') {-->
                        <!--bread.push ({name: '订单统计', path: '/orderStatistics'})-->
                    <!--}-->
                    <!--else if (obj.path === '/statistics/brandManage') {-->
                        <!--bread.push ({name: '品牌管理', path: '/statistics/brandManage'})-->
                    <!--} else if (obj.path === '/statistics/funnelAnalysis') {-->
                        <!--bread.push ({name: '漏斗分析', path: '/statistics/funnelAnalysis'})-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--matched() {-->
                <!--console.log(this.$route.matched)-->
                <!--return this.$route.matched-->
            <!--},-->
        <!--},-->
        <!--watch: {},-->
        <!--methods: {-->
            <!--...mapActions([-->
                <!--'getGroup',-->
                <!--'getHotel',-->
                <!--'goto'-->
            <!--]),-->
            <!--breadGo (path) {-->
                <!--this.goto (path)-->
            <!--}-->
        <!--},-->
        <!--mounted () {-->

        <!--}-->

  <!--}-->
<!--</script>-->
