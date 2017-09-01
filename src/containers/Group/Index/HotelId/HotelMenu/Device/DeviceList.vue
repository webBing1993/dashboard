<template>
  <div>
    <div class="module-wrapper">
      <div class="content_devicelist">
        <div class="devicelist_title">
          <span>设备管理</span>
          <el-button type="success" @click.native="addOther">关联游离设备</el-button>
          <el-button type="success" @click.native="add">添加设备</el-button>
        </div>
        <table-device :list="list" :page="page" :size="size" @edit="edit"></table-device>
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
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'DeviceList',
    data() {
      return {
        list: [],
        page: 1,
        size: 20,
        total: 0
      }
    },
    methods: {
      ...mapActions([
        'getDeviceList',
        'goto'
      ]),
      add(obj) {
        this.goto({
          name: 'EditDevice'
        })
      },
      edit(obj) {
        this.goto({
          name: 'EditDevice',
          query: {
            device_id: obj.device_id
          }
        })
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
        this.getDeviceList({
          hotel_id: this.$route.params.hotelid,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;
            console.log(body)
            this.list = body.data;
          }
        })
      },
      addOther() {
        this.goto({name: 'RelationDevice'})
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>
<style lang="less">
  .content_devicelist {
    padding: 20px 25px 0 24px;
    .devicelist_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 7px;
      span {
        font-size: 16px;
        font-weight: normal;
        color: #4A4A4A;
        padding: 0;
        border-bottom: 0;
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
  }

</style>
