<template>
  <el-main>
    <div class="module-wrapper">
      <div class="title">筛选</div>
      <el-row  style="margin-bottom:20px;">
        <el-col :span="2">
          <div class="hotelitle" style="text-align: left">
            <span>酒店名称</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-select v-model="selectHotel" filterable placeholder="请选择">
              <el-option
                v-for="item in hotelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="datetitle">
            <span>交易日期</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="firstdate">
            <el-date-picker
              v-model="datatime1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="mcenter">
            <span>至</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="firstdate">
            <el-date-picker
              v-model="datatime2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="datetitle">
            <span>交易类型</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-select v-model="selectTradeType" filterable placeholder="请选择">
              <el-option
                v-for="item in tradeTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row  style="margin-bottom:20px;">
        <el-col :span="2">
          <div class="hotelitle" style="text-align: left">
            <span>订单号</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-input v-model="orderId"  placeholder="请输入订单号"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="datetitle">
            <span>交易状态</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-input v-model="tradeStatus"  placeholder="请输入交易状态"></el-input>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="selectButton">
            <span @click="selectClick">查询</span>
          </div>
        </el-col>
      </el-row>
      <tableOnlineCashierStatistics :list="tableData"></tableOnlineCashierStatistics>
      <div v-if="tableData.length==0">
        暂无数据
      </div>
    </div>
  </el-main>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tableOnlineCashierStatistics from '@/modules/Tables/table-onlineCashierStatistics.vue'

  function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate() + '';
    return Y+M+D;
  }
  export default {
    components: {
      tableOnlineCashierStatistics
    },
    data () {
      return {
        tableData: [],
        datatime1:'',
        datatime2:'',
        selectHotel:'',
        hotelList:'',
        selectTradeType:'',  //交易类型
        tradeTypeList:[{id:'1',name:'微信'},{id:'2',name:'支付宝'},{id:'3',name:'微信预授权'},{id:'4',name:'支付宝预授权'}],    //交易类型列表
        orderId:'',   //订单号
        tradeStatus:'',// 交易状态  (支付/预授权完成/预授权撤销/退款/预授权冻结)
      }
    },
    methods:{
      ...mapActions([
        'getList','getStatistics','getHotelList1','showtoast'
      ]),
      initHotelList(){
        this.getHotelList1({
          page:1,
          pageSize:3000,
          onsuccess: body => {
            if(body.data!=null && body.data!=''){
              this.hotelList=body.data.list;
            }
          }
        });
      },
      initStatistics(){
        this.getStatistics({
          dateTime:this.datatime1,
          endTime:this.datatime2,
          hotelId:this.selectHotel,
          onsuccess: body => {
            this.tableData=body.data;
            console.log(this.tableData)
          }
        });
      },
      selectClick(){
        if(this.selectHotel=='' ){
          this.showtoast({
            text: '请选择酒店',
            type: 'warning'
          })
          return;
        }
        if(this.datatime1=='' ||this.datatime2=='' ){
          this.showtoast({
            text: '请选择时间',
            type: 'warning'
          })
          return;
        }
        this.datatime1=timestampToTime(this.datatime1);
        this.datatime2 = timestampToTime(this.datatime2);
        this.initStatistics();
      }
    },
    created(){
      this.initHotelList();

    }

  }
</script>

<style lang="less" scoped>
  .all {
    width: 100%;
  }
  .module-wrapper {
    padding: 0px 20px 20px 20px;
    font-size: 14px;
    color: #606266;
    font-weight: normal;
    line-height: 40px;
    text-align: center;

    .title {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 20px;
      width: 100%;
      text-align: left;
    }

    .firstdate {
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
      }

      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
      }
    }

    /deep/ .el-table {
      margin-top: 20px;
    }

    /deep/ .el-table th {
      background-color: #9B9B9B;
      font-size: 14px;
      color: #3e3e3e;
      height: 38px;
      padding: 0;
    }

    .selectButton {
      display: flex;
      justify-content: center;
      width: 100%;

      span {
        width: 90px;
        height: 44px;
        background-color: #39C240;
        color: #ffffff;
        border-radius: 5px;
      }
    }

    .mcenter {
      text-align: center;
    }
  }
</style>
