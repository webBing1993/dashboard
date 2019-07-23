<template>
  <el-main>
    <div class="module-wrapper">
      <div class="title">筛选</div>
      <el-row>
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
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期">
        </el-table-column>
        <el-table-column prop="name" label="酒店名称">
        </el-table-column>
        <el-table-column prop="groupName" label="所属集团">
        </el-table-column>
        <el-table-column prop="city" label="所在城市">
        </el-table-column>
        <el-table-column prop="ecardCount" label="开门梯控">
        </el-table-column>
        <el-table-column prop="roomServiceCount" label="客房服务申请">
        </el-table-column>
        <el-table-column prop="houseKeeperCount" label="在线客户管家">
        </el-table-column>
        <el-table-column prop="invoiceApplCount" label="发票申请">
        </el-table-column>
        <el-table-column prop="checkOutCount" label="退房申请">
        </el-table-column>
        <el-table-column prop="continueLiveCount" label="续住申请">
        </el-table-column>
      </el-table>
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
        'getxcxHotelList','getPMSHotelList'
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
        background-color: #4378BA;
        color: #ffffff;
        border-radius: 5px;
      }
    }
    .mcenter{
      text-align:center;
    }
  }
</style>
