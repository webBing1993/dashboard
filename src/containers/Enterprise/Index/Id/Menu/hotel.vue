<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="search-bar">
          <h3>企业门店</h3>
          <button @click="regist"> + 添加企业门店</button>
        </div>
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
        brandList: [],
        hotelList: [],
        page: 1,
        size: 10,
        totalPage: 0,
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
        this.$router.push('/enterprise/addhotel')
      },
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
      brangList() {
        this.getBrandList({
          onsuccess: body => this.brandList = body.data
        })
      },
      getList() {
        this.getHotelList({
          group_id: this.$route.params.id,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            let total = 0;
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? total = +headers.map['x-total'][0] : null;
            this.totalPage = Math.ceil(total / this.size);

            this.hotelList = body.data;
          }
        })
      }
    },
    mounted() {
      this.brangList();
      this.getList();
    }
  }
</script>

<style scoped lang="less">

  .module-wrapper {
    padding: 0 20px;
    .content {
      width: 100%;
      align-items: center;
      .search-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ECECEC;
        h3 {
          flex: 1;
          line-height: 50px;
          font-weight: 400;
          font-size: 18px;
          padding: 10px 0;
          &:before {
            content: '';
            border-left: solid 4px #8f8f8f;
            padding-right: 8px;
          }
        }
        button {
          width: 180px;
          line-height: 35px;
        }
      }

      .v-table {
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

