<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <span>数据源</span>
        <div class="header">
          <span>当前门店楼宇房间信息来自PMS系统,上次同步时间:2017/06/01 23:33 。</span>
          <div class="header-btn">
            <el-button type="success">PMS同步数据</el-button>
            <el-button type="success">添加房间(非对接PMS)</el-button>
          </div>
        </div>
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
            <el-checkbox v-for="(obj, index) of roomfeatureDesc" :label="obj" :key="index"></el-checkbox>
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
  export default {
    name: 'Room',
    data() {
      return {
        showDialog: false,
        list: [],
        page: 1,
        size: 20,
        total: 0,
        roomfeatureDesc: []
      }
    },
    methods: {
      ...mapActions([
        'getRoomList',
        'modifyRoom',
      ]),
      edit(obj) {
        this.roomfeatureDesc = obj.roomfeature_desc;
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
          onsuccess: (body, headers) => {
            headers.map['x-current-page'] ? this.page = +headers.map['x-current-page'][0] : null;
            headers.map['x-total'] ? this.total = +headers.map['x-total'][0] : null;
            this.list = body.data;
          }
        })
      },
      modify(obj) {
        this.showDialog = false;

        this.modifyRoom({
          room_id: obj.room_id,
          building_name: obj.building_name,
          floor_name: obj.floor_name,
          room_num: obj.room_num,
          room_type_name: obj.room_type_name,
          roomfeature_desc: this.roomfeatureDesc,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    padding: 8px 24px;
    .content {
      font-size: 16px;
      color: #4A4A4A;
      font-weight: normal;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 14px;
        span{
          flex: 1;
        }
        .header-btn{
          flex: 1;
          .el-button {
            line-height: 18px;
          }
        }
      }
    }

    .el-dialog {
      .el-dialog__header {
        /*padding: 20px 20px 0;*/
        border-bottom: solid 1px red;
      }
    }
  }

</style>
