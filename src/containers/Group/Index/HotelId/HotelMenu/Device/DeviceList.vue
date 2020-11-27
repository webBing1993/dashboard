<template>
  <div>
    <div class="module-wrapper">
      <div class="content_devicelist">
        <div class="devicelist_title">
          <div class="devicelist_title_left">
            <span>设备管理</span>
            <div class="left_div">
                <span>是否缴纳设备押金 : &nbsp; </span>
                <span :class="isDevicePaid?'deviceAmount':'noDeviceAmoint'">{{isDevicePaid?'是':'否'}}</span>
            </div>
            <div class="left_div">
                <span>押金金额 : &nbsp;  </span>
                <span :class="isDevicePaid?'deviceAmount':'noDeviceAmoint'">{{deviceAmount?deviceAmount:0}}元</span>
            </div>
          </div>
          <div>
            <el-button type="success" @click.native="addOther">关联游离设备</el-button>
            <el-button type="success" @click.native="add">添加新设备</el-button>
          </div>
        </div>
        <table-device :list="list" :page="page" :size="size" @edit="edit" @update_aly="update_aly"></table-device>
        <el-pagination
          v-show="total > size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'DeviceList',
    data() {
      return {
        list: [],
        page: 1,
        size: 2,
        total: 0,
        //酒店设备配置
        isDevicePaid:false,  //是否酒店配置
        deviceAmount:'',     //酒店押金金额
      }
    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
      }),
    },
    watch: {
      configData() {
        let configData = this.configData;
        //酒店设备是否配置
        if(configData.device_deposit!=undefined){
          let deviceDepositObj=JSON.parse(configData.device_deposit);
          this.isDevicePaid=deviceDepositObj.paid;       //是否酒店配置
          this.deviceAmount=deviceDepositObj.amount     //酒店押金金额
        }

      }
    },
    methods: {
      ...mapActions([
        'getDeviceList',
        'updateToALY',
        'goto','getConfig'
      ]),
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid
        })
      },
      add(obj) {
        this.goto({
          name: 'EditDevice'
        })
      },
      edit(obj) {
          console.log(obj)
        this.goto({
          name: 'EditDevice',
          query: {
            device_id: obj.id,
          }
        })
      },
      update_aly(obj){
        console.log('------->',obj)
        this.updateToALY({
          deviceId:obj.id,
          onsuccess: (body) =>{
              console.log(body)
            this.getList();

          }
        })
      },
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList() {
        this.getDeviceList({
          hotel_id: this.$route.params.hotelid,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;
            console.log(body)
            this.list = body.data;
          }
        })
      },
      addOther() {
        this.goto({name: 'RelationDevice'})
      }
    },
    mounted() {
      this.getList();
      this.getConfigs()
      console.log("222",this.configData);
    }
  }
</script>
<style lang="less">
  .content_devicelist {
    padding: 20px 25px 0 24px;
    .devicelist_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 7px;
      .devicelist_title_left{
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          margin-right:90px
        }
        .left_div{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .left_div:first-of-type {
          margin-right:30px
        }
      }
      span {
        font-size: 16px;
        font-weight: normal;
        color: #4A4A4A;
        padding: 0;
        border-bottom: 0;
      }
      .deviceAmount{
         color:#39C240;
         font-size: 20px;
      }
      .noDeviceAmoint{
         color:#ff2b1c;
        font-size: 20px;
      }
      .el-button {
        min-width: 173px;
        line-height: 18px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        padding: 0;
        span {
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }

</style>
