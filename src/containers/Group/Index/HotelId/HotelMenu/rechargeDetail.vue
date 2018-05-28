<!--产品版本页-->
<template>
  <div>
    <div class="module-wrapper">
      <table-RechargeDetail :rechargeList="rechargeList"></table-RechargeDetail>
      <el-pagination
        v-show="total > size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 4, 6]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'prodVersion',
    data () {
      return {
        rechargeList: [],
        versionVal: '',
        page: 1,
        size: 10,
        total: 0,
        offset: 0
      }
    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
      }),
      groupId () {
        return this.$route.params.id
      },
      hotelId () {
        return this.$route.params.hotelid
      }
    },
    watch: {
      configData(val){
        console.log('hehhe:', val)
        this.versionVal = val.product_version;
      }
    },
    methods: {
      ...mapActions([
        'getRechargeList',
        'formatdate',
      ]),
      formatdate: (param) => {
        if (param) {
          var date = new Date(param);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          console.log(Y + M + D )
          return Y + M + D ;
        }
      },
      //获取充值记录列表
      _getRechargeList () {
        this.rechargeList
        this.getRechargeList({
          offset: this.offset,
          limit: this.size,
          hotel_id: this.$route.params.hotelid,
          onsuccess: (body, headers) => {
//            this.rechargeList = body.data;
            let tempList = body.data;
            console.log('=====', tempList)


            tempList.forEach((item, index) => {
              console.log(item)
              console.log(index)
//              this.rechargeList.push({
              this.rechargeList.push({

                pay_fee: item.pay_fee,
                pay_user: item.pay_user,
                recharge_time: this.formatdate(item.recharge_time),
              })
              console.log('--->', this.rechargeList)
            })


            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total-count'] ? this.total = +headers['x-total-count'] : null;
          }

        })
      },
      handleSizeChange(val) {
        console.log('======', val)
        this.size = val;
        this._getRechargeList();
      },
      handleCurrentChange(val) {
        console.log('------>', val)
        this.page = val;
//        currentPage - 1）* pageSize + 1
        this.offset = (this.page - 1) * this.size + 1
        this._getRechargeList();
      },


    },
    mounted () {
      this._getRechargeList();
      this.formatdate(1526276984000);

    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    padding: 2rem;
    span {
      margin-right: 1rem;
    }
    .el-right {
      width: 50%;
    }
    .dialog-footer {
      margin-top: 2rem;
      margin-left: 36%;
      .el-button {
        width: 15rem;
        background-color: #04c54b;
        border: none;
      }
    }
  }
</style>

