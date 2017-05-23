<template>
  <div class="v-table">
    <table border="0">
      <thead>
      <tr>
        <th>序号</th>
        <th>企业账户编码</th>
        <th>企业名称</th>
        <th>门店</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list">
        <td>{{ ++index }}</td>
        <td>{{ obj.id }}</td>
        <td class="pointer" @click="detail(obj)">{{ obj.name }}</td>
        <td class="pointer" @click="hotel(obj)">{{ obj.hotelNum }}家</td>
        <td>
          <a class="v-options pointer" @click="edit(obj)">编辑</a>
          <a class="v-options pointer" @click="config(obj)">配置</a>
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
      detail(obj) {
        this.$emit('detail', obj);
      },
      hotel(obj) {
        this.$emit('hotel', obj);
      },
      edit(obj) {
        this.$emit('edit', obj);
      },
      config(obj) {
        this.$emit('config', obj);
      },
    }
  }
</script>
<style scoped>
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
    padding-left: 16px;
    font-size: 14px;
    color: #8d8d8d;
    background-color: #f6f8f9;
    word-break: keep-all;
    white-space: nowrap;
    cursor: default;
  }

  .v-table td {
    font-size: 12px;
    border-bottom: 1px solid #e7e7eb;
    word-break: keep-all;
    font-weight: 400;
    color: #8d8d8d;
    text-align: left;
    line-height: 40px;
    padding: 6px 20px;
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
    color: #41BCA0;
    padding-left: 10px;
  }

  .v-options:first-child {
    padding-left: 0;
  }

  .pointer {
    cursor: pointer;
  }
</style>

