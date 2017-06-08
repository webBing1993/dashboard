<template>
  <div>
    <div class="module-wrapper">
      <div class="content_room">
        <!--<span>数据源</span>
        <div class="data_title">
          <span>当前门店楼宇房间信息来自PMS系统，上次同步时间：2017/06/01 23:33 。</span>
          <div class="header-btn">
            <el-button type="success">PMS同步数据</el-button>
            <el-button type="success">添加房间(非对接PMS)</el-button>
          </div>
        </div>-->
        <table-room :list="list" @edit="edit"></table-room>
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
      <el-dialog
        title="房间标签配置"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="dialog-content">
          <el-checkbox-group v-model="roomfeatureDesc">
            <el-checkbox v-for="(obj, index) of roomTags" :label="obj" :key="index"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tool from '@/assets/tools/tool.js';
  export default {
    name: 'Room',
    data() {
      return {
        showDialog: false,
        tempObj: '',
        list: [],
        page: 1,
        size: 20,
        total: 0,
        roomfeatureDesc: []
      }
    },
    computed: {
      ...mapState([
        'configData'
      ]),
      roomTags() {
        return this.configData.room_tags;
      }
    },
    methods: {
      ...mapActions([
        'getRoomList',
        'modifyRoom',
        'getConfig'
      ]),
      edit(obj) {
        this.tempObj = obj;
        this.roomfeatureDesc = tool.isNotBlank(obj.roomfeature_desc) ? obj.roomfeature_desc.split(',') : [];
        this.showDialog = true;
      },
      hideDialog() {
        this.showDialog = false;
      },
      handleSizeChange(val) {
        this.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      getList() {
        this.getRoomList({
          page: this.page.toString(),
          size: this.size.toString(),
          hotel_id: this.$route.params.hotelid,
          onsuccess: (body, headers) => {
            headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            headers.get('x-total') ? this.total = +headers.get('x-total') : null;
            this.list = body.data;
          }
        })
      },
      modify() {
        this.showDialog = false;

        this.modifyRoom({
          hotel_id: this.$route.params.hotelid,
          room_id: this.tempObj.room_id,
          building_name: this.tempObj.building_name,
          floor_name: this.tempObj.floor_name,
          room_num: this.tempObj.room_num,
          room_type_name: this.tempObj.room_type_name,
          roomfeature_desc: this.roomfeatureDesc.join(),
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {

          }
        })
      }
    },
    mounted() {
      this.getList();
      if (tool.isBlank(this.configData)) {
        this.getConfigs();
      }
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    .content_room {
      font-size: 16px;
      color: #4A4A4A;
      font-weight: normal;
      padding: 9px 25px 0 24px;
      .data_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
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
      .el-dialog__header {
        border-bottom: solid 1px red;
      }
    }
  }

</style>
