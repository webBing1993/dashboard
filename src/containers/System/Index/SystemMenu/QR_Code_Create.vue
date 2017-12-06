<template>
  <div class="qrcodeWrap">
      <div class="content-item">
        <span>业务类型</span>
        <el-select class="el-right" v-model="status">
          <el-option
            v-for="(item, index) of statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <span>生成数量</span>
        <div class="item-label">
          <el-input class="el-right" v-model="input"></el-input>
        </div>
      </div>
    <div class="button-box">
      <el-button class="el-btn" type="success" @click.native="create">立即生成</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QR_Code_Create',
    data(){
      return {
        status:'',
        statusList:[
          {
            id:'0',
            name:'mobile-checkin二维码'
          }, {
            id:'1',
            name:'发票'
          }
        ],
        input:10
      }
    },
    methods:{
      create(){

      }

    }
  }
</script>
<style scoped lang="less">
    .qrcodeWrap {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      padding: 3rem;
      .content-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        span {
          width: 60px;
          display: block;
          margin-right: 20px;
        }
        .el-select, .el-input {
          width: 70%;
          outline: none;
          .el-input {
            width: 100%;
          }
        }
      }
      .button-box {
        text-align: left;
        .el-button {
          width: 246px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          margin-top: 45px;
          span {
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
    }
</style>
