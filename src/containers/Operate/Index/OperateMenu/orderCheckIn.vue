<template>
  <el-main>
    <div class="module-wrapper">
      <div class="title">筛选</div>
      <el-row  style="margin-bottom:20px;">
        <el-col :span="2">
          <div class="hotelitle" style="text-align: left">
            <span>酒店名称</span>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: left">
          <div>
            <el-select v-model="selectHotel" filterable placeholder="请选择">
              <el-option
                v-for="item in pmsHotelList"
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
      <table-OrderCheckIn :list="tableData"></table-OrderCheckIn>
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
  export default {
    components: {
    },
    data () {
      return {
        tableData: [],
        datatime1:'',
        datatime2:'',
        selectHotel:'',
        pmsHotelList:'',
      }
    },
    methods:{
      ...mapActions([
       'getStatistics','getPMSHotelList','showtoast'
      ]),
      initPMSHotelList(){
        this.getPMSHotelList({
          onsuccess: body => {
            this.pmsHotelList=body.data;
          }
        });
      },
      initStatistics(){
        this.getStatistics({
          dateTime:this.datatime1,
          endTime:this.datatime2,
          hotelId:this.selectHotel,
          onsuccess: body => {
            this.tableData=body.data;
            console.log(this.tableData)
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
        if(this.datatime1=='' ||this.datatime2=='' ){
          this.showtoast({
            text: '请选择时间',
            type: 'warning'
          })
          return;
        }

          this.datatime1=timestampToTime(this.datatime1);
          this.datatime2 = timestampToTime(this.datatime2);

          this.initStatistics();
      }
    },
    mounted(){
       this.initPMSHotelList();
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
    line-height: 40px;
    text-align: center;

    .title {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 20px;
      width: 100%;
      text-align: left;
    }

    .firstdate {
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
      }

      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
      }
    }

    /deep/ .el-table {
      margin-top: 20px;
    }

    /deep/ .el-table th {
      background-color: #9B9B9B;
      font-size: 14px;
      color: #3e3e3e;
      height: 38px;
      padding: 0;
    }

    .selectButton {
      display: flex;
      justify-content: center;
      width: 100%;

      span {
        width: 90px;
        height: 44px;
        background-color: #39C240;
        color: #ffffff;
        border-radius: 5px;
      }
    }

    .mcenter {
      text-align: center;
    }
  }
</style>
