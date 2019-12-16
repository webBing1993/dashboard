<template>
  <el-main>
    <div class="module-wrapper">
      <div class="title">筛选</div>
      <el-row style="margin-bottom:20px;">
        <el-col :span="2">
          <div class="hotelitle" style="text-align: left">
            <span>酒店名称</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-select v-model="selectHotel" filterable placeholder="请选择">
              <el-option
                v-for="item in xcxHotelList"
                :key="item.hotelId"
                :label="item.name"
                :value="item.hotelId">
              </el-option>
            </el-select>
          </div>
        </el-col>
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
            <th>日期</th>
            <th>总房间数</th>
            <th>订单总数</th>
            <th>订单总房数</th>
            <th>微前台办理订单数</th>
            <th>微前台办理入住房间数</th>
            <th>微前台办理入住人数</th>
            <th>身份核验人数</th>
            <th>旅业上传人数</th>
            <th>旅业上传房间数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(obj, index) of tableData">
            <td>{{ index+1}}</td>
            <td>{{ obj.dateTime}}</td>
            <td>{{ obj.roomTotalCount }}</td>
            <td>{{ obj.orderTotalCount }}</td>
            <td>{{ obj.orderRoomTotalCount}}</td>
            <td>{{ obj.wqtOrderTotalCount }}</td>
            <td>{{ obj.wqtRoomTotalCount }}</td>
            <td>{{ obj.wqtCheckInTotalCount }}</td>
            <td>{{ obj.identityCheckCount}}</td>
            <td>{{ obj.lvyeUploadCount}}</td>
            <td>{{ obj.lvyeRoomUploadCount}}</td>
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
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate() + '';
    return Y+M+D;
  }
  var date = new Date();
  var day = date.getDay();
  var prevMonday;
  if(date.getDay() == 0){
    prevMonday = new Date().setDate(date.getDate() - 7-6);
  }
  else{
    prevMonday = new Date().setDate(date.getDate() - day-6);
  }
  var yes=(new Date()).getTime()-24*60*60*1000;
  export default {
    components: {
    },
    data () {
      return {
        tableData: [],
        datatime1:timestampToTime(prevMonday),
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
        'getHotelOperateSta','getHotelListSta','showtoast'
      ]),
      initHotelList(){
        this.getHotelListSta({
          onsuccess: body => {
            this.xcxHotelList = body.data;
          }
        });
      },

      initStatistics(){
        this.getHotelOperateSta({
          data: {
            beginTime: this.datatime1,
            endTime: this.datatime2,
            hotelId: this.selectHotel,
          },
          onsuccess: body => {
            if(body.errcode==0&&body.data!=null){
              this.tableData = body.data;
            }
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
        if(this.datatime1=='' ||this.datatime2=='' ||this.datatime1==null ||this.datatime2==null){
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
        console.log(nDays);
        if(nDays>30){
          this.$message({
            message: '日期仅限31天内，请重新选择',
            center: true,
            type: 'error'
          })
          return
        }
        this.initStatistics();
      }
    },
    filters: {
      payFlagFilter(msg){
        let result='';
        switch(msg){
          case '1':      result='微信'; break;
          case '2':      result='支付宝'; break;
          case '':       result=''; break;
          default:
            result='未知';

        }
        return result;
      },
    },
    mounted(){
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
