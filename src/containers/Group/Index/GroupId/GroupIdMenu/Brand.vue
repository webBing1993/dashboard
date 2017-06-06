<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="el-btn-box">
          <el-button type="success" @click.native="addBrand">+ 添加品牌</el-button>
        </div>
        <table-brand :list="list" @edit="edit"></table-brand>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'Brand',
    data () {
      return {
        list: []
      }
    },
    methods: {
      ...mapActions([
        'getBrandList',
        'goto'
      ]),
      goback(){
        this.goto(-1);
      },
      addBrand() {
        this.goto({
          name: 'EditBrand'
        })
      },
      edit(obj) {
        this.goto({
          name: 'EditBrand',
          query: {
            brandid: obj.id
          }
        })
      },
      getList() {
        this.getBrandList({
          group_id: this.$route.params.id,
          onsuccess: body => this.list = body.data
        })
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    .content {
      padding: 12px 20px;
      .el-btn-box {
        width: 172px;
        line-height: 40px;
        float: right;
        background-color: #39C240;
        margin-bottom: 10px;
        font-size: 14px;
        border-radius: 3px;
        button {
          width: 100%;
          height: 100%;
          background-color: transparent;
          padding: 12px 0;
        }
      }
    }
  }

</style>
