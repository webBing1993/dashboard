<template>
  <div>
    <div class="module-wrapper">
      <span class="title">门店管理</span>
      <div class="search-bar">
        <input type="text" v-model="searchVal" placeholder="请输入门店的名称或子账户编码"/>
        <span class="_button" @click="search">查询</span>
        <span class="_button" @click="regist">+ 添加企业门店</span>
      </div>
      <h3>最近操作的门店</h3>
      <div class="content">
        <table-hotel :list="list" @detail="detail" @group="group" @config="config"></table-hotel>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import tableHotel from '@/modules/Tables/table-hotel.vue'
  export default {
    name: 'Hotel',
    data () {
      return {
        searchVal: '',
        brandList: [],
        hotelList: []
      }
    },
    components: {
      tableHotel
    },
    computed: {
      list() {
        return this.hotelList.map(hotel => {
          let brand;
          let obj = this.brandList.find(v => {
            brand = v;
            return brand.id == hotel.brand_id
          });
          if (obj === undefined) {
            hotel.brand_name = '';
          } else {
            hotel.brand_name = brand.name;
          }
          return hotel;
        });
      }
    },
    methods: {
      ...mapActions([
        'getHotelList',
        'getBrandList'
      ]),
      regist() {
        this.$router.push('addhotel')
      },
      detail(obj) {
        this.$router.push(`/enterprise/hotel/${obj.id}`)
      },
      group(obj) {
        if (obj.group_id == '') return;
        this.$router.push(`/enterprise/${obj.group_id}`)
      },
      config(obj) {
        this.$router.push(`/enterprise/${obj.id}/config`)
      },
      getList() {
        this.getHotelList({
          searchVal: this.searchVal,
          onsuccess: body => this.hotelList = body.data
        })
      },
      brangList() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
      search() {
        let val = this.searchVal ? this.searchVal : undefined;
        this.$router.push(`/enterprise/searchHotel/${val}`)
      }
    },
    mounted() {
      this.brangList();
      this.getList();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    display: block;
    border-bottom: 1px solid #ECECEC;
    font-weight: 400;
    font-size: 18px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    input {
      width: 65%;
      height: 40px;
      font-size: 14px;
      outline: none;
      text-indent: 1em;
    }
    ._button {
      width: 160px;
      margin-left: 40px;
    }
  }

  h3 {
    font-weight: 300;
    font-size: 20px;
    padding: 0 20px 10px;
    &:before {
      content: '';
      border-left: solid 4px #8f8f8f;
      padding-right: 8px;
    }
  }

  .content {
    padding: 0 20px;
    height: 70%;
    overflow: auto;
  }
</style>

