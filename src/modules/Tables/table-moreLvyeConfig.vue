<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>ID</th>
        <th>旅业名称</th>
        <th>上传通道</th>
        <th>是否自动上传配置</th>
        <th>是否开启</th>
        <th>底座设备</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) in list">
        <td>{{ ++index + (page - 1) * size }}</td>
        <td>{{ obj.name }}</td>
        <td>{{ obj.report_channel|filterReportChannel}}</td>
        <td>{{ obj.auto_report==1?'是':'否' }}</td>
        <td>{{ obj.enabled_report==1?'是':'否'}}</td>
        <td>{{ obj.device_name}}</td>
        <td>
          <span class="v-options pointer" @click="edit(obj)">编辑</span>
          <span class="v-options pointer" @click="del(obj)">删除</span>
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
            },
            filterDeskList:{
                type: Array,
                default: []
            }
        },
        filters: {
            // filterDeskName: function (val,param) {
                // return 55
                // if (param && val){
                    // for (let item=0;item<param.length;item++){
                    // if(item.device_id==val){
                    //     console.log('33')
                    //         // return 66
                    //     }
                    // }
                    // param.forEach(item=>{
                    //     if(item.device_id==val){
                    //         console.log('33')
                    //         return item.device_name
                    //         // return item.device_name;
                    //     }
                    // })
                // }
            // },
            filterReportChannel:function (val) {
                switch (val){
                    case "LOCAL":
                        return "深圳";
                    case "SUZHOU":
                        return "苏州";
                    case "ZHUHAI":
                        return "珠海";
                    case "CLOUD":
                        return "微信通道";
                    case "NONE":
                        return "无";
                    case "WUHAN":
                        return "武汉";
                    case "CHENGDU":
                        return "成都";
                    case "GUANGDONG":
                        return "广东";
                    case "HEFEI":
                        return "合肥";
                    case "HANGZHOU":
                        return "杭州";
                    case "GUANGDONGOLD":
                        return "广东旧";
                }
            }
        },
        methods: {
            edit(obj) {
                this.$emit('edit', obj);
            },
            del(obj) {
                this.$emit('del', obj);
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
    padding-left: 10px;
  }

  .v-options:first-child {
    color: #39C240;
  }
  .v-options:nth-child(2) {
    color: #c20b1a;
  }
  .pointer {
    cursor: pointer;
  }
</style>

