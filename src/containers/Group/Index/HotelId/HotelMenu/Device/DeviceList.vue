<template>
  <div>
    <div class="module-wrapper">
      <h3>设备管理</h3>
      <el-button type="success" @click.native="add">添加设备</el-button>
      <table-device :list="list" @edit="edit"></table-device>
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
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'DeviceList',
    data() {
      return {
        list: [
          {                                                                                
            "hotel_id":"3c04bfba87c74e8b9bab8876ac01b01b",
            "device_id":"f86cf4b3155011e78ece0bb05596f0f1",
            "device_type":"31",//31底座、32底座PAD
            "device_name":"设备名称",
            "enabled":1,  //1可用0禁用
            "created_time":"2017-04-28 17:21:37"
          }
        ],
        page: 1,
        size: 20,
        total: 0
      }
    },
    methods: {
      ...mapActions([
        'getDeviceList',
      ]),
      add(obj) {
        this.$router.push({
          name: 'EditDevice'
        })
      },
      edit(obj) {
        this.$router.push({
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
          keyword: this.searchVal,
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
      // this.getList();
    }
  }
</script>