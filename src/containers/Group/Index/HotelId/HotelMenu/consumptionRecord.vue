<template>
  <div>
    <div class="all">
      <div class="expenseCalendar">
        <span class="title">筛选</span>
        <el-row>
          <el-col :span="1">
            <div class="datetitle">
              <span>日期</span>
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
          <el-col :span="6">
            <div class="mcenter">
              <el-radio v-model="invoice" label="1">已开票</el-radio>
              <el-radio v-model="invoice" label="0">未开票</el-radio>
           </div>
          </el-col>
          <el-col :span="2"><div class="mright">消费类型</div></el-col>
          <el-col :span="2">
            <div>
              <el-select v-model="selectBusiness" placeholder="请选择">
                <el-option
                  v-for="item in businessList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
          </div></el-col>
          <el-col :span="2"><div class="mright">交易单号</div></el-col>
          <el-col :span="2"><div class="firstdate">
            <el-input v-model="transactionNumber"></el-input></div>
          </el-col>
          <el-col :span="2">
            <div style="text-align:right">
             <el-button @click="query">查询</el-button>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="title">统计&开票</el-col>
        </el-row>
        <el-row>
          <el-col :span="2">消费单数</el-col>
          <el-col :span="3"><el-input v-model="consumptionNumber" :disabled="true"></el-input></el-col>
          <el-col :span="2"><div class="mcenter">金额总计</div></el-col>
          <el-col :span="3"><el-input v-model="columnTotals" :disabled="true"></el-input></el-col>
          <el-col :span="3">
            <div style="text-align:right">
              <el-button @click="makeInvoice">开票</el-button>
            </div>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="title">
            {{hotelName}}酒店-消费明细
          </el-col>
        </el-row>
        <!--<table-ConsumptionRecord :list="consumptionlist" :page="pageNo" :size="pageSize"></table-ConsumptionRecord>-->
         <!---------表格------->
        <el-table ref="multipleTable" :data="consumptlist" stripe tooltip-effect="dark" style="width: 100%" class="tableContent" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column  prop="transactionNumber" label="交易单号" width="120">
          </el-table-column>
          <el-table-column prop="hotelName" label="酒店名称" width="120">
          </el-table-column>
          <el-table-column prop="realPrice" label="金额">
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型">
          </el-table-column>
          <el-table-column prop="createTime" label="时间">
          </el-table-column>
          <el-table-column prop="invoiced" label="开票状态">
          </el-table-column>
          <el-table-column prop="payerType" label="付费方">
          </el-table-column>
          <el-table-column prop="payType" label="支付方式">
          </el-table-column>
          <el-table-column prop="remark" label="备注">
          </el-table-column>
          <el-table-column prop="createBy" label="操作人">
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="total > pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex';
  export default{
  data(){
    return{
      invoice:'1',
      invoi:false,
      datatime1:'',
      datatime2:'',
      selectBusiness:'',
      options:[{
        value:'1',
        label:'无证核验'
      },{
        value:'2',
        label:'其他'
      }],
      consumptlist:[],
      pageNo:1,
      pageSize:10,
      total:0,
      consumptionNumber:'',
      columnTotals:0,
      hotelName:'',
      transactionNumber:'',
      multipleSelection: [],
      businessType:[],  //消费类型code数组
      businessList:[],  //消费类型数组
      payerList:[],   //支付类型code数组
      payList:[],   //支付数组
      payType:[],  //支付状态
      checkList:[]  //选中的所有复选框的id
    }
   },
    computed:{
    },
    methods:{
      ...mapActions([
        'makeSign',
        'getHotelExpense',
        'getHotelCode'
      ]),
      //日期
      formatdate(param, status) {
        if (param) {
          var date = new Date(param);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          if (status == 'YYYY-MM-DD') {
            return Y + M + D
          } else {
            return Y + M + D + h + m + s;
          }
        }
      },
      initlist(){

        this.paymentType()  //支付类型
        this.paymentStatus()  //支付方式
        this.consumptionType() //消费类型
      },
      //更换选择勾选复选框进行开票
      handleSelectionChange(val) {
        this.columnTotals =0
        this.multipleSelection = val;
        this.checkList =[]    //把勾选的复选框的id组成一个新数组
        this.multipleSelection.forEach(item=>{
          this.checkList.push(item.id)
          this.columnTotals +=item.realPrice

        })
        this.consumptionNumber = (this.checkList.length!=0)?this.checkList.length:''    //判断消费单数
        this.columnTotals = (this.columnTotals!=0)?this.columnTotals:''   //金额总计

      },
      //支付类型  是谁付的款例如客人或者酒店
      paymentType(){
        this.getHotelCode({
          'code':'hotelAccount:payerType',
          onsuccess: body => {
            if(body.errcode == '0'){
                this.payList = body.data;
                 body.data.forEach(item=>{
                    this.payerList.push(item.code)
                 })
            }
          }
        })
      },
      //支付类型字典获取支付方式银联或支付宝或刷脸支付
      paymentStatus(){
        this.getHotelCode({
          'code':'hotelAccount:payType',
          onsuccess: body => {
            this.payType = body.data
          }
        })

      },
      //消费类型例如无证核验在住服务或者其它
      consumptionType(){
        this.getHotelCode({
          'code':'hotelAccount:expense:businessType',
          onsuccess: body => {
            if(body.errcode == '0'){
              this.businessList = body.data
              body.data.forEach(item=>{
                this.businessType.push(item.code)
              })
              this.consumptionList()
            }
          }
        })

      },
      //消费明细列表
      consumptionList(){
        //充值明细列表
        this.getHotelExpense({
          "page":this.pageNo.toString(),
          "size":this.pageSize.toString(),
          "hotelid": this.$route.params.hotelid,
          "transactionNumber":'',
          "businessTypes": this.businessType,
          "payerTypes":[],
          "invoiced":'',
          "createTimeStart":'',
          "createTimeEnd":'',
          onsuccess:(body,headers)=>{
            if(body.errcode == '0'){
              console.log('消费明细',body)
              headers['x-total'] ? this.total = +headers['x-total'] : null;

              body.data.forEach(item=>{
                if(item.invoiced == false){
                  item.invoiced = '未开票'
                }else{
                  item.invoiced ='已开票'
                }
                item.realPrice = item.realPrice/100
                item.createTime=this.formatdate(item.createTime,'yy-mm-dd hh:mm:ss')
                this.businessList.forEach(key=>{
                  if(key.code ==item.businessType){
                    item.businessType = key.name
                  }
                })
                this.payList.forEach(index=>{
                  if(index.code ==item.payerType){
                    item.payerType = index.name

                  }
                })
                this.payType.forEach(value=>{
                   if(value.code == item.payType){
                     item.payType = value.name
                   }
                })
              })
              this.consumptlist = body.data
            }
          }
        })

      },
      //切换分页条数
      handleSizeChange(val){
        this.pageSize = val;
        this.consumptionList();

      },
      //切换当前页
      handleCurrentChange(val){
        // console.log('当前是第几页',val)
        this.pageNo = val
        this.consumptionList();
      },
      //查询筛选
      query(){
        console.log('this.invoice',typeof(this.invoice))
        if(this.invoice == '1'){
          this.invoi = true;
        }
        else if(this.invoice == '0'){
          this.invoi = false;
        }
        else{
          this.invoi =''|| null;
        }
        //判断当日期是number类型的时候不转化否则转化
        this.datatime1=(Number(this.datatime1) == this.datatime1 ) ? this.datatime1 : this.datatime1.getTime()
        this.datatime2 = (Number(this.datatime2) == this.datatime2 ) ? this.datatime2 : this.datatime2.getTime()
        let selctBusi =[];
        selctBusi.push(this.selectBusiness)  //根据后台要求格式将类型传入数组
          //充值明细列表
          this.getHotelExpense({
            "page":this.pageNo.toString(),
            "size":this.pageSize.toString(),
            "hotelid": this.$route.params.hotelid,
            "transactionNumber":this.transactionNumber,
            "businessTypes": selctBusi,
            "payerTypes":[],
            "invoiced":this.invoi,
            "createTimeStart":this.datatime1,
            "createTimeEnd":this.datatime2 ,
            onsuccess:(body,headers)=>{
              if(body.errcode == '0'){
                headers['x-total'] ? this.total = +headers['x-total'] : null;

                body.data.forEach(item=>{
                  if(item.invoiced == true){
                    item.invoiced = '已开票'
                  }else{
                    item.invoiced ='未开票'
                  }
                  item.realPrice = item.realPrice/100
                  item.createTime=this.formatdate(item.createTime,'yy-mm-dd hh:mm:ss')
                  this.businessList.forEach(key=>{
                    if(key.code ==item.businessType){
                      item.businessType = key.name
                    }
                  })
                  this.payList.forEach(index=>{
                    if(index.code ==item.payerType){
                      item.payerType = index.name

                    }
                  })
                  this.payType.forEach(value=>{
                    if(value.code == item.payType){
                      item.payType = value.name
                    }
                  })
                })
                this.consumptlist = body.data
              }
            }
          })
      },
      //开票
      makeInvoice(){
          this.makeSign({
            "hotelid": this.$route.params.hotelid,
             "ids":this.checkList,
             onsuccess:body=>{
              if(body.errcode == '0'){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.consumptionList() //页面刷新
              }
             }
          })
      }
    },
    mounted(){
      this.initlist()
      this.initlist()
      this.hotelName = this.$store.state.enterprise.tempHotelName
    },
    watch:{

    }
  }

</script>
<style lang="less" scoped>
  .all {
    width: 100%;
    .expenseCalendar {
      padding: 20px 20px;
      font-size: 14px;
      color: #606266;
      font-weight: normal;
      height:40px;
      line-height:40px;
      .title {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #4A4A4A;
        /*margin-bottom:20px;*/
        margin:20px 0
      }
      .firstdate{
        /deep/  .el-date-editor.el-input,.el-date-editor.el-input__inner{
          width:100%;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width:100%;
        }
      }
      /deep/ .el-checkbox+.el-checkbox{
        margin:0;
      }
      /deep/ .el-checkbox__input{
        margin-left:20px;
      }
      /deep/ .el-input .el-input__inner{
        border:1px solid #D0D0D0;
        font-size:13px;
      }
      /deep/ .el-button{
        padding:12px 18px;
        background:#3AC240;
        color:#fff;
        font-size:14px;
        font-family:normal;
        font-weight:300;
        border:none;
        outline:none;
        &:hover{
          background:green
        }
      }
      /deep/ .tableContent .el-checkbox, .el-checkbox__input{
        display:block;
      }
      /deep/ .el-table th{
        background-color: #9B9B9B;
        font-size: 14px;
        color: #3e3e3e;
        height: 38px;
        padding:0;
      }
      /deep/ .el-table td{
        padding:0
      }
      /deep/ .tableContent .el-table td, .el-table th{
        padding:0;
      }
    }
    .mright{
      text-align:right;margin-right:10px
    }
    .mcenter{
      text-align:center
    }
  }
</style>
