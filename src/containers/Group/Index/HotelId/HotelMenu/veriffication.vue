<template>
  <div>
    <div class="module-wrapper">
      <div class="search-bar">
        <div class="content-item">
          <span>核验状态</span>
          <el-select class="el-right" @change="saarchList" v-model="identityStatus" placeholder="请选择核验状态">
            <el-option
              v-for="(obj, index) of identityStatusList"
              :key="obj.id"
              :label="obj.name"
              :value="obj.id">
            </el-option>
          </el-select>
        </div>
        <el-input class="el-right" v-model="searchVal" @keyup.13.native="getList" placeholder="输入姓名"></el-input>
        <el-input class="el-right" v-model="searchVal_" @keyup.13.native="getList" placeholder="输入房号"></el-input>
        <el-button type="success" @click.native="getList">搜索</el-button>
      </div>
      <div class="content_table">
        <table-verify :list="list" :page="page" :size="size" @edit="goEdit" @reportbtn = 'goReportbtn' @reject="getReject"></table-verify>
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

    <!-- 编辑弹框-->
    <el-dialog
      title="核验信息"
      :visible.sync="visiblesyncTure"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-content">
        <el-form ref="form" :model="changeItem" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="changeItem.name" placeholder="请输入核验人姓名"></el-input>
          </el-form-item>
          <el-form-item label="证件照片" v-if="changeItem.scene == 'FACE_CHECK'">
            <img :src="changeItem.photo" alt="">
          </el-form-item>
          <el-form-item label="证件号" v-if="changeItem.scene == 'FACE_CHECK'">
            <el-input v-model="changeItem.idcard" placeholder="请输入核验人证件号"></el-input>
          </el-form-item>
          <el-form-item label="证件地址" v-if="changeItem.scene == 'FACE_CHECK'">
            <el-input v-model="changeItem.address" placeholder="请输入核验人证件地址"></el-input>
          </el-form-item>
          <el-form-item label="房间号">
            <el-select
              v-model="changeItem.roomNo"
              filterable
              remote
              reserve-keyword
              @blur="selectBlur"
              :remote-method="remoteMethod"
              placeholder="请输入旅业上传房间号"
              :loading="loading">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入离时间">
            <span>{{ datetimeparse(changeItem.inTime, 'MM/dd') }} - {{ datetimeparse(changeItem.outTime, 'MM/dd') }}</span>
          </el-form-item>
          <el-form-item label="入住上传状态">
            <span>{{ changeItem.reportInStatus == 'NONE' ? '未上传' : changeItem.reportInStatus == 'FAILED' ? '上传失败' : changeItem.reportInStatus == 'CHANGING' ? '换房中' : changeItem.reportInStatus == 'PENDING' ? '上传中' : changeItem.reportInStatus == 'SUCCESS' ? '上传成功' : '不上传' }}</span>
          </el-form-item>
          <el-form-item label="入住上次提示">
            <span>{{ changeItem.reportInRemark ? changeItem.reportInRemark : '-' }}</span>
          </el-form-item>
          <el-form-item label="核验状态">
            <span>{{ changeItem.scene == 'FACE_CHECK' ? '刷证核验' : '无证核验' }}</span>
          </el-form-item>
          <el-form-item label="核验分值">
            <span>{{ changeItem.similarity }}</span>
          </el-form-item>
          <el-form-item label="离店上传状态">
            <span>{{ changeItem.reportOutStatus == 'NONE' ? '未上传' : changeItem.reportOutStatus == 'FAILED' ? '上传失败' : changeItem.reportOutStatus == 'PENDING' ? '上传中' : changeItem.reportOutStatus == 'SUCCESS' ? '上传成功' : '不上传' }}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="onSubmitInLoading" @click="onSubmitIn" v-if="changeItem.roomNo && (changeItem.reportInStatus == 'NONE' || changeItem.reportInStatus == 'FAILED' || changeItem.reportInStatus == 'SUCCESS')">{{ (changeItem.reportInStatus == 'NONE' || changeItem.reportInStatus == 'FAILED') ? '入住' :  '换房' }}上传</el-button>
            <el-button type="primary" v-if="changeItem.reportInStatus == 'SUCCESS'" :loading="onSubmitOutLoading" @click="onSubmitOut">离店上传</el-button>
            <el-button :loading="onSaveLoading" type="primary" @click="onSave">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'veriffication',
    data () {
      return {
        searchVal: '',
        searchVal_: '',
        identityStatus: 'ALL',
        identityStatusList: [
          {
            name: '全部',
            id: 'ALL'
          },
          {
            name: '自动通过',
            id: ' AUTO_AGREED'
          },
          {
            name: '通过',
            id: ' AGREED'
          },
          {
            name: '验证不通过',
            id: ' AUTO_REFUSED'
          },{
            name: '不通过',
            id: ' REFUSED'
          }
        ],
        list: [],
        page: 1,
        size: 20,
        total: 0,
        visiblesyncTure: false,
        changeItem: {
          name: '',
          photo: '',
          idcard: '',
          address: '',
          roomNo: '',
          inTime: '',
          outTime: '',
          reportInStatus: '',
          scene: '',
          similarity: '',
          reportOutStatus: ''
        },
        loading: false,
        rooms: [],
        options: [],
        onSubmitInLoading: false,
        onSubmitOutLoading: false,
        onSaveLoading: false
      }
    },
    methods: {
      ...mapActions([
        'getVerifyList',
        'getRoomList',
        'getverifyDetail',
        'verifySave',
        'goto'
      ]),

      // 编辑
      goEdit(obj) {
        if (this.rooms.length == 0) {
            this.getRooms();
        }
        this.getverifyDetail({
          identityCheckId: obj.identityCheckId,
          onsuccess: (body, headers) => {
            this.changeItem = body.data;
            this.onSaveLoading = false;
            this.onSubmitInLoading = false;
            this.onSubmitOutLoading = false;
            this.visiblesyncTure = true;
          }
        });
      },

      // 上传
      goReportbtn(obj) {
        this.changeItem = obj;
        let data = {
          reportInStatus: 'SUCCESS'
        };
        this.commonFunSave(JSON.stringify(data), 'IN')
      },

      // 拒绝
      getReject(obj) {
        this.changeItem = obj;
        let data = {
          reportInStatus: 'UNREPORTED'
        };
        this.commonFunSave(JSON.stringify(data))
      },

      // 入住/换房上传
      onSubmitIn() {
        let data = {
            roomNo: this.changeItem.roomNo
        };
        if (this.changeItem.reportInStatus == 'SUCCESS') {
            data.reportInStatus = 'CHANGING';
        }else {
           data.reportInStatus = 'SUCCESS'
        }
        this.onSubmitInLoading = true;
        this.commonFunSave(JSON.stringify(data), 'IN')
      },

      // 离店上传
      onSubmitOut() {
        this.onSubmitOutLoading = true;
        this.commonFunSave('', 'OUT')
      },

      // 保存
      onSave() {
          let data = {
            name: this.changeItem.name,
            roomNo: this.changeItem.roomNo
          };
          if (this.changeItem.scene == 'FACE_CHECK') {
              data.idcard = this.changeItem.idcard;
              data.address = this.changeItem.address;
          }
          this.onSaveLoading = true;
          this.commonFunSave(JSON.stringify(data))
      },

      // 编辑common
      commonFunSave(data, type) {
          let dat = data ? JSON.parse(data) : '';
          this.verifySave({
            identityCheckId: this.changeItem.identityCheckId,
            data: dat,
            action: type ? type : '',
            onsuccess: (body, headers) => {
              this.onSaveLoading = false;
              this.onSubmitInLoading = false;
              this.onSubmitOutLoading = false;
              this.visiblesyncTure = false;
              this.getList();
            },
            onfail: body => {
              this.onSaveLoading = false;
              this.onSubmitInLoading = false;
              this.onSubmitOutLoading = false;
            },
            onerror: body => {
              this.onSaveLoading = false;
              this.onSubmitInLoading = false;
              this.onSubmitOutLoading = false;
            }
          })
      },

      // 过滤房间号
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          this.$nextTick(() => {
            this.loading = false;
            this.options = this.rooms.filter(item => {
              return item.value.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
            });
          })
        } else {
          this.options = [];
        }
      },

      selectBlur(val) {
        if (this.options.length == 0) {
          this.changeItem.roomNo = val.target.value;
        }
        console.log(3333, this.changeItem.roomNo, val, val.target.value);
      },

      // 获取房间号
      getRooms() {
        this.getRoomList({
          page: 1,
          size: 500,
          hotel_id: this.$route.params.hotelid,
          onsuccess: (body, headers) => {
            this.rooms = body.data.map(item => {
              return { value: `${ item.room_num }` };
            });
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
      // 搜索
      saarchList() {
        this.page = 1;
        this.getList();
      },
      getList() {
        let data = {
          keyword: this.searchVal,
          roomNo: this.searchVal_,
        };
        if (this.identityStatus != 'ALL') {
            data.identityStatus = this.identityStatus
        }
        this.getVerifyList({
          data: data,
          hotelId: this.$route.params.hotelid,
          page: this.page.toString(),
          size: this.size.toString(),
          onsuccess: (body, headers) => {
            // headers.get('x-current-page') ? this.page = +headers.get('x-current-page') : null;
            // headers.get('x-total') ? this.total = +headers.get('x-total') : null;

            headers['x-current-page'] ? this.page = +headers['x-current-page'] : null;
            headers['x-total'] ? this.total = +headers['x-total'] : null;

            this.list = body.data;
          }
        })
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style lang="less">
  .module-wrapper {
    /*position: relative;*/
    /*overflow-y: auto;*/
    h3 {
      font-size: 16px;
      color: #4A4A4A;
      padding: 0 2rem 1.5rem 2rem;
      &:nth-child(1) {
        line-height: 3rem;
        padding-bottom: 0;
        /*border-bottom: 1px solid #ECECEC;*/
        font-size: 16px;
        color: #4A4A4A;
      }
    }
    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 23px 15px 25px;
      box-sizing: border-box;
      .content-item {
        display: inline-flex;
        width: 30%;
        align-items: center;
        .el-select {
          margin-left: 15px;
          .el-input {
            width: 100%;
          }
        }
      }
      .el-input {
        width: 30%;
        margin-right: 17px;
      }
      .el-button {
        background-color: #39C240;
        min-width: 173px;
        line-height: 18px;
        font-size: 14px;
        border-radius: 0;
      }
    }

    .content_table {
      padding: 0 23px 0 25px;
      overflow-y: auto;
    }
  }
</style>

