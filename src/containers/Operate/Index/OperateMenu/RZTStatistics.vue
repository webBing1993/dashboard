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
                v-for="item in hotelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="15">
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
            <th>总条数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(obj, index) of tableData">
            <td>{{ obj.createdTime }}</td>
            <td>{{ obj.total }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </el-main>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    components: {
    },
    data () {
      return {
        tableData:[],
        selectHotel:'',
        hotelList:[],
      }
    },
    methods:{
      ...mapActions(['getRZTStatistics','getHotelList1','showtoast']),
      initRZTStatistics(){
         this.getRZTStatistics({
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
         this.initRZTStatistics();
      },
      initHotelList(){
        this.getHotelList1({
          page:1,
          pageSize:3000,
          onsuccess: body => {
            if(body.data!=null && body.data!=''){
                this.hotelList=body.data.list;
            }
          }
        });
      },

    },
    mounted(){
      this.initHotelList();
    }

  }
</script>

<style lang="less" scoped>
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
