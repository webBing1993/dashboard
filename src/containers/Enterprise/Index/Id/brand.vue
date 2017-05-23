<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">品牌配置</h3>
      <div class="content">
        <table-brand :list="list" @modify="modify" @remove="remove"></table-brand>
        <span class="_button" @click="addBrand">+ 添加品牌</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableBrand from '@/components/Tables/table-brand.vue'
  export default {
    name: 'Brand',
    data () {
      return {
        list: []
      }
    },
    components: {
      tableBrand
    },
    methods: {
      ...mapActions([
        'getBrandList',
        'modifyBrand',
        'removeBrand',
      ]),
      addBrand() {
        this.$router.push(`addbrand`)
      },
      modify(obj) {
        this.$router.push(`editbrand/${obj.id}`)
      },
      remove(obj) {
        this.removeBrand({
          id: obj.id,
          onsuccess: body => {
            alert('删除成功')
            this.getList();
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
  .title {
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 300;
    border-bottom: 1px solid #EAEDF0;
  }

  .content {
    padding: 20px;
    ._button {
      line-height: 38px;
      display: block;
      margin: 0 auto;
      margin-right: 0;
    }
  }

</style>

