<template>
  <div>
    <div class="module-wrapper">
      <div class="content_onlineStatus">
        <div class="content-item">
          <span>上线状态</span>
          <el-select class="el-right" v-model="status" placeholder="请选择上线状态">
            <el-option
              v-for="(obj, index) of statusList"
              :key="obj.id"
              :label="obj.name"
              :value="obj.id">
            </el-option>
          </el-select>
        </div>
        <div>上线阻碍:</div>
        <div class="item-label">
          <div class="label-input">
            <div class="label-input_items" v-for="(obj, index) of blockContents">
              <el-input class="el-right" v-model="blockContents[index]" placeholder="请填写上线阻碍内容或JIRA链接"></el-input>
              <button class="tag-minus" v-if="(index+1) < blockContents.length" @click="subtractBlockContents(index)">
                -
              </button>
              <button class="tag-add" v-if="(index+1) === blockContents.length"
                      style="border-color: #39C240; color: #39C240" @click="addBlockContents">+
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OnlineStatus',
    data() {
      return {
        status: 1,
        statusList: [
          {
            id: 1,
            name: '上线'
          }, {
            id: 2,
            name: '下线'
          }, {
            id: 3,
            name: '阻碍中'
          }
        ],
        blockContents: ['']
      }
    },
    methods: {
      subtractBlockContents(index) {
        if (this.blockContents.length == 1) return;
        this.blockContents.splice(index, 1);
      },
      addBlockContents() {
        this.blockContents.push('');
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  .content_onlineStatus {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 24px 15px 19px 21px;
    .content-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      span {
        width: 60px;
        display: block;
        margin-right: 20px;
      }
      .el-select, .el-input {
        width: 70%;
        outline: none;
        .el-input {
          width: 100%;
        }
      }
    }
    .item-label {
      display: flex;
      align-items: flex-start;
      margin-left: 78px;
      margin-top: -20px;
      .label-input {
        position: relative;
        width: 78%;
        .label-input_items {
          position: relative;
          .el-input {
            width: 100%;
            margin: 0 0 12px 0;
          }
          .tag-minus {
            position: absolute;
            top: 10px;
            right: -38px;
            border-radius: 50px;
            outline: none;
            border: solid 1px #F43530;
            color: #F43530;
            margin-left: 5px;
            padding-bottom: 2px;
            background-color: #ffffff;
            height: 20px;
            width: 20px;
          }
        }
        .tag-add {
          position: absolute;
          bottom: 20px;
          right: -38px;
          border-radius: 50px;
          outline: none;
          border: solid 1px;
          margin-left: 5px;
          padding-bottom: 2px;
          background-color: #ffffff;
          height: 20px;
          width: 20px;
        }
      }
    }
  }

</style>
