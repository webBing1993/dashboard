<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <span @click="_goback"></span>
        <h3>品牌配置</h3>
      </div>
      <div class="content">
        <table-brand :list="list" @modify="modify" @remove="remove"></table-brand>
        <span class="_button" @click="addBrand">+ 添加品牌</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableBrand from '@/modules/Tables/table-brand.vue'
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
        'goto'
      ]),
      _goback(){
        this.goto(-1);
      },
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
  .module-wrapper {
    .title {
      display: flex;
      align-items: center;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ECECEC;
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
    .content {
      padding: 20px 32px;
      ._button {
        display: block;
        margin: 0 auto;
        margin-right: 0;
      }
    }
  }

</style>

