<template>
   <div>
     <div class="module-wrapper">
       <div class="content_devicelist">
           <div class="devicelist_title">
             <div class="devicelist_title_left">
               <span style="margin-right:90px">刷脸设备管理</span>
             </div>
             <div>
               <el-button type="success" @click.native="add">绑定刷脸设备</el-button>
             </div>
           </div>
           <table-facedevice :list="list"  @deleteItem="deleteItem"></table-facedevice>
           <el-pagination
             v-show="total > size"
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="page"
             :page-sizes="[10, 20, 30]"
             :page-size="size"
             layout="total, sizes, prev, pager, next, jumper"
             :total="total">
           </el-pagination>
         </div>
     </div>

     <el-dialog
       title="提示"
       :visible.sync="showDeleteDialog">
       <h1>确定删除设备？</h1>
       <div slot="footer" class="dialog-footer">
         <el-button @click="showDeleteDialog = false">取 消</el-button>
         <el-button type="primary" @click="removeDevices">确 定</el-button>
       </div>
     </el-dialog>
   </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'

  export default {
    components:{

    },
    data(){
      return{
        list: [],
        page: 1,
        size: 2,
        total: 0,
        showDeleteDialog:false,
        obj:{}
      }
    },
    methods:{
      ...mapActions([
        'goto','getFaceDevice','deleteDevice'
      ]) ,
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList(){
        this.getFaceDevice({
          hotelId:this.$route.params.hotelid,
          onsuccess: (body, headers) => {
           this.list =body.data;

          }
        })
      },
      add(obj) {
        this.goto({
          name: 'editFaceDevice'
        })
      },
      deleteItem(obj) {
        this.showDeleteDialog=true;
        this.obj=obj
      },
      removeDevices(){
        this.showDeleteDialog=false;
          this.deleteDevice({
            hotelId:this.$route.params.hotelid ,
            data:{
              deviceId:this.obj.deviceId,
              roomNo:this.obj.roomNo,
            },
            onsuccess: (body, headers) => {
              this.getList()
            }
          });
      },
      update_aly(obj){
        console.log('------->',obj)
        this.updateToALY({
          deviceId:obj.id,
          onsuccess: (body) =>{
            console.log(body)
            this.getList();

          }
        })
      },
    },
    watch:{

    },
    computed:{

    },
    mounted(){
      this.getList()
    }
  }
</script>
<style lang="less" scoped>
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
  .devicelist_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
    .devicelist_title_left{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_div{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    span {
      font-size: 16px;
      font-weight: normal;
      color: #4A4A4A;
      padding: 0;
      border-bottom: 0;
    }
    .deviceAmount{
      color:#39C240;
      font-size: 20px;
    }
    .noDeviceAmoint{
      color:#ff2b1c;
      font-size: 20px;
    }
    .el-button {
      min-width: 173px;
      line-height: 18px;
      background-color: #39C240;
      border-color: #39C240;
      border-radius: 0;
      padding: 0;
      span {
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
</style>
