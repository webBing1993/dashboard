<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>序号</th>
        <th>门店子编码</th>
        <th>门店名称</th>
        <th>企业名称</th>
        <th>门店类型</th>
        <th>品牌</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) in list" v-bind:key="index">
        <td>{{ ++index + (page - 1) * size }}</td>
        <td>{{ obj.assemble_code }}</td>
        <td class="pointer" @click="detail(obj)">{{ obj.name }}</td>
        <td class="pointer" @click="belongGroup(obj)">{{ obj.group_name }}</td>
        <td class="pointer">{{obj.type==='UNION'?'联体酒店':'普通酒店'}}</td>
        <td>{{ obj.brand_name }}</td>
        <td class="pointer-icon">
          <span
            :class="{'circle-red': obj.status == 1, 'circle-green': obj.status == 2, 'circle-yellow': obj.status == 3,'circle-gray': obj.status == 4}"></span>
          {{ obj.status | status }}
        </td>
        <td>
          <a class="v-options pointer" @click="edit(obj)">编辑</a>
          <a class="v-options pointer" @click="config(obj)">配置</a>
          <a class="v-options pointer" @click="device(obj)">设备</a>
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
      status(v) {
        if (v === "1") return "未上线";
        if (v === "2") return "运行中";
        if (v === "3") return "已下线";
        if (v === "4") return "已暂停";
      }
    },
    methods: {
      edit(obj) {
        this.$emit('edit', obj);
      },
      config(obj) {
        this.$emit('config', obj);
      },
      device(obj) {
        this.$emit('device', obj);
      },
      source(obj) {
        this.$emit('source', obj);
      },
      log(obj) {
        this.$emit('log', obj);
      },
      detail(obj) {
        this.$emit('detail', obj);
      },
      belongGroup(obj) {
        this.$emit('group', obj);
      }
    }
  }
</script>
<style scoped lang="less">
  .v-table {
    clear: both;
    /*padding: 0 23px 30px 25px;*/
    position: relative;
    margin-bottom: 16px;
  }

  .v-table table {
    margin: 0;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    position: absolute;
  }

  .v-table td,
  .v-table th {
    height: 38px;
    text-align: center;
  }

  .v-table th {
    padding-left: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #ffffff;
    background-color: #9B9B9B;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table tr {
    &:hover {
      background-color: #E1E1E1;
    }
  }

  table tr:nth-child(odd) {
    background: #FAFAFA;
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
    padding-left: 1px;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
    color: #39C240 !important;
  }

  .circle-green, .circle-red, .circle-yellow, .circle-gray {
    position: relative;
    top: 1px;
    left: -4px;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .circle-green {
    border: 1px solid #39C240;
    background-color: #39C240;
  }

  .circle-red {
    border: 1px solid #D0011B;
    background-color: #D0011B;
  }

  .circle-yellow {
    border: 1px solid #F6A623;
    background-color: #F6A623;
  }

  .circle-gray {
    border: 1px solid #4A4A4A;
    background-color: #4A4A4A;
  }
</style>

