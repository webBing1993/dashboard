<template>
  <div>
    <div class="module-wrapper">
        <div class="info-content">
            <div class="content-item">
                <div class="item">
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
            </div>
            <div v-show="status === 1">
              <div>上线阻碍:</div>
              <div class="item-tag">
                  <div class="tag-input">
                      <div v-for="(obj, index) of memo">
                          <el-input class="el-right" v-model="memo[index]" placeholder="请填写上线阻碍内容或JIRA链接"></el-input>
                          <button v-show="memo.length > 1" @click="subtractMemo(index)">---</button>
                      </div>
                      <div class="tag-btn">
                          <button style="border-color: #39C240; color: #39C240" @click="addMemo">+</button>
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
        status: 1,
        statusList: [
            {
                id: 1,
                name: '未上线'
            },{
                id: 2,
                name: '已上线'
            },{
                id: 3,
                name: '已下线'
            },{
                id: 4,
                name: '阻碍中'
            }
        ],
        memo: ['']
      }
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
            this.status = body.status;
            this.memo = body.memo;
          }
        })
      },
      modify() {
        this.modifyStatus({
          hotel_id: this.$route.params.hotelid,
          status: this.status,
          memo: this.memo,
          onsuccess: body => {

          }
        })
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="less">
    .info-content {
        //   display: flex;
          font-size: 14px;
          padding: 24px 15px 19px 21px;
        .content-item {
            flex: 1px;
            &:nth-child(1) {
              flex: 1.2;
              margin-right: 28px;
            }
            .item {
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
                width: 80%;
                outline: none;
                .el-input {
                  width: 100%;
                }
              }
            }
        }
        .item-tag {
              display: flex;
              align-items: flex-start;
              padding-left: 20px;
              span {
                width: 60px;
                text-align: end;
                line-height: 40px;
              }
              .tag-input {
                position: relative;
                margin-left: 16px;
                width: 70%;
                .el-input {
                  width: 100%;
                  margin: 0 0 12px 0;
                }
                .tag-btn {
                  position: absolute;
                  bottom: 20px;
                  right: -62px;
                  button {
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
    }

</style>
