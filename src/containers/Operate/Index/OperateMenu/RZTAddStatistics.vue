<template>
  <el-main>
    <div class="module-wrapper">
      <div class="title">筛选</div>
      <el-row style="margin-bottom:20px;">
        <el-col :span="2">
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
        <el-col :span="9">
          <div class="selectButton">
            <span @click="selectClick">查询</span>
          </div>
        </el-col>
      </el-row>
      <div class="v-table">
        <table border="0">
          <thead>
          <tr>
            <th>序号</th>
            <th>酒店ID</th>
            <th>酒店名称</th>
            <th>酒店创建时间</th>
            <th>旅业ID</th>
            <th>设备名称</th>
            <th>设备ID</th>
            <th>设备类型</th>
            <th>设备创建时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(obj, index) of tableData">
            <td>{{ index+1}}</td>
            <td>{{ obj.id }}</td>
            <td>{{ obj.hotelName }}</td>
            <td>{{ obj.hotelCreateTime}}</td>
            <td>{{ obj.lvyeId }}</td>
            <td>{{ obj.deviceName  }}</td>
            <td>{{ obj.deviceId }}</td>
            <td>{{ obj.deviceType }}</td>
            <td>{{ obj.createTime }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="tableData.length==0">
        暂无数据
      </div>
    </div>
  </el-main>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    console.log(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate() + '';
    return Y+M+D;
  }
   var yes=(new Date).getTime()-24*60*60*1000;
   let now = new Date()
  export default {
    components: {
    },
    data () {
      return {
        tableData: [

        ],
        datatime1:timestampToTime(yes),
        datatime2:timestampToTime(yes),
        selectHotel:'',
        xcxHotelList:'',
      }
    },
    computed:{
      ...mapState([

      ]),
    },
    methods:{
      ...mapActions([
        'getRZTAddSta','showtoast'
      ]),
      initRZTAddSta(){
         console.log(this.datatime1,this.datatime2);
        this.getRZTAddSta({
         data:{
            beginTime:this.datatime1,
            endTime:this.datatime2,
          },
          onsuccess: body => {
            this.tableData = body.data;
          }
        });
      },
      selectClick(){
        console.log(this.datatime1,this.datatime2);
        if(this.datatime1==''|| this.datatime1==null ||this.datatime2==''||this.datatime2==null ){
          this.showtoast({
            text: '请选择时间',
            type: 'warning'
          })
          return;
        }
        this.datatime1 = timestampToTime(this.datatime1);
        this.datatime2 = timestampToTime(this.datatime2);
        var time1 =new Date(this.datatime1).getTime();
        var time2 = new Date(this.datatime2).getTime();
        var nDays = Math.abs(parseInt((time2 - time1)/1000/3600/24));
        console.log(nDays+1);
        if(nDays+1>31){
          this.$message({
            message: '日期仅限31天内，请重新选择',
            center: true,
            type: 'error'
          })
          return
        }
        this.initRZTAddSta();
      }
    },
    mounted(){
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
    line-height:40px;
    text-align: center;
    .title {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom:20px;
      width:100%;
      text-align: left;
    }
    .firstdate{
      .el-date-editor.el-input,.el-date-editor.el-input__inner{
        width:100%;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:100%;
      }
    }
    /deep/ .el-table{
      margin-top:20px;
    }
    /deep/ .el-table th{
      background-color: #9B9B9B;
      font-size: 14px;
      color: #3e3e3e;
      height: 38px;
      padding:0;
    }
    .selectButton{
      display: flex;
      justify-content: center;
      width:100%;
      span{
        width:90px;
        height:44px;
        background-color: #39C240;
        color: #ffffff;
        border-radius: 5px;
      }
    }
    .mcenter{
      text-align:center;
    }
  }
  .v-table {
    clear: both;
    padding: 0 0 30px 0;
  }

  .v-table table {
    margin: 0;
    width: 100%;
    border-spacing: 0;
  }

  .v-table td,
  .v-table th {
    height: 38px;
    text-align: center;
  }

  table tr:nth-child(odd) {
    background: #FAFAFA;
  }

  .v-table tr {
    &:hover {
      background-color: #E1E1E1;
    }
  }

  .v-table th {
    padding-left: 10px;
    font-size: 14px;
    color: #3e3e3e;
    background-color: #9B9B9B;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table td {
    padding-left: 10px;
    color: #757575;
    font-size: 12px;
    word-break: keep-all;
    white-space: nowrap;
    line-height: 44px;
  }

  .v-table td a {
    font-size: 12px;
  }

  .v-table .checkbox {
    width: 14px;
    height: 14px;
    margin-left: 15px;
    z-index: 0;
    position: relative;
  }

  .v-table td > label {
    height: 31px;
  }

  .v-table td > label > span {
    margin-left: 10px;
  }

  .v-options {
    color: #39C240;
    padding-left: 10px;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
  }
</style>
