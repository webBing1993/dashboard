<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <span>数据源</span>
        <div class="header">
          <p>当前门店楼宇房间信息来自PMS系统，上次同步时间：2017/06/01 23:33 。</p>
          <div>
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
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="朝南"></el-checkbox>
            <el-checkbox label="无烟"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="hideDialog">取 消</el-button>
          <el-button type="primary" @click="submitDialog">确 定</el-button>
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
        checkList: ["朝南"],
        list: [
          {
            "room_id": "00090117c8dc4c68ac1d5cd343cb59a4",
            "building_name": "1号楼",
            "floor_name": "2层楼",
            "room_num": "0201",
            "room_type_name": "大床房",
            "roomfeature_desc": "无烟,朝南"
          }
        ],
        page: 1,
        size: 20,
        total: 0
      }
    },
    methods: {
      ...mapActions([
        'getRoomList'
      ]),
      edit(obj) {
        this.showDialog = true;
      },
      hideDialog() {
        this.showDialog = false;
      },
      submitDialog() {
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
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less">
  .content {
    font-size: 16px;
    color: #4A4A4A;
    font-weight: normal;
    padding: 8px 24px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 14px;
      .el-button {
        line-height: 18px;
        min-width: 140px;
      }
    }
  }

  .el-dialog {
    .el-dialog__header {
      /*padding: 20px 20px 0;*/
      border-bottom: solid 1px red;
    }
  }
</style>
