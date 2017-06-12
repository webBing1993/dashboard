<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>序号</th>
        <th>品牌代码</th>
        <th>品牌名称</th>
        <th>品牌LOGO</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list">
        <td>{{ ++index }}</td>
        <td>{{ obj.id }}</td>
        <td>{{ obj.name }}</td>
        <td>{{ obj.logo_url ? '已上传' : '未上传' }}</td>
        <td>
          <a class="v-options pointer" @click="edit(obj)">编辑</a>
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
    methods: {
      edit(obj) {
        this.$emit('edit', obj);
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
    th {
      background-color: #9B9B9B;
      color: #ffffff;
      font-weight: normal;
      font-size: 14px;
    }
  }

  table tr:nth-child(odd) {
    background: #FAFAFA;
  }

  .v-table td,
  .v-table th {
    height: 38px;
    text-align: center;
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

  .v-table td {
    padding-left: 10px;
    color: #757575;
    font-size: 12px;
    word-break: keep-all;
    white-space: nowrap;
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

