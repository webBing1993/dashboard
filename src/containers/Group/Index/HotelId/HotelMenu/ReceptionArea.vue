<!--接待区页-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_reception">
        <div class="top">接待区<el-button type="success" @click.native="addReception" class="button">添 加</el-button></div>
        <table-receptionArea :list="list" :page="page" :size="size" @edit="goEdit"></table-receptionArea>
        <el-dialog title="添加接待区"
                   :visible.sync="showAddContent"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="true"
                   width=""
                   @close="handleClose"
                   center>
          <div class="rec">
            <div class="item-form" style="font-weight: bolder">基本信息</div>
            <div class="item-form">
              <span class="itemTitle">名称</span>
              <el-input v-model="name" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="item-form">
              <span class="itemTitle">电话</span>
              <el-input v-model="tel" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="item-form">
              <span class="itemTitle">地址</span>
              <el-input v-model="address" placeholder="请输入内容" class="input"></el-input>
            </div>
          </div>
          <div class="rec">
            <div class="item-form" style="font-weight: bolder">配置</div>
            <div class="item-form">
              <span class="itemTitle">关联房型</span>
              <el-checkbox-group v-model="roomType">
                <el-checkbox v-for="(rooms, key) in roomTypeList" label=rooms.name :disabled=!rooms.abled></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="item-form">
              <span class="itemTitle">选择旅业</span>
              <el-select v-model="lvyeVal" placeholder="请选择">
                <el-option
                  v-for="(item,index) in lvyeList"
                  :key="index"
                  :value="item.value"
                  :label="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="save">保 存</el-button>
            <el-button type="primary" @click="showAddContent=false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'receptionArea',
    data(){
      return{
        list: [],
        showDialog: false,
        page: 1,
        size: 20,
        total: 0,
        showAddContent:false,
        name:'',
        address:'',
        tel:'',
        roomType:[],
        roomTypeList:[],
        lvyeVal:'',
        lvyeList:[],
      }
    },
    computed: {

    },
    methods:{
      ...mapActions([
        'getRecpetion',
        'saveRecpetion',
        'searchRoomType',
        'searchLvye',
        'goto',
        'showtoast'
      ]),
      //获取接待区列表
      getList(){
       this.getRecpetion({
         hotel_id: this.$route.params.hotelid,
         onsuccess:body=>{
           this.list=body.data;
         }
       })
      },
      //保存接待区
      save(){
        this.saveRecpetion({
          hotel_id: this.$route.params.hotelid,
          name:this.name,
          tel:this.tel,
          address:this.address,
          roomTypeList:this.roomTypeList,
          lvyeConfigId:this.lvyeVal,
          onsuccess:body => {
            this.showtoast({
              text: '保存成功',
              type: 'success'
            })
            this.showDialog = false;
          }
        });
      },
      //添加接待区
      addReception(){
        this.showAddContent=true;
        this.reset();
        this.searchRoomType({
          areaId:"",
          onsuccess:body => {
            this.roomTypeList=body;
          }
        });
        this.searchLvye({
          hotel_id: this.$route.params.hotelid,
          onsuccess:body => {
            body.forEach(function (item) {
              let lvyeObj={value:'',name:''};
              lvyeObj.value=item.id;
              lvyeObj.name=item.lvye_name;
              this.lvyeList.push(lvyeObj);
            });
          }
        });
      },
      //编辑接待区
      goEdit(obj){
        this.showAddContent=true;
        this.searchRoomType({
          areaId:obj.id,
          onsuccess:body => {
            this.roomTypeList=body;
          }
        });
        this.searchLvye({
          hotel_id: this.$route.params.hotelid,
          onsuccess:body => {
            body.forEach(function (item) {
              let lvyeObj={value:'',name:''};
              lvyeObj.value=item.id;
              lvyeObj.name=item.lvye_name;
              if(item.id===obj.lvye_config_id){
                 this.lvyeVal=item.id;
              }
            });
          }
        });
        this.name=obj.name;
        this.tel=obj.tel;
        this.address=obj.address;
        this.roomType=obj.room_type;
      },
      reset(){
        this.name="";
        this.tel="";
        this.address="";
        this.roomTypeList="";
      },
      handleClose(){
        this.showAddContent=false;
      },

    },
    mounted(){
//      this.getList();
    }
  }
</script>
<style lang="less">
  .module-wrapper{
    padding: 1rem;
    .content_reception{
      .top{
         font-weight: bold;
        font-size: 16px;
         height:3rem;
         margin-bottom: 1rem;
         line-height:3rem;
        .button {
          float: right;
          left:500px;
          line-height: 18px;
          min-width: 173px;
          font-size: 13px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          margin: 0;
         }
      }
      .el-dialog {
        width: 65%;
        .el-dialog__header {
          padding: 0 20px;
          border-bottom:solid 1px #979797;
          .el-dialog__title {
            line-height: 43px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
          }
          .el-dialog__headerbtn{
            padding-top: 12px;
          }
        }
        .el-dialog__body {
          padding: 0 20px 33px;
        .rec {
          padding: 1rem 0;
          font-size: 14px;
          font-weight: 400;
          color: #4A4A4A;
          .item-form {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
             .itemTitle {
              display: inline-block;
              min-width: 75px;
            }
            .el-select {
              width: 80%;
              .el-option {
                width: 80%;
              }
            }
            .el-input {
              width: 100%;
            }
            .el-switch {
              margin-left: 16px;
            }
            .el-checkbox-group{
              .el-checkbox__inner{
                display: inline-block;
                min-width:0.2rem;
                min-height: 0.2rem;
              }
            }
            .input{
              width: 80%;
            }
          }
          article {
            ul {
              font-size: 14px;
              color: #9B9B9B;
              margin-left: 41px;
              line-height: 22px;
              li {
                margin-left: 20px;
              }
            }
          }
          .item_large {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            span {
              min-width: 194px;
              text-align: end;
            }
            .el-input {
              width: 60%;
            }
          }
          .item-tag2 {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            & > span {
              display: inline-block;
              min-width: 110px;
              text-align: end;
            }
            .tag-input {
              position: relative;
              margin-left: 16px;
              width: 70%;
              .el-input {
                width: 100%;
                margin: 0 0 12px 0;
              }
              .tag-btn {
                position: absolute;
                bottom: 20px;
                right: -62px;
                button {
                  border-radius: 50px;
                  outline: none;
                  border: solid 1px;
                  margin-left: 5px;
                  padding-bottom: 2px;
                  background-color: #ffffff;
                  height: 20px;
                  width: 20px;
                }
              }
            }
          }
        }
        .rec:not(:last-child){
          border-bottom: solid 1px #979797;;
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
      }
   }
  }
</style>
