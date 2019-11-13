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
            <span>交易状态</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-select v-model="tradeStatus" filterable placeholder="请选择">
              <el-option
                v-for="item in  tradeStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="datetitle">
            <span>订单号</span>
          </div>
        </el-col>
        <el-col :span="6" style="text-align: left">
          <div>
            <el-input v-model="orderId"  placeholder="请输入订单号"></el-input>
          </div>
        </el-col>
        <el-col :span="3" style="width:80px;height:44px;"></el-col>
        <el-col :span="4">
          <div class="selectButton" @click="selectClick">
              查询
          </div>
        </el-col>
        <el-col :span="4">
          <div class="selectButton" @click="exportExcel">
            导出Excel
          </div>
        </el-col>
      </el-row>
      <tableOnlineCashierStatistics :list="tableData" :page="page" :size="size"></tableOnlineCashierStatistics>
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
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate() + '';
    return Y+M+D;
  }

  let now = new Date()
  let cmonth = now.getMonth() + 1
  let day = now.getDate()
  if (cmonth < 10) cmonth = '0' + cmonth
  if (day < 10) day = '0' + day
  const endDay1 = now.getFullYear() + '-' + cmonth + '-' + day// 获取当前的日期
  import  axios from 'axios'
  export default {
    components: {
      tableOnlineCashierStatistics
    },
    data () {
      return {
        tableData: [],
        datatime1:endDay1,
        datatime2:endDay1,
        selectHotel:'',
        hotelList:'',
        selectTradeType:'',  //交易类型
        tradeTypeList:[  {id:'',name:'全部'},{id:'WEIXINPAY',name:'微信支付'},{id:'ALIPAY',name:'支付宝支付'},{id:'WX_PREPAY',name:'微信预授权'},{id:'ALI_PREPAY',name:'支付宝预授权'}],    //交易类型列表
        orderId:'',   //订单号
        tradeStatus:'',// 交易状态  (支付/预授权完成/预授权撤销/退款/预授权冻结)
        tradeStatusList:[
          {id:'',name:'全部'},
          // {id:'NORMAL',name:'正常'},
          {id:'PAYING',name:'支付中'},
          {id:'AUTH_FAILED',name:'授权失败'},
          {id:'AUTH_SUCCESS',name:'授权成功'},
          {id:'PAY_FAILED',name:'支付失败'},
          {id:'PAY_SUCCESS',name:'支付成功'},
          {id:'DEPOSIT_CONSUME_FAILED',name:'押金消费失败'},{id:' DEPOSIT_CONSUME_SUCCESS',name:'押金消费成功'},
          {id:'UNFREEZE_FAILED',name:'解冻失败'},{id:'AUTH_CANCEL_FAILED',name:'授权撤销失败'},
          {id:'AUTH_CANCEL_SUCCESS',name:'授权撤销成功'},{id:'DEPOSIT_REFUND_FAILED',name:'押金退款失败'},
          {id:'DEPOSIT_REFUND_SUCCESS',name:'押金退款成功'},{id:'REFUND_FAILED',name:'退款失败'},
          {id:'REFUND_SUCCESS',name:'退款成功'},{id:'FAILED',name:'失败'},
        ],
        page: 1,
        size: 10,
        total: 0
      }
    },
    methods:{
      ...mapActions([
        'getList','getTradeList','getHotelList1','showtoast'
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
      handleSizeChange(val) {
        this.size = val;
        this.initTradeList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.initTradeList();
      },
      initTradeList(){


        this.getTradeList({
          data:{
            "hotelId":this.selectHotel, // 酒店ID，必须
            "tradeStartDay":this.datatime1, // 查询起始日期
            "tradeEndDay":this.datatime2, // 查询结束日期
            "tradeType":this.selectTradeType, // 交易类型：ALIPAY-支付宝，WEIXINPAY-微信支付；不传，则默认查询所有
            "flowId":this.orderId, //交易流水号
             status:this.tradeStatus,
             page: this.page.toString(),
             pageSize: this.size.toString(),
          },
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;
            //
           this.total=body.data.total;
            this.tableData=body.data.list;
            // this.total=1;
            // this.page=1;
            // this.tableData = [
            //   {
            //     "id": "1234567890123456789",	//id
            //     "orderId": "4683d9868d664ba9ac43bff335b4fc71", //订单id
            //     "flowId": 2019102814010000001, // 订单流水号
            //     "tradeTime": 1573033691127, // 时间戳
            //     "tradeType": "支付宝预授权完成", // 交易类型
            //     "operator": null, // 操作员
            //     "tradeFee": "0.00", // 交易金额
            //     "tradeStatus": "" // INIT-初始化, PAYING-支付中, SUCCESS-成功, FAILED-失败
            //   }
            //
            // ];
            console.log(this.tableData );
          }
        })
      },
      exportExcel(){
        let that=this;
        this.datatime1=timestampToTime(this.datatime1);
        this.datatime2 = timestampToTime(this.datatime2);
        axios({
          method: 'post',
          url: '/payment/export',
          baseURL: '/virgo',
          data: {
            "hotelId":this.selectHotel, // 酒店ID，必须
            "tradeStartDay":this.datatime1, // 查询起始日期
            "tradeEndDay":this.datatime2, // 查询结束日期
            "tradeType":this.selectTradeType, // 交易类型：ALIPAY-支付宝，WEIXINPAY-微信支付；不传，则默认查询所有
            "flowId":this.orderId, //交易流水号
            status:this.tradeStatus,
          },
          headers: {
            Session: sessionStorage.getItem('session_id'),
          },
          responseType: 'blob',
          timeout:  60000,
        }).then(res=>{
          let data = res.data;
          let fileReader = new FileReader();
          fileReader.onload = function() {
            try {
              console.log()
              let resData = JSON.parse(this.result) // this.result为FileReader获取blob数据转换为json后的数据，即后台返回的原始数据
              if (resData && resData['errcode'] && resData['errcode'] === '467002') {
                athat.$message('暂无数据');
              }
            } catch (err) {
              var csvData = new Blob([res.data],{type: "application/vnd.ms-excel"});
              var url = window.URL.createObjectURL(csvData);
              var link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.download = 'excel.xls';
              // link.setAttribute('download', 'excel.xls');
              document.body.appendChild(link);
              link.click();
              link.click();
              window.URL.revokeObjectURL(url);
            }
          };
          fileReader.readAsText(data);

        }).catch(err=>{
        });
      },
      selectClick(){
        this.page=1;
        this.datatime1=timestampToTime(this.datatime1);
        this.datatime2 = timestampToTime(this.datatime2);
        var time1 = Date.parse(new Date( this.datatime1));
        var time2 = Date.parse(new Date(this.datatime2));
        var nDays = Math.abs(parseInt((time2 - time1)/1000/3600/24));
        if(nDays>31){
          this.$message({
            message: '日期仅限31天内，请重新选择',
            center: true,
            type: 'error'
          })
          return
        }
        this.initTradeList();
      }
    },
    created(){
      this.initHotelList();
      this.selectClick();
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
      align-items: center;
      width: 90px;
      height: 44px;
      background-color: #39C240;
      color: #ffffff;
      border-radius: 5px;
    }

    .mcenter {
      text-align: center;
    }
  }
</style>
