<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <div class="header">
          <span @click="_goback"></span>
          <h3>企业账户搜索</h3>
        </div>
        <div class="search-bar">
          <input type="text" v-model="searchVal" placeholder="请输入企业的名称或账户编码"/>
          <span class="_button" @click="getList">查询</span>
        </div>
      </div>
      <div class="content">
        <table-enterprise :list="list" @detail="goDetail" @hotel="goHotel" @edit="goEdit"
                          @config="goConfig"></table-enterprise>
        <el-pagination
          v-show="total > size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableEnterprise from '@/modules/Tables/table-enterprise.vue';
  export default {
    name: 'SearchGroup',
    data () {
      return {
        searchVal: this.$route.query.group || '',
        list: [],
        page: 1,
        size: 10,
        total: 0
      }
    },
    components: {
      tableEnterprise
    },
    methods: {
      ...mapActions([
        'getGroupList',
        'goto'
      ]),
      _goback(){
        this.goto(-1);
      },
      goDetail(obj) {
        this.$router.push(`/group/${obj.id}`)
      },
      goHotel(obj) {
        this.$router.push(`/group/${obj.id}/hotel`)
      },
      goEdit(obj) {
        this.$router.push(`/group/${obj.id}`)
      },
      goConfig(obj) {
        this.$router.push(`group/${obj.id}/brand`)
      },
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList() {
        this.getGroupList({
          page: this.page.toString(),
          size: this.size.toString(),
          searchVal: this.searchVal != 'undefined' ? this.searchVal : undefined,
          onsuccess: (body, headers) => {
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? this.total = +headers.map['x-total'][0] : null;

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
    .header {
      display: flex;
      align-items: center;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #0D0D0D;
      }
      span {
        display: block;
        width: 24px;
        height: 24px;
        background-color: #C8C8CD;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        &:before {
          content: '';
          width: 6px;
          height: 6px;
          display: block;
          border-left: solid 1px #ffffff;
          border-bottom: solid 1px #ffffff;
          position: absolute;
          left: 10px;
          top: 8px;
          transform: rotate(45deg);
        }
      }
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
