<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <h3>企业门店</h3>
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
        <xpage :showJump="true" :init-page="page" :total-page="totalPage" @go-page="goPage"></xpage>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableHotel from '@/components/Tables/table-hotel.vue'
  export default {
    name: 'Hotel',
    data () {
      return {
        searchVal: '',
        list: [],
        page: 1,
        size: 10,
        totalPage: 0
      }
    },
    components: {
      tableHotel
    },
    methods: {
      ...mapActions([
        'getHotelList'
      ]),
      detail(obj) {
        this.$router.push(`/enterprise/hotel/${obj.id}`)
      },
      group(obj) {
        this.$router.push(`/enterprise/${obj.id}`)
      },
      config(obj) {
        this.$router.push(`config`)
      },
      goPage(data) {
        this.page = data.page;
        this.getList();
      },
      getList() {
        this.getHotelList({
          group_id: this.$route.params.id,
          page: this.page.toString(),
          size: this.size.toString(),
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
  .module-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    .content {
      width: 100%;
      align-items: center;
      h3 {
        line-height: 50px;
        border-bottom: 1px solid #ECECEC;
        font-weight: 400;
        font-size: 18px;
      }
      .v-table {
        margin-top: 20px;
        line-height: 45px;
      }
    }
    .content-bot {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      button {
        width: 100px;
        line-height: 32px;
        margin: 0 8px;
      }
    }
  }
</style>

