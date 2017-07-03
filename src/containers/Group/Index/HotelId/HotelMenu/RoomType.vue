<template>
  <div>
    <div class="module-wrapper">
      <div class="content_room">
        <table-roomtype :list="list" :page="page" :size="size" @edit="edit"></table-roomtype>
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
          <el-button type="primary" @click="modify">确 定</el-button>
          <el-button @click="hideDialog">取 消</el-button>
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
        page: 1,
        size: 20,
        total: 0,
        list: [{
          type: '哈哈',
          count: 3,
          num: 2
        }],
        maxGuestCount: ''
      }
    },
    methods: {
      ...mapActions([
        'patchRoomType',
        'getRoomTypeList'
      ]),
      edit(obj) {
        this.maxGuestCount = obj.max_guest_count;
        this.showDialog = true;
      },
      handleSizeChange(val) {
        this.size = val;
      },
      handleCurrentChange(val) {
        this.page = val;
      },
      hideDialog() {
        this.showDialog = false;
      },
      modify() {
        let data = {
          max_guest_count: this.maxGuestCount
        }

        this.patchRoomType({
          data,
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
            this.showDialog = false;
            this.getList();
          }
        })
      },
      getList() {
        this.getRoomTypeList({
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

    }
  }
</script>

<style scoped lang="less">
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
    .dialog-content {
      span {
        font-size: 16px;
        color: #4A4A4A;
      }
      .el-select {
        min-width: 300px;
        margin-left: 20px;
      }
    }
    .dialog-footer {
      width: 100%;
      margin: 40px auto 10px;
      text-align: center;
      .el-button {
        width: 220px;
        line-height: 18px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        &:nth-child(2) {
          /*margin-right: 59px;*/
          margin-left: 20px;
          background-color: #ffffff;
          border-color: #8f8f8f;
        }
      }
    }
  }

</style>
