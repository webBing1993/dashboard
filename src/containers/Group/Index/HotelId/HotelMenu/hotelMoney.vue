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
            <el-option label="企业转账" value="1"></el-option>
            <el-option label="微信支付" value="2"></el-option>
            <el-option label="支付宝支付" value="3"></el-option>
            <el-option label="赠送" value="4"></el-option>
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
        total:60,
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
        hotelName:'xx',
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
        'getHotelCode'
      ]),

      initlist(){
        //获取余额
        this.getHotelAccout({
          hotelid: this.$route.params.hotelid,
          onsuccess: body => {
            if(body.errcode == '0'){
                this.balance = body.data.balance
            }
          }
        })
        //充值明细字典code
        this.getHotelCode({
          'code':'hotelAccount:expense:businessType',
          onsuccess: body => {
           console.log('充值明细code',body)
          }
        })


      },
      handleSizeChange(val){
        console.log('当前页有多少条',val)

      },
      handleCurrentChange(val){
        console.log('当前是第几页',val)
      },
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
      closeDialog(){
        this.$refs['contentForm'].resetFields();
      },
      sureRecharge(formname){
        this.$refs[formname].validate(valide => {
          if (valide) {
            this.getHotelrecharge({
                "hotelid": this.$route.params.hotelid,
                "amount":this.ruleForm.money,  //金额
                "businessType":this.ruleForm.radio,   //消费类型 REVERSE:冲账,CHARGE:充值
                "transactionNumber":this.ruleForm.serialNum, //交易单号
                "contractNumber":this.ruleForm.contractNo, //合同号
                "remark":this.ruleForm.remarks, //备注
              // 支付方式
              onsuccess: body => {
                if(body.errcode == '0'){
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
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
