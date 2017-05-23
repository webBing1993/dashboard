<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <h3>企业账户搜索</h3>
        <div class="search-bar">
          <input type="text" v-model="searchVal" placeholder="请输入企业的名称或账户编码"/>
          <span class="_button" @click="getList">查询</span>
        </div>
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
        list: [],
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
            let total = 0;
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? total = +headers.map['x-total'][0] : null;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 50px;
    padding: 6px 20px;
    color: #222222;
    border-bottom: 1px solid #ECECEC;
    h3 {
      font-size: 18px;
      font-weight: 400;
    }
    .search-bar {
      display: flex;
      align-items: center;
      input {
        width: 320px;
        text-indent: 1em;
        line-height: 30px;
        margin-right: 10px;
        outline: none;
      }
      ._button {
        line-height: 34px;
        width: 160px;
        font-size: 15px;
      }
    }
  }

  .content {
    padding: 20px;
  }

</style>
