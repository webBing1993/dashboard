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
        <td>{{ obj.report_channel}}</td>
        <td>{{ obj.auto_report==1?'是':'否' }}</td>
        <td>{{ obj.enabled_report==1?'是':'否'}}</td>
        <td>{{ obj.device_id}}</td>
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
            }
        },
        filters: {
            arr: function (val) {
                if (val) {
                    return val.join(',')
                }
            },
            // filChannel:function (val) {
            //     this.list2.forEach(obj=>{
            //         if(val==obj.lvye_report_type){
            //             return obj.lvye_report_type_name;
            //         }
            //     })
            // },
            // filDevice:function (val){
            //     this.list3.forEach(obj=>{
            //         if(val==obj.device_id){
            //             return obj.device_name;
            //         }
            //     })
            // }
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

