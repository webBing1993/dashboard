<template>
  <div>
    <div class="module-wrapper">
      <div class="content-item">
        <span>设备类型</span>
        <el-input class="el-right" v-model="deviceType"  readonly placeholder="请选择设备类型" >
          <!--<el-option-->
            <!--v-for="(obj, index) of deviceTypeList"-->
            <!--:key="obj.id"-->
            <!--:label="obj.type_name"-->
            <!--:value="obj.id"> {{obj.type_name}}-->
          <!--</el-option>-->
        </el-input>
      </div>
      <div class="content-item">
        <span>设备ID</span>
        <el-input  class="el-right" v-model="deviceId" placeholder="请输入该设备ID（32位）"></el-input>
      </div>
      <div class="content-item">
        <span>房间号码</span>
        <el-input class="el-right" v-model="roomNumber" placeholder="请输入房间号码"></el-input>
      </div>
      <div class="content-btn">
        <el-button class="btn-red"  @click.native="goto(-1)">取消</el-button>
        <el-button class="btn-green"   @click.native="addDevices()">确认添加</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'EditDevice',
    data() {
      return {
        isAdd: true,
        deviceId: '',
        deviceName: '',
        roomNumber:'',
        deviceType:'刷脸开门设备',
      }
    },
    computed: {
      ...mapState({
        deviceList: state => state.enterprise.deviceList,
      }),
      hotelId() {
        return this.$route.params.hotelid
      },
    },
    methods: {
      ...mapActions([
        'goto',
        'addFaceDevice',
      ]),
      addDevices (obj){
        console.log(1);
        this.addFaceDevice({
          hotelId:this.$route.params.hotelid ,
          data:{
            deviceId:this.deviceId,
            roomNo:this.roomNumber,
          },
          onsuccess: body =>{
            console.log(2222);
            this.goto(-1);
          }
        });
      },
    },
    mounted() {
      if (this.$route.query.device_id) {
        this.isAdd = false;
        this.deviceId = this.$route.query.device_id;


      }
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    padding: 26px 45px;
    .content-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 14px;
      span {
        min-width: 100px;
        text-align: end;
        text-align: left;
      }
      .el-switch {
        margin-left: 24px;
      }
      .el-right {
        margin-left: 20px;
        padding: 4px;
        width: 80%;
      }
    }
    .content-btn {
      width: 100%;
      margin-top: 53px;
      text-align: center;
      .el-button {
        width: 173px;
        line-height: 18px;
        border-radius: 0;
        color: #ffffff;
      }
    }
  }

  .el-dialog__footer {
    padding: 10px 20px 28px;
    .dialog-footer {
      text-align: center;
      .el-button {
        width: 246px;
        border-radius: 0;
        line-height: 18px;
        margin: 0;
        &:nth-child(1) {
          margin-right: 22px;
        }
        &:nth-child(2) {
          background-color: #39C240;
          border-color: #39C240;
          color: #ffffff;
        }
      }
      .el-button--primary {
        background-color: transparent;
        border: solid 1px #979797;
        color: #4A4A4A;
      }
    }
  }

  .btn-green {
    width: 173px;
    line-height: 18px;
    background-color: #39C240;
    border-color: #39C240;
    border-radius: 0;
    color: #ffffff;
  }

  .btn-red {
    width: 173px;
    line-height: 18px;
    background-color: #D0011B;
    border-color: #D0011B;
    border-radius: 0;
    color: #ffffff;
  }

  .btn-yellow {
    width: 173px;
    line-height: 18px;
    background-color: orange;
    border-color: orange;
    border-radius: 0;
    color: #ffffff;
  }
</style>
