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
              <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                <el-checkbox v-for="sta in status" :label="sta" :key="sta">{{sta}}</el-checkbox>
              </el-checkbox-group>
           </div>
          </el-col>
          <el-col :span="2"><div class="mright">消费类型</div></el-col>
          <el-col :span="2">
            <div>
              <el-select v-model="selectSta" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
          <el-col :span="3"><el-input v-model="consumptionNumber"></el-input></el-col>
          <el-col :span="2"><div style="text-align:center">金额总计</div></el-col>
          <el-col :span="3"><el-input v-model=" columnTotals"></el-input></el-col>
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
        <table-ConsumptionRecord :list="consumptionlist" :page="pageNo" :size="pageSize"></table-ConsumptionRecord>
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
  export default{
  data(){
    return{
      datatime1:'',
      datatime2:'',
      status:['上月','已开票','未开票'],
      checkedStatus: [],
      selectSta:'',
      options:[{
        value:'1',
        label:'无证核验'
      },{
        value:'2',
        label:'其他'
      }],
      consumptionlist:[],
      pageNo:1,
      pageSize:10,
      total:60,
      consumptionNumber:'',
      columnTotals:'',
      hotelName:'xx'
    }
   },
    methods:{
      handleCheckedStatusChange(value) {
          console.log('选中后的值',value)
      },
      handleSizeChange(val){
        console.log('当前页有多少条',val)

      },
      handleCurrentChange(val){
        console.log('当前是第几页',val)
      },
      query(){

      },
      makeInvoice(){

      }
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
        font-size:10px;
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
    }
    .mright{
      text-align:right;margin-right:10px
    }
    .mcenter{
      text-align:center
    }
  }
</style>
