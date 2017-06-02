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
        this.$router.push({
          name: 'EditBrand'
        })
      },
      edit(obj) {
        this.$router.push({
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
      padding: 20px 32px;
      ._button {
        display: block;
        margin: 0 auto;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }

</style>