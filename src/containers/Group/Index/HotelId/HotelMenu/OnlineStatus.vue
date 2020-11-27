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
        <div v-show="status === '4'">
          <div id="content_title">上线阻碍:</div>
          <div class="item-label">
            <div class="label-input">
              <div class="label-input_items" v-for="(obj, index) in memo">
                <el-input class="el-right" v-model="memo[index]" placeholder="请填写上线阻碍内容或JIRA链接"></el-input>
                <button class="tag-minus" v-if="(index+1) < memo.length " @click="subtractMemo(index)">-</button>
                <button class="tag-add" v-if="(index+1) === memo.length"
                        @click="addMemo">+
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="button-box">
          <el-button class="el-btn" type="success" @click.native="modify">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tool from '@/assets/tools/tool.js';

  export default {
    name: 'OnlineStatus',
    data() {
      return {
        status: '',
        statusList: [
          {
            id: '1',
            name: '未上线'
          }, {
            id: '2',
            name: '已上线'
          }, {
            id: '3',
            name: '已下线'
          }, {
            id: '4',
            name: '阻碍中'
          }
        ],
        memo: ['']
      }
    },
    computed: {
      memoList() {
        return this.memo.filter(v => v != '');
      },
    },
    methods: {
      ...mapActions([
        'getStatus',
        'modifyStatus'
      ]),
      subtractMemo(index) {
        if (this.memo.length == 1) return;
        this.memo.splice(index, 1);
      },
      addMemo() {
        this.memo.push('');
      },
      getDetail() {
        this.getStatus({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
            this.status = body.data.status;
            if (tool.isNotBlank(body.data.memo)) {
              this.memo = body.data.memo.length > 0 ? [...body.data.memo] : [''];
            }
          }
        })
      },
      modify() {
        this.modifyStatus({
          hotel_id: this.$route.params.hotelid,
          status: this.status,
          memo: this.memoList,
          onsuccess: body => {

          }
        })
      }
    },
    mounted() {
      this.getDetail();
    }
  }
</script>

<style scoped lang="less">
  .content_onlineStatus {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 44px 15px 19px 21px;
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
        width: 80%;
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
          border: solid 1px #39C240;
          margin-left: 5px;
          padding-bottom: 2px;
          background-color: #ffffff;
          height: 20px;
          width: 20px;
          color: #39C240
        }

      }
    }
    .button-box {
      text-align: center;
      .el-button {
        width: 246px;
        background-color: #39C240;
        border-color: #39C240;
        border-radius: 0;
        margin-top: 45px;
        span {
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }

</style>
