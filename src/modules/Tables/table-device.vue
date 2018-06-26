<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>序号</th>
        <th>设备类型</th>
        <th>设备名称</th>
        <th>设备ID</th>
        <th>状态</th>
        <th>配对</th>
        <th>操作</th>
        <th>升级</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list" v-bind:key="index">
        <td>{{ ++index + (page - 1) * size }}</td>
        <td>{{ obj.type | deviceType }}</td>
        <td>{{ obj.name }}</td>
        <td>{{ obj.id }}</td>
        <td><span
          :class="{'circle-green': obj.enabled == 1, 'circle-red': obj.enabled == 0}"></span>{{ obj.enabled | status }}
        </td>
        <td>{{ obj.partner_name }}</td>
        <td>
          <a class="v-options pointer" @click="edit(obj)">编辑</a>
        </td>
        <td>
          <a class="v-options pointer" @click="update_aly(obj)">升级到阿里云</a>
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
      deviceType(v) {
//        if (v === "31") return "底座";
//        if (v === "32") return "pad";
//        if (v === "51") return "发票插件";
//        if (v === "41") return "广告机";
        if (v === "31") return "底座";
        if (v === "21") return "人证核验机";
        if (v === "32") return "pad";
        if (v === "51") return "发票插件";
        if (v === "41") return "广告机";
        if (v === "22") return "发卡机";
      },
      status(v) {
        if (v === 1) return "可用";
        if (v === 0) return "禁用";
      }
    },
    methods: {
      edit(obj) {
        this.$emit('edit', obj);
      },
      update_aly(obj) {
        this.$emit('update_aly', obj);
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
    font-weight: normal;
    color: #ffffff;
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

  .circle-green, .circle-red {
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
</style>

