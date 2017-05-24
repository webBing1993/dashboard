<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>序号</th>
        <th>门店子账户编码</th>
        <th>门店名称</th>
        <th>所属企业品牌</th>
        <th>状态</th>
        <!--<th>已选服务器</th>-->
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list">
        <td>{{ ++index }}</td>
        <td>{{ obj.code }}</td>
        <td class="pointer" @click="detail(obj)">{{ obj.name }}</td>
        <td class="pointer" @click="belongGroup(obj)">{{ obj.brand_name }}</td>
        <td>{{ obj.status | status }}</td>
        <!--<td>{{ obj.services }}</td>-->
        <td>
          <a class="v-options pointer" @click="config(obj)">配置</a>
          <!--<a class="v-options pointer" @click="service(obj)">服务</a>
          <a class="v-options pointer" @click="device(obj)">设备</a>
          <a class="v-options pointer" @click="source(obj)">数据</a>-->
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
    },
    filters: {
      status(v) {
        if (v === "1") return "未上线";
        if (v === "1") return "运行中";
        if (v === "1") return "已下线";
        if (v === "1") return "已暂停";
      }
    },
    methods: {
      config(obj) {
        this.$emit('config', obj);
      },
      service(obj) {
        this.$emit('service', obj);
      },
      device(obj) {
        this.$emit('device', obj);
      },
      source(obj) {
        this.$emit('source', obj);
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
    text-align: left;
  }

  .v-table th {
    padding-left: 10px;
    font-size: 12px;
    color: #3e3e3e;
    background-color: #F7F7F7;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table tr {
    &:hover {
      background-color: #E1E1E1;
    }
  }

  .v-table td {
    padding-left: 10px;
    color: #757575;
    font-size: 12px;
    border-bottom: solid 1px #e0e0e0;
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
    color: #2254FB;
    padding-left: 10px;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
  }
</style>

