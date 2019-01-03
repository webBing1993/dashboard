<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>交易单号</th>
        <th>酒店名称</th>
        <th>金额</th>
        <th>业务类型</th>
        <th>时间</th>
        <th>开票状态</th>
        <th>付费方</th>
        <th>支付方式</th>
        <th>备注</th>
        <th>操作人</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>201898778903</td>
        <td>+800.00</td>
        <td>充值</td>
        <td>2018-12-21 10:23:13</td>
        <td>FT201FDKKKN</td>
        <td>实际号码</td>
        <td>企业网银</td>
        <td>备注1</td>
        <td>张三</td>
        <td>张三</td>
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

  table tr:nth-child(odd) {
    background: #FAFAFA;
  }

  .v-table tr {
    &:hover {
      background-color: #E1E1E1;
    }
  }

  .v-table th {
    padding-left: 10px;
    font-size: 14px;
    color: #3e3e3e;
    background-color: #9B9B9B;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table td {
    padding-left: 10px;
    color: #757575;
    font-size: 12px;
    word-break: keep-all;
    white-space: nowrap;
    line-height: 44px;
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
    color: #39C240;
    padding-left: 10px;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
  }
</style>

