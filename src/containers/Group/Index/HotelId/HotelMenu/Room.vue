<template>
  <div>
    <div class="module-wrapper">
      <div class="content_room">
        <span>数据源</span>
        <div class="data_title">
          <span>当前门店楼宇房间信息来自PMS系统，上次同步时间：{{updateTime?new Date(updateTime).toLocaleString():'暂无'}} 。</span>
          <div class="header-btn">
            <el-button type="success" :disabled="!canSyncData" @click.native="syncPMS">PMS同步数据</el-button>
            <!--<el-button type="success">添加房间(非对接PMS)</el-button>-->
          </div>
        </div>
        <table-room :list="list" :page="page" :size="size" @edit="edit" @config="config"></table-room>
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
        :title="typeTitles[showType]"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="dialog-content">
          <div v-if="showType === enumShowType.edit">
            <el-checkbox-group v-model="roomfeatureDesc">
              <el-checkbox v-for="(obj, index) of roomTags" :label="obj" :key="index"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="showType === enumShowType.config">
            <div class="item-form">
              <span>门锁序列号</span>
              <el-input class="el-right" v-model="roomLockSn" placeholder="请输入门锁序列号"></el-input>
            </div>
          </div>
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
  import tool from '@/assets/tools/tool.js';

  const enumShowType = {
    init: 0,
    edit: 1, //编辑
    config: 2,  //配置
  }

  const typeTitles = [' ',
    '房间标签配置',
    '门锁配置'
  ];


  export default {
    name: 'Room',
    data() {
      return {
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
        showType: '',
        tempObj: '',
        updateTime: '',
        list: [],
        page: 1,
        size: 20,
        total: 0,
        roomfeatureDesc: [],
        roomLockSn: '',
        canSyncData: true
      }
    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData
      }),
      roomTags() {
        return this.configData.room_tags;
      }
    },
    methods: {
      ...mapActions([
        'getRoomList',
        'modifyRoom',
        'getConfig',
        'syncPMSData',
        'syncPMSTime'
      ]),
      edit(obj) {
        this.tempObj = obj;
        this.roomfeatureDesc = tool.isNotBlank(obj.roomfeature_desc) ? obj.roomfeature_desc.split(',') : [];

        this.showType = this.enumShowType.edit;
        this.showDialog = true;
      },
      config(obj) {
        this.tempObj = obj;
        this.roomLockSn = obj.room_lock_sn;

        this.showType = this.enumShowType.config;
        this.showDialog = true;
      },
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
          case enumShowType.edit:

            break;
          case enumShowType.config:
            break;

          default:
        }
      },
      submitDialog() {
        let data = {}
        switch (this.showType) {
          case enumShowType.edit:
            console.log(this.roomfeatureDesc);
            if(this.roomfeatureDesc.length>3){
              this.$message({
                type: 'error',
                message: '房间标签不能选择超过3个'
              })
              return
            }
            data = {
              roomfeature_desc: this.roomfeatureDesc.join(),
              room_lock_sn: this.tempObj.room_lock_sn,
            }
            break;
          case enumShowType.config:
            data = {
              roomfeature_desc: this.tempObj.roomfeature_desc,
              room_lock_sn: this.roomLockSn,
            }
            break;

          default:
        }
        this.modify(data);
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
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;
            
            this.list = body.data;
          }
        })
      },
      modify(data) {
        this.modifyRoom({
          ...data,
          hotel_id: this.$route.params.hotelid,
          room_id: this.tempObj.room_id,
          building_name: this.tempObj.building_name,
          floor_name: this.tempObj.floor_name,
          room_num: this.tempObj.room_num,
          room_type_name: this.tempObj.room_type_name,
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
      },
      getSyncPMSData() {
        this.syncPMSData({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
            this.canSyncData = true;
            this.getSyncPMSTime();
            this.page = 1;
            this.getList();
          },
          onfail: body => {
            this.canSyncData = true;
          }
        })
      },
      getSyncPMSTime() {
        this.syncPMSTime({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
            this.updateTime = body.data.updateroom_time;
          }
        })
      },
      syncPMS() {
        this.canSyncData = false;
        this.getSyncPMSData();
      }
    },
    mounted() {
      this.getSyncPMSTime();
      this.getList();
      //为了获取roomTags
      if (tool.isBlank(this.configData) || tool.isEmptyObject(this.configData)) {
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
              /*margin-right: 59px;*/
            }
          }
        }
      }
    }
    .el-dialog {
      .el-dialog__header {
        border-bottom: solid 1px red;
      }
      .item-form {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .el-select {
                width: 70%;
                .el-input {
                  width: 100%;
                }
              }
              .el-input {
                width: 70%;
              }

              .el-switch {
                margin-left: 16px;
              }
            }
    }
  }

</style>
