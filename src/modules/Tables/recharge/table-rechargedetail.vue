<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>时间</th>
        <th>金额</th>
        <th>支付人</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of rechargeList">
        <td class="v-item">{{obj.recharge_time}}</td>
        <td class="v-item">{{parseInt(obj.pay_fee)/100 }} 元</td>
        <!--<td class="v-item pay_way">{{obj.pay_user}}</td>-->
        <td class="v-item pay_way">{{obj.pay_user?obj.pay_user:'空'}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ischecked: true,
        unchecked: false
      }
    },
    props: {
      rechargeList: {
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
    line-height: 38px;
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

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
  }

  .v-item {
    color: #757575 !important;
  }
  .pay_way{
    color: #3CC51F!important;
  }
</style>

