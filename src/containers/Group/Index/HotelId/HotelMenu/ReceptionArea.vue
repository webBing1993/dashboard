<!--接待区页-->
<template>
  <div>
    <div class="module-wrapper">
      <div class="content_reception">
        <div class="top">接待区
          <el-button type="success" @click.native="addReception" class="button">添 加</el-button>
        </div>
        <table-receptionArea :list="list" :page="page" :size="size" @edit="goEdit" @del="goDel"></table-receptionArea>
        <el-dialog title="添加／编辑 接待区"
                   :visible.sync="showAddContent"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="true"
                   width=""
                   @close="handleClose"
                   center>
          <div class="rec">
            <div class="item-form item_blow">基本信息</div>
            <div class="item-form">
              <span class="itemTitle">名称</span>
              <el-input v-model="name" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="item-form">
              <span class="itemTitle">电话</span>
              <el-input v-model="tel" placeholder="请输入内容" class="input"></el-input>
            </div>
            <div class="item-form">
              <span class="itemTitle">地址</span>
              <el-input v-model="address" placeholder="请输入内容" class="input"></el-input>
            </div>
          </div>
          <div class="rec">
            <div class="item-form item_blow">配置</div>
            <div class="item-form">
              <span class="itemTitle">关联房型</span>
              <div class="recCheckbox">
                <el-checkbox-group v-model="roomType">
                  <el-checkbox v-for="room in roomTypeList" :key="room.pms_id" :label="room.name"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="departLine"></div>
            <div class="item-form">
              <span class="itemTitle">选择设备</span>
              <div class="recCheckbox">
                <el-checkbox-group v-model=deviceType>
                  <el-checkbox v-for="device in deviceTypeList" :key="device.device_id" :label="device.device_id">
                    {{device.device_name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showAddContent=false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

    export default {
        name: 'receptionArea',
        data () {
            return {
                AreaId: "",
                list: [],
                showDialog: false,
                page: 1,
                size: 20,
                total: 0,
                showAddContent: false,
                id: '',
                name: '',
                address: '',
                tel: '',
                roomType: [],
                roomTypeList: [],
                deviceTypeList: [],
                deviceType: [],
                deviceIdlist: [],
            }
        },
        computed: {
            groupId () {
                return this.$route.params.id
            },
            hotelId () {
                return this.$route.params.hotelid
            }
        },
        methods: {
            ...mapActions ([
                'getRecpetion',//查接待区列表
                'saveRecpetion',//保存接待区
                'searchRoomType',//查房型
                'delRecpetion',//删除接待区
                'searchDevice',//查设备
                'goto',
                'showtoast'
            ]),
            //获取接待区列表
            getList () {
                this.getRecpetion ({
                    hotel_id: this.$route.params.hotelid,
                    onsuccess: body => {
                        this.list = body.data;
                        console.log ('现在的接待区列表：', body.data)
                    }
                })
            },
            //保存/修改接待区
            save () {
                this.deviceIdlist = [];
                this.saveRecpetion ({
                    hotel_id: this.$route.params.hotelid,
                    data:{
                        id: this.id,
                        name: this.name,
                        tel: this.tel,
                        address: this.address,
                        room_type: this.roomType,
                        device_ids: this.deviceType,
                    },
                    onsuccess: body => {
                        this.showtoast ({
                            text: '保存成功',
                            type: 'success'
                        })
                        this.handleClose ();
                        this.getList ();
                    }
                });
            },
            //删除接待区
            goDel (obj) {
                this.delRecpetion ({
                    area_id: obj.id,
                    onsuccess: body => {
                        this.showtoast ({
                            text: '删除成功',
                            type: 'success'
                        })
                        this.handleClose ();
                        this.getList ();
                    }
                })
            },
            //添加接待区
            addReception () {
                this.showAddContent = true;
                this.reset ();
                this.searchRoomType ({
                    hotel_id: this.$route.params.hotelid,
                    // areaId: "",
                    onsuccess: body => {
                        this.roomTypeList = body.data;
                        console.log ('罗列房型：' + JSON.stringify (this.roomTypeList))
                    }
                });
                this.searchDevice ({
                    hotel_id: this.$route.params.hotelid,
                    // areaId: "",
                    onsuccess: body => {
                        this.deviceTypeList = body.data;
                        console.log ('罗列设备：' + JSON.stringify (this.deviceTypeList))
                    }
                });
            },
            //编辑接待区
            goEdit (obj) {
                this.showAddContent = true;
                this.searchRoomType ({
                    hotel_id: this.$route.params.hotelid,
                    // areaId: obj.id,
                    onsuccess: body => {
                        //先查所有房型列表，再赋值已选房型，方便查房型的pmsId,pmsId用于监听联动查房间号
                        this.roomTypeList = body.data;
                    }
                });
                this.searchDevice ({
                    hotel_id: this.$route.params.hotelid,
                    // areaId: obj.id,
                    onsuccess: body => {
                        this.deviceTypeList = body.data;
                        console.log(' 罗列所有设备：' + JSON.stringify(this.deviceTypeList))
                        // this.deviceTypeList.forEach ((item) => {
                        //     obj.device_ids.forEach ((deviceId) => {
                        //         if (deviceId === item.device_id) {
                        //             this.deviceType.push (deviceId);
                        //         }
                        //     })
                        // })
                        this.deviceType=obj.device_ids;
                    }
                });
                this.id = obj.id;
                this.name = obj.name;
                this.tel = obj.tel;
                this.address = obj.address;
                this.roomType=obj.room_type
            },
            reset () {
                this.name = "";
                this.tel = "";
                this.address = "";
                this.roomType = [];
                this.lvyeVal = '';
                this.deviceType = [];
                this.id = '';
            },
            handleClose () {
                this.showAddContent = false;

            },
        },
        mounted () {
            this.getList ();
        }
    }
</script>
<style lang="less">
  .module-wrapper {
    /*padding: 1rem;*/
    .content_reception {
      .top {
        font-size: 16px;
        height: 3rem;
        margin-bottom: 1rem;
        line-height: 3rem;
        .button {
          float: right;
          left: 500px;
          line-height: 18px;
          min-width: 173px;
          font-size: 13px;
          background-color: #39C240;
          border-color: #39C240;
          border-radius: 0;
          margin: 0;
        }
      }
      .el-dialog {
        width: 65%;
        .el-dialog__header {
          padding: 0 20px;
          border-bottom: solid 1px #979797;
          .el-dialog__title {
            line-height: 43px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
          }
          .el-dialog__headerbtn {
            padding-top: 12px;
          }
        }
        .recCheckbox {
          .el-checkbox {
            margin-left: 0;
            margin-right: 1.5rem;
          }
        }

        .el-icon-search {
          height: 85%;
        }

        .el-transfer-panel__filter {
          padding: 0.2rem 1rem 1.1rem 1rem;
          width: 100%;
        }
        .el-input__inner {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #bfcbd9;
          box-sizing: border-box;
          color: #1f2d3d;
          font-size: inherit;
          height: 36px;
        }
        .el-dialog__body {
          padding: 0 20px 33px;
          .rec {
            padding: 1rem 0;
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            .departLine {
              margin: 1rem 10rem 2rem 5.5rem;
              border-top: 1px solid #dadada;
            }
            .item-form {
              display: flex;
              align-items: center;
              margin-top: 10px;
              margin-bottom: 10px;
              .itemTitle {
                display: inline-block;
                min-width: 75px;
              }
              .el-select {
                width: 80%;
                .el-option {
                  width: 80%;
                }
              }
              .el-input {
                width: 100%;
              }
              .el-switch {
                margin-left: 16px;
              }
              .el-checkbox-group {
                .el-checkbox__inner {
                  display: inline-block;
                  min-width: 0.2rem;
                  min-height: 0.2rem;
                }
              }
              .input {
                width: 80%;
              }
            }
            .item_blow {
              font-weight: bolder
            }
            article {
              ul {
                font-size: 14px;
                color: #9B9B9B;
                margin-left: 41px;
                line-height: 22px;
                li {
                  margin-left: 20px;
                }
              }
            }
            .item_large {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              span {
                min-width: 194px;
                text-align: end;
              }
              .el-input {
                width: 60%;
              }
            }
            .item-tag2 {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
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
          .rec:not(:last-child) {
            border-bottom: solid 1px #979797;;
          }
        }
        .el-dialog__footer {
          padding: 10px 20px 28px;
          .dialog-footer {
            text-align: center;
            .el-button {
              width: 246px;
              border-radius: 0;
              line-height: 18px;
              margin: 0;
              &:nth-child(1) {
                margin-right: 22px;
              }
              &:nth-child(2) {
                background-color: #39C240;
                border-color: #39C240;
                color: #ffffff;
              }
            }
            .el-button--primary {
              background-color: transparent;
              border: solid 1px #979797;
              color: #4A4A4A;
            }
          }
        }
      }
    }
  }
</style>
