<template>
  <div>
    <div class="module-wrapper">
      <div class="content-item">
        <span>游离设备</span>
        <el-select class="el-right" v-model="deviceType" placeholder="请选择设备">
          <el-option
            v-for="(obj, index) of deviceTypeList"
            :key="obj.id"
            :label="obj.name"
            :value="obj.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-btn">
        <el-button @click.native="cancel">取消</el-button>
        <el-button @click.native="submit">添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  export default {
    name: 'RelationDevice',
    data() {
      return {
        deviceType: '',
        deviceTypeList: [{id: '31', name: '底座'}, {id: '32', name: '魔镜'}, {id: '51', name: '发票插件'}]
      }
    },
    methods: {
      ...mapActions([
        'goto'
      ]),
      cancel() {

      },
      submit() {

      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="less">
  .module-wrapper {
    padding: 26px 45px;
    .content-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #4A4A4A;
      margin-bottom: 14px;
      span {
        min-width: 68px;
        text-align: end;
      }
      .el-switch {
        margin-left: 24px;
      }
      .el-right {
        margin-left: 20px;
        padding: 4px;
        width: 80%;
      }
    }
    .content-btn {
      width: 100%;
      margin-top: 53px;
      text-align: center;
      .el-button {
        width: 173px;
        line-height: 18px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        color: #ffffff;
        &:nth-child(1) {
          background-color: #D0011B;
          border-color: #D0011B;
        }
      }
    }
  }
</style>
