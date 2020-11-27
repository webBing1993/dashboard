<template>
  <el-main>
    <div class="module-wrapper">
      <div class="title">筛选</div>
      <el-row class="el_row">
        <el-col :span="2">
          <div class="hotelitle">
            <span>酒店名称</span>
          </div>
        </el-col>
        <el-col :span="4" class="hotelitle">
          <div>
            <el-select v-model="selectHotel" filterable placeholder="请选择">
              <el-option
                v-for="item in xcxHotelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
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
            <th>日期</th>
            <th>酒店名称</th>
            <th>所属集团</th>
            <th>所在城市</th>
            <th>开门梯控</th>
            <th>客房服务申请</th>
            <th>在线客房管家</th>
            <th>发票申请</th>
            <th>退房申请</th>
            <th>续住申请</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(obj, index) of tableData">
            <td>{{ obj.date }}</td>
            <td>{{ obj.name }}</td>
            <td>{{ obj.groupName }}</td>
            <td>{{ obj.city }}</td>
            <td>{{ obj.ecardCount }}</td>
            <td>{{ obj.roomServiceCount }}</td>
            <td>{{ obj.houseKeeperCount }}</td>
            <td>{{ obj.invoiceApplCount }}</td>
            <td>{{ obj.checkOutCount }}</td>
            <td>{{ obj.continueLiveCount }}</td>
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
  export default {
    components: {
    },
    data () {
      return {
        tableData: [],
        datatime1:'',
        datatime2:'',
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
        'getxcxHotelList','getPMSHotelList','showtoast'
      ]),
      initXCXHotelList(){
        this.getPMSHotelList({
          onsuccess: body => {
            this.xcxHotelList = body.data;
          }
        });
      },

      initStatistics(){
        this.getxcxHotelList({
          startTime:this.datatime1,
          endTime:this.datatime2,
          hotelId:this.selectHotel,
          onsuccess: body => {
            this.tableData = body.data;
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
        if(this.datatime1=='' ||this.datatime2==''||this.datatime1==null ||this.datatime2==null ){
          this.showtoast({
            text: '请选择时间',
            type: 'warning'
          })
          return;
        }
        this.datatime1 = timestampToTime(this.datatime1);
        this.datatime2 = timestampToTime(this.datatime2);
        this.initStatistics();
      }
    },
    mounted(){
      this.initXCXHotelList();
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
    .el_row {
      margin-bottom:20px;
      .hotelitle {
        text-align: left
      }
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
