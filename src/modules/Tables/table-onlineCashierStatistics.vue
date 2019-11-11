<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>序号</th>
        <th>交易时间</th>
        <th>酒店名称</th>
        <th>交易类型</th>
        <th>订单号</th>
        <th>订单金额</th>
        <th>交易状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list">
        <td>{{ ++index + (page - 1) * size }}</td>
        <td>{{ obj.tradeTime | dataFormat }}</td>
        <td>{{ obj.hotelId }}</td>
        <td>{{ obj.tradeType | tradeTypeFilter }}</td>
        <td>{{ obj.orderId }}</td>
        <td>{{ obj.tradeFee }}</td>
        <td>{{ obj.tradeStatus | tradeStatusFilter}}</td>
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
    },
    filters: {
      dataFormat(msg) {
        var date = new Date(msg);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate() + '';
        return Y+M+D;
      },
      tradeTypeFilter(msg){
        let result='';
        switch(msg){
          case 'WEIXINPAY':   result='微信支付'; break;
          case 'ALIPAY':      result='支付宝支付'; break;
          case 'WX_PREPAY':   result='微信预授权'; break;
          case 'ALI_PREPAY':  result='支付宝预授权'; break;
          default:
            result=msg;
          return result;
        }
      },
      tradeStatusFilter(msg){
        let result='';
        switch(msg){
          case 'NORMAL':   result='正常'; break;                          //    NORMAL,正常
          case 'PAYING':      result='支付中'; break;                     //    PAYING,支付中
          case 'AUTH_FAILED':   result='授权失败'; break;                 //   AUTH_FAILED,授权失败
          case 'AUTH_SUCCESS':  result='授权成功'; break;                 //    AUTH_SUCCESS,授权成功
          case 'PAY_FAILED':   result=' 支付失败'; break;                 //    PAY_FAILED,支付失败
          case 'PAY_SUCCESS':      result='支付成功'; break;              //    PAY_SUCCESS,支付成功
          case 'DEPOSIT_CONSUME_FAILED':   result='押金消费失败'; break;  //    DEPOSIT_CONSUME_FAILED,押金消费失败
          case 'DEPOSIT_CONSUME_SUCCESS':  result='押金消费成功'; break;  //    DEPOSIT_CONSUME_SUCCESS,押金消费成功
          case 'UNFREEZE_FAILED':   result='解冻失败'; break;             //    UNFREEZE_FAILED,解冻失败
          case 'AUTH_CANCEL_FAILED':      result=',授权撤销失败'; break;  //    AUTH_CANCEL_FAILED,授权撤销失败
          case 'AUTH_CANCEL_SUCCESS':   result='授权撤销成功'; break;     //    AUTH_CANCEL_SUCCESS,授权撤销成功
          case 'DEPOSIT_REFUND_FAILED':  result='押金退款失败'; break;    //    DEPOSIT_REFUND_FAILED,押金退款失败
          case 'DEPOSIT_REFUND_SUCCESS':   result='押金退款成功'; break;  //    DEPOSIT_REFUND_SUCCESS,押金退款成功
          case 'REFUND_FAILED':      result='退款失败'; break;             //   REFUND_FAILED,退款失败
          case 'REFUND_SUCCESS':   result='退款成功'; break;               //   REFUND_SUCCESS,退款成功
          case ' FAILED':  result='失败'; break;                           //   FAILED，失败
          default:
            result=msg;
            return result;
        }
      }

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

