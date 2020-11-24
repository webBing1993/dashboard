<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>姓名</th>
        <th>证件号</th>
        <th>证件地址</th>
        <th>房间号</th>
        <th>入离时间</th>
        <th>核验类型</th>
        <th>入住上传状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list">
        <td class="v-item">{{ obj.name }}</td>
        <td class="v-item">{{ obj.idcard }}</td>
        <td class="pointer">
          <el-tooltip class="item" effect="dark" :content="obj.address" placement="right">
            <el-button>{{ obj.address.substring(0, 6) }}</el-button>
          </el-tooltip>
        </td>
        <td class="v-item">{{ obj.roomNo ? obj.roomNo : '-' }}</td>
        <td class="v-item">{{ datetimeparse(obj.inTime, 'MM/dd') }} - {{ datetimeparse(obj.outTime, 'MM/dd') }}</td>
        <td class="v-item">{{ obj.scene == 'FACE_CHECK' ? '刷证核验' : '无证核验' }}</td>
        <td class="v-item">{{ obj.reportInStatus == 'NONE' ? '未上传' : obj.reportInStatus == 'FAILED' ? '上传失败' : obj.reportInStatus == 'CHANGING' ? '换房中' : obj.reportInStatus == 'PENDING' ? '上传中' : obj.reportInStatus == 'SUCCESS' ? '上传成功' : '不上传' }}</td>
        <td class="lastTd">
          <a class="v-options pointer" @click="edit(obj)">编辑</a>
          <a class="v-options options_red pointer" v-if="obj.reportInStatus == 'NONE' || obj.reportInStatus == 'FAILED' || obj.reportInStatus == 'CHANGING' || obj.reportInStatus == 'PENDING'" @click="reject(obj)">拒绝</a>
          <a class="v-options options_blue pointer" v-if="obj.roomNo && (obj.reportInStatus == 'NONE' || obj.reportInStatus == 'FAILED')" @click="reportbtn(obj)">入住上传</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      page: {
        type: Number,
        default: 1
      },
      size: {
        type: Number,
        default: 10
      }
    },
    methods: {
      detail(obj) {
        this.$emit('detail', obj);
      },
      edit(obj) {
        this.$emit('edit', obj);
      },
      reject(obj) {
        this.$emit('reject', obj);
      },
      reportbtn(obj) {
        this.$emit('reportbtn', obj);
      },
    }
  }
</script>
<style scoped lang="less">
  .v-table {
    clear: both;
    padding: 0 0 30px 0;
  }

  .v-table table {
    margin: 0;
    width: 100%;
    border-spacing: 0;
  }

  .v-table td,
  .v-table th {
    height: 38px;
    text-align: center;
  }

  .v-table tr {
    &:hover {
      background-color: #E1E1E1;
    }
  }

  .v-table th {
    padding-left: 10px;
    font-weight: 300;
    color: #ffffff;
    background-color: #9B9B9B;
    font-size: 14px;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table td {
    padding-left: 10px;
    color: #3CC51F;
    font-size: 12px;
    /*border-bottom: solid 1px #e0e0e0;*/
    word-break: keep-all;
    white-space: nowrap;
    line-height: 44px;
  }

  table tr:nth-child(odd) {
    background: #FAFAFA;
  }

  .v-table td a {
    font-size: 12px;
  }

  .v-table .checkbox {
    width: 14px;
    height: 14px;
    margin-left: 15px;
    z-index: 0;
    position: relative;
  }

  .v-table td > label {
    height: 31px;
  }

  .v-table td > label > span {
    margin-left: 10px;
  }

  .v-options {
    /*color: #39C240;*/
    padding-left: 10px;
  }

  .options_red {
    color: #f56c6c;
  }

  .options_blue {
    color: #409eff;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
    .el-button {
      border: none;
      outline: none;
      background-color: transparent;
    }
  }

  .v-item {
    color: #757575 !important;
  }
  .lastTd {
    text-align: left !important;
  }

</style>

