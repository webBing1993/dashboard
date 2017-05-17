<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <h3>企业门店</h3>
        <table-hotel :list="list" @config="config" @service="service" @device="device" @source="source"></table-hotel>
        <button @click="topPage">首页</button>
        <button @click="previousPage">上一页</button>
        <span>1</span>
        <button @click="nextPage">下一页</button>
        <button @click="endPage">尾页</button>
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
        list: [{code: 'E01', name: '如家酒店集团', enterprise: '如家酒店集团', status: 0, services: 3}]
      }
    },
    components: {
      tableHotel
    },
    methods: {
      ...mapActions([
        'getHotelList'
      ]),
      regist() {
        
      },
      config(obj) {
        
      },
      service(obj) {
        
      },
      device(obj) {
        
      },
      source(obj) {
        
      },
      topPage() {

      },
      previousPage() {

      },
      nextPage() {

      },
      endPage() {

      },
      getList() {
        this.getHotelList({
          searchVal: this.searchVal,
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

<style scoped>
  .content {
    padding: 0 20px;
  }
</style>

