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
      <el-table :data="tableData">
        <el-table-column prop="createdTime" label="日期">
        </el-table-column>
        <el-table-column prop="total" label="总条数">
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    components: {
    },
    data () {
      return {
        tableData:[],
        selectHotel:'',
      }
    },
    computed:{
      ...mapState([
        'hotelList',//获得酒店列表
      ]),
    },
    methods:{
      ...mapActions(['getRZTStatistics']),
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
         this.initRZTStatistics();
      }
    },
    mounted(){
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
