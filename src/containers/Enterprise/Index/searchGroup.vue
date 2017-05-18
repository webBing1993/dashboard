<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">企业账户搜索</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入企业的名称或账户编码"/>
        <button @click="getList"> 查询 </button>
      </div>
      <div class="content">
        <table-enterprise :list="list" @detail="goDetail" @hotel="goHotel" @edit="goEdit"
                          @config="goConfig"></table-enterprise>
        <xpage :showJump="true" :init-page="page" :total-page="totalPage" @go-page="goPage"></xpage>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableEnterprise from '@/components/Tables/table-enterprise.vue';
  export default {
    name: 'SearchGroup',
    data () {
      return {
        searchVal: this.$route.params.searchVal == 'undefined' ? '' : this.$route.params.searchVal,
        list: [
          {
            "id": "xxxxxxxxxxxxxxxx",
            "name": "如家集团",
            "memo": "企业简介企业简介企业简介企业简介",
            "website": "http://www.baidu.com",
            "hotel_num": "23"   //门店数量（只用在搜索接口返回）
          }
        ],
        page: 1,
        size: 10,
        totalPage: 0
      }
    },
    components: {
      tableEnterprise
    },
    methods: {
      ...mapActions([
        'getEnterpriseList',
      ]),
      goDetail(obj) {
        this.$router.push(`/enterprise/${obj.id}`)
      },
      goHotel(obj) {
        this.$router.push(`/enterprise/${obj.id}/hotel`)
      },
      goEdit(obj) {
        this.$router.push(`/enterprise/${obj.id}/edit`)
      },
      goConfig(obj) {
        this.$router.push(`/enterprise/${obj.id}/config`)
      },
      goPage(data) {
        this.page = data.page;
        this.getList();
      },
      getList() {
        this.getEnterpriseList({
          page: this.page.toString(),
          size: this.size.toString(),
          searchVal: this.searchVal != 'undefined' ? this.searchVal : undefined,
          onsuccess: (body, headers) => {
            this.page = headers.map['X-Current-Page'];
            let total = headers.map['X-Total'];
            this.totalPage = Math.ceil(total / this.size);
            this.list = body.data;
          }
        })
      }
    },
    mounted() {
        this.getList();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    border-bottom: 1px solid #ECECEC;
  }

  .content {
    padding: 20px;
  }

  
</style>
