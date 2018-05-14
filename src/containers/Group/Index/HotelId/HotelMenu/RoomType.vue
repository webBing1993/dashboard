<template>
  <div>
    <div class="module-wrapper">
      <div class="addRoomtype" v-if="!PmsConnectionStatus">
        <el-button type="success" @click="_addRoomtype">+ 添加</el-button>
      </div>
      <div class="content_room">
        <table-roomtype :list="list" :page="page" :size="size" @del="_del" @edit="edit"></table-roomtype>
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

      <!--对接了pms的编辑弹框-->
      <el-dialog
        v-if="PmsConnectionStatus"
        title="房型设置"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="dialog-content">
          <div class="item-form">
            <span>可住人数</span>
            <el-select class="el-right" v-model="maxGuestCount" placeholder="请选择可住人数">
              <el-option
                v-for="num of 10"
                :key="num"
                :label="num"
                :value="num">
              </el-option>
            </el-select>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>

      <!--没有对接了pms的编辑弹框-->
      <el-dialog
        v-if="!PmsConnectionStatus"
        title="房型设置"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
      >
        <div class="onespace"></div>
        <div class="dialog-content  ">
          <div class="item-form">
            <span>房型编号</span>
            <el-input v-model="roomtypeCode" placeholder="请输入内容"></el-input>
          </div>
          <div class="item-form">
            <span>房型名</span>
            <el-input v-model="roomtypeName" placeholder="请输入内容"></el-input>
          </div>
          <!--<div class="item-form">-->
            <!--<span>房间数目</span>-->
            <!--<el-input v-model="roomNum" placeholder="请输入内容"></el-input>-->
          <!--</div>-->
          <div class="item-form">
            <span>可住人数</span>
            <el-input v-model="roomCanLiveInNum" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>

      <!--添加弹框-->
      <el-dialog
        title="添加房型"
        :visible.sync="addRoomTypeDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
      >
        <div class="onespace"></div>
        <div class="dialog-content  ">
          <div class="item-form">
            <span>房型编号</span>
            <el-input v-model="roomtypeCode" placeholder="请输入内容"></el-input>
          </div>
          <div class="item-form">
            <span>房型名</span>
            <el-input v-model="roomtypeName" placeholder="请输入内容"></el-input>
          </div>
          <!--<div class="item-form">-->
            <!--<span>房间数目</span>-->
            <!--<el-input v-model="roomNum" placeholder="请输入内容"></el-input>-->
          <!--</div>-->
          <div class="item-form">
            <span>可住人数</span>
            <el-input v-model="roomCanLiveInNum" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="_saveRoomType">保存</el-button>
        </div>
      </el-dialog>

      <!--删除弹框-->
      <el-dialog
        title="删除房型"
        :visible.sync="delRoomTypeDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true">
        <div class="onespace"></div>
        <div class="dialog-content  ">
          <div class="content">
            <p>确认删除房型？</p>
            <span>房型编号：</span><span>{{roomtypeCode}}</span>
            <span>房型名：</span><span>{{roomtypeName}}</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="_confirmDel">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tool from '@/assets/tools/tool.js';
  export default {
    name: 'RoomType',
    data() {
      return {
        showDialog: false,
        addRoomTypeDialog: false,
        delRoomTypeDialog: false,
        page: 1,
        size: 20,
        total: 0,
        list: [],
        roomTypeId: '',
        maxGuestCount: '',
//    添加房间类型参数
        roomtypeCode: '',
        roomtypeName: '',
        roomNum: '',
        roomCanLiveInNum: '',
        PmsConnectionStatus: false,
      }
    },
    methods: {
      ...mapActions([
        'patchRoomType',
        'ChangeRoomType',
        'getRoomTypeLists',
        'addRoomType',
        'delCurrentRoomType',
        'checkPmsConnection',//判断pms对接了吗

      ]),
      _checkPmsConnection(){
        this.checkPmsConnection({
          hotel_id: this.$route.params.hotelid,
          onsuccess: (res) => {
            this.PmsConnectionStatus = res.data
          }
        })
      },
      _addRoomtype(){
        this.addRoomTypeDialog = true;
        this.roomtypeCode = ''
        this.roomtypeName = ''
        this.roomNum = ''
        this.roomCanLiveInNum = ''
      },

      _saveRoomType(){
        this.addRoomType({
          hotel_id: this.$route.params.hotelid,
          name: this.roomtypeName,
          max_guest_count: this.roomCanLiveInNum,
          pms_code: this.roomtypeCode,
          onsuccess: (res) => {
            this.addRoomTypeDialog = false
            this.getList()
          }
        })
      },

      edit(obj) {
          console.log(obj)
        this.maxGuestCount = obj.max_guest_count;
        this.roomTypeId = obj.room_type_id;
        this.roomtypeName = obj.name;
        this.roomtypeCode = obj.pms_code;
        this.roomNum = obj.room_num;
        this.roomCanLiveInNum = obj.max_guest_count;
        this.showDialog = true;
      },

      _del(obj){
        this.roomTypeId = obj.room_type_id;
        this.delRoomTypeDialog = true
        console.log(obj)
        this.roomtypeCode = obj.pms_code
        this.roomtypeName = obj.name

      },

      _confirmDel(){
        this.delCurrentRoomType({
          room_type_id: this.roomTypeId,
          onsuccess: body => {
            this.delRoomTypeDialog = false;
            this.getList();
          }
        })
      },

      handleSizeChange(val) {
        this.size = val;
      },

      handleCurrentChange(val) {
        this.page = val;
      },

      hideDialog() {
        this.showDialog = false;
        this.addRoomTypeDialog = false
        this.delRoomTypeDialog = false
      },

      modify() {
        if (this.PmsConnectionStatus) {//对接了pms的
          let data = {
            max_guest_count: this.maxGuestCount
          }

          this.patchRoomType({
            data,
            room_type_id: this.roomTypeId,
            onsuccess: body => {
              this.showDialog = false;
              this.getList();
            }
          })
        } else {
          this.ChangeRoomType({
            hotel_id: this.$route.params.hotelid,
            room_type_id: this.roomTypeId,
            name: this.roomtypeName,
            max_guest_count: this.roomCanLiveInNum,
            pms_code: this.roomtypeCode,
            onsuccess: body => {
              this.showDialog = false;
              this.getList();
            }
          })
        }

      },

      getList() {
        this.getRoomTypeLists({
          page: this.page.toString(),
          size: this.size.toString(),
          hotel_id: this.$route.params.hotelid,
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;

            this.list = body.data;
          }
        })
      },
    },
    mounted() {
      this.getList();
      this._checkPmsConnection();
    }
  }
</script>

<style scoped lang="less">
  .onespace {
    border-bottom: 1px solid #CACACA;
    margin-bottom: 20px;
    margin-top: -10px;
  }

  .addRoomtype {
    button {
      width: 160px;
      height: 40px;
      float: right;
      margin: 25px;
    }
  }

  .content_room {
    font-size: 16px;
    color: #4A4A4A;
    font-weight: normal;
    padding: 19px 25px 0 24px;
    .data_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      span, p {
        flex: 1;
        font-size: 14px;
        color: #4A4A4A;
      }
      .header-btn {
        display: flex;
        /*margin-right: 6px;*/
        .el-button {
          line-height: 18px;
          min-width: 173px;
          font-size: 13px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          margin: 0;
          &:nth-child(1) {
            margin-right: 59px;
          }
        }
      }
    }
  }

  .el-dialog {
    .dialog-content {
      .item-form {
        display: flex;
        flex-direction: row;
        /*justify-content: space-between;*/
        margin-bottom: 20px;
        .el-input {
          width: 80%;

        }
      }
      span {
        font-size: 16px;
        color: #4A4A4A;
        width: 100px;
      }
      p {
        font-size: 16px;
        color: #4A4A4A;
        width: 120px;
      }
      .el-select {
        min-width: 300px;
        margin-left: 20px;
      }
    }
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

</style>
