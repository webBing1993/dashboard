<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">品牌配置</h3>
      <div class="content">
        <table-brand :list="list" @modify="modify" @remove="remove"></table-brand>
        <button @click="add"> + 添加品牌</button>
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
        list: [{name: 'E01', logo: '如家酒店集团'}]
      }
    },
    components: {
      tableBrand
    },
    methods: {
      ...mapActions([
        'getBrandList'
      ]),
      add() {

      },
      modify(obj) {

      },
      remove(obj) {

      },
      getList() {
        this.getBrandList({
          id: this.$route.params.id,
          onsuccess: body => console.log(body.data)
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
    button {
      cursor: pointer;
      width: 120px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 100;
      color: #fff;
      background-color: #576b95;
      border: none;
      display: block;
      margin: 0 auto;
      margin-right: 0;
      outline: none;
    }
  }

</style>

