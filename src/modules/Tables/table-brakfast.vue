<template>
  <div class="v-table">
    <table border="1">
      <thead>
      <tr>
        <th>PMS报价码</th>
        <th>券数量</th>
        <th>描述</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(obj, index) of list">
        <td><input type="text" placeholder="请输入" v-model="obj.code"> </td>
        <td><input  type="text" @keyup="obj.breakfast=obj.breakfast.replace(/[^\d]/g,'')"  placeholder="请输入（只能输数字）"   v-model="obj.breakfast"></td>
        <td><input type="text" placeholder="请输入" v-model="obj.description"></td>
        <td>
          <a class="v-options pointer" @click="edit(obj,index)" v-if="index==0">添加</a>
          <a class="v-options pointer" style="color:#D0011B" @click="config(obj,index)" v-else>删除</a>
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
    methods: {
      edit(obj,index) {
        this.$emit('addBreakfast', obj,index);
      },
      config(obj,index) {
        this.$emit('delBreakfast', obj,index);
      }
    }
  }
</script>
<style scoped lang="less">
  .v-table {
    clear: both;
    padding: 0 0 30px 0;
    width:85%;
  }

  .v-table table {
    margin: 0;
    width: 100%;
    border-spacing: 0;
    border-color: #d8d8d8;
  }

  .v-table td,
  .v-table th {
    height: 38px;
    text-align: center;
    width:20%;
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
    color: #757575;
    font-size: 12px;
    word-break: keep-all;
    white-space: nowrap;
    line-height: 44px;
    input{
      border:none;
      width:100%;
      height:100%;
      padding-left:10px;
      box-sizing: border-box;

    }
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


