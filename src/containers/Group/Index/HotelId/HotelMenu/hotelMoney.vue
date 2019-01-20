<template>
  <div>
    <div class="hotelAccount_money">
     <div class="hotelMoney_title">
      <span class="title">余额</span>
      <div class="hotelmsg">
        <div class="hotelmsg_money">
          <span class="hotelmsg_symbol">¥</span>
          <span class="hotelmsg_number">{{balance}}</span>
        </div>
        <div class="hotelmsg_status" @click="recharge">充值/冲帐</div>
      </div>
      <div class="hotellist_title">{{hotelName}}酒店-充值明细</div>
      <table-hotelMoney :list="moneylist" :page="pageNo" :size="pageSize"></table-hotelMoney>
      <el-pagination
        v-show="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
    <!--/弹框页-->
      <el-dialog title="充值/冲帐页面" :visible.sync="dialogFormVisible" @close="closeDialog" >
       <el-form :model="ruleForm" :rules="rules" ref="contentForm">
        <el-form-item label="金额" :label-width="formLabelWidth" prop="money">
          <el-input v-model="ruleForm.money" autocomplete="off" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="关联/合同编号" :label-width="formLabelWidth" prop="contractNo">
          <el-input v-model="ruleForm.contractNo" autocomplete="off" placeholder="请填写合同编号"></el-input>
        </el-form-item>
        <el-form-item label="支付流水号" :label-width="formLabelWidth" prop="serialNum">
          <el-input v-model="ruleForm.serialNum" autocomplete="off" placeholder="(本次操作管来呢的线下资金交易单号)"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in payType" :key="index" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.remarks" autocomplete="off" placeholder="(一些想填重要信息,如果没有,可以不填)"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="ruleForm.radio" label="CHARGE">充值</el-radio>
            <el-radio v-model="ruleForm.radio" label="REVERSE">冲帐</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRecharge('contentForm')">取 消</el-button>
        <el-button type="primary" @click="sureRecharge('contentForm')">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';
  export default{
    data(){
      return {
        moneylist:[],
        pageNo:1,
        pageSize:10,
        total:0,
        dialogFormVisible:false,
        ruleForm: {
          money:'',
          contractNo:'',
          serialNum:'',
          region:'',
          remarks:'',
          radio:'CHARGE',
        },
        formLabelWidth: '150px',
        balance:'',
        hotelName:'',
        businessType:[],//消费明细
        payType:[],//支付方式
        // accountData:[],//消费记录
        rules: {
          //现在只是简单的验证后面要改验证
          money:[
            {
              required: true,
              message: '金额不能为空',
              trigger: 'blur'
            }
          ],
          contractNo:[{
            required: true,
            message: '合同编号不能为空',
            trigger: 'blur'
          }],
          serialNum:[{
            required: true,
            message: '支付流水号不能为空',
            trigger: 'blur'
          }],
          region:[{
            required: true,
            message: '支付方式不能为空',
            trigger: 'change'
          }],
        }

      }
    },
    methods:{
      ...mapActions([
        'getHotelAccout',
        'getHotelrecharge',
        'demandBill',
        'getHotelCode',
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
      //分页切换分页条数
      handleSizeChange(val){
        console.log('当前页有多少条',val)
        this.pageSize = val
        this.getBusinessList()
      },
      //切换当前页
      handleCurrentChange(val){
        console.log('当前是第几页',val)
        this.pageNo = val
        this.getBusinessList()
      },
      //获取余额和充值明细字典
      initlist(){
        this.getAccount();  //获取余额
        this.getBusinessType(); //获取充值明细
        this.paymentTypes(); //支付类型
        this.getBusinessList();  //充值明细列表
      },
      //获取余额信息
        getAccount(){
          this.getHotelAccout({
            hotelid: this.$route.params.hotelid,
            onsuccess: body => {
              if(body.errcode == '0'){
                this.balance = body.data.balance/100
                console.log('body.data',body.data)
              }
            }
          })
        },
      //消费明细字典code获取例如是充值还是冲帐
      getBusinessType(){
        this.getHotelCode({
          'code':'hotelAccount:accounting:businessType',
          onsuccess: body => {
               if(body.errcode == '0'){
                 body.data.forEach(item=>{
                   this.businessType.push(item.code)
                 })
               }
               //调取列表在这调用是为了解决异步的问题
            this.getBusinessList()
          }
        })

      },
      //支付类型字典获取 例如是支付宝还是微信
       paymentTypes(){
         this.getHotelCode({
           'code':'hotelAccount:payType',
           onsuccess: body => {
             this.payType = body.data
           }
         })

       },
       //充值明细列表
      getBusinessList(){
        this.demandBill({
          "hotelid": this.$route.params.hotelid,
          "page":this.pageNo.toString(),
          "size":this.pageSize.toString(),
          "transactionNumber":"",//交易单号
          "businessTypes":this.businessType,//消费类型
          "invoiced":'',//已开票
          "createTimeStart":"",//时间区间 - 开始
          "createTimeEnd":"",//时间区间 - 结束
          onsuccess: (body, headers) => {

            if(body.errcode == '0'){
              this.moneylist = body.data;
              this.moneylist.forEach(item=>{
                item.createTime=this.formatdate(item.createTime,'yy-mm-dd hh:mm:ss')
                this.payType.forEach(key=>{
                  if(key.code == item.payType){
                    item.payType = key.name
                  }
                })
              })
              headers['x-total'] ? this.total = +headers['x-total'] : null;
            }
          }
        })
      },
      //点击充值冲帐
      recharge(){
        this.dialogFormVisible = true
        this.ruleForm.money =''
        this.ruleForm.contractNo =''
        this.ruleForm.serialNum =''
        this.ruleForm.region =''
        this.ruleForm.remarks =''
        // console.log('ceshi',this.ruleForm.radio)
      },
      cancelRecharge(formname){
        this.dialogFormVisible = false;
        this.$refs[formname].resetFields();
      },
      //重置验证
      closeDialog(){
        this.$refs['contentForm'].resetFields();
      },
      //冲帐确定
      sureRecharge(formname){
        this.$refs[formname].validate(valide => {
          if (valide) {
            this.getHotelrecharge({
                "hotelid": this.$route.params.hotelid,
                "amount":(this.ruleForm.money*100),  //金额
                "businessType":this.ruleForm.radio,   //消费类型 REVERSE:冲账,CHARGE:充值
                "transactionNumber":this.ruleForm.serialNum, //交易单号
                "contractNumber":this.ruleForm.contractNo, //合同号
                "remark":this.ruleForm.remarks, //备注
                 "payType":this.ruleForm.region,
              // 支付方式
              onsuccess: body => {
                if(body.errcode == '0'){
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.getBusinessList();
                  this.dialogFormVisible = false
                }

              }
            })
          }
        })
      }
    },
    mounted(){
      this.initlist();
      this.hotelName = this.$store.state.enterprise.tempHotelName
    }
  }

</script>
<style lang="less" scoped>
  .hotelAccount_money{
    width:100%;
    .hotelMoney_title{
      font-size: 16px;
      color: #4A4A4A;
      font-weight: normal;
      padding: 20px 20px;
      .title{
        line-height: 16px;
      }
      .hotelmsg{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .hotelmsg_money{

          width:288px;
          .hotelmsg_symbol{
            opacity: 0.8;
            color: #000000;
            line-height: 16px;
          }
          .hotelmsg_number{
            opacity: 0.8;
            font-size: 44px;
            color: #000000;
            line-height: 44px;
          }

        }
        .hotelmsg_status{
          background: #3AC240;
          border-radius: 4px;
          width:168px;
          height:40px;
          color:#fff;
          text-align:center;
          line-height:40px
        }
      }
      .hotellist_title{
        height:35px;
      }

    }
   /deep/ .dialog-footer{
     text-align:center;
   }
    /deep/ .el-dialog{
      width:60%;
    }
   /deep/ .el-button--primary{
     background-color:#3AC240;
     border-color: #3AC240
   }
    /deep/ .el-button{
      padding:0;
      width:246px;
      height:40px;
    }
    /deep/ .el-select{
     width: 100%;
    }
    /deep/ .el-dialog__header{
      border-bottom: 1px solid #ccc;
    }
    /deep/ .el-form-item__label{
      padding:0 30px 0 0;
    }
  }

</style>
