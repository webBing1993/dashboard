<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">门店管理</h3>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入门店的名称或子账户编码"/>
        <button @click="getList"> 查询 </button>
        <button @click="regist"> + 添加企业门店</button>
      </div>
      <div class="content">
        <h3>最近操作的门店</h3>
        <table-hotel :list="list" @config="config" @service="service" @device="device" @source="source"></table-hotel>
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
        this.$router.push('addhotel')
      },
      config(obj) {
        
      },
      service(obj) {
        
      },
      device(obj) {
        
      },
      source(obj) {
        
      },
      getList() {
        this.getHotelList({
          searchVal: this.searchVal,
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
  .title {
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #757575;
  }
  .search-bar {
    width: 100%;
    padding: 8px, 20px;
    box-sizing: border-box;
  }
  input {
    width: 50%;
    height: 40px;
    font-size: 18px;
  }
  button {
    cursor: pointer;
    height: 40px;
    font-size: 18px;
    color: #fff;
    background-color: #0000FF;
    border: none;
  }
  .content {
    padding: 0 20px;
  }
</style>

