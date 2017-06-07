<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="enterprise-info">
          <div class="info-header">
            <span>品牌信息</span>
            <div v-if="brandid != undefined">
              <el-button type="success" size="small" @click.native="remove">删除</el-button>
              <el-button type="success" size="small" :disabled="submitDisabled" @click.native="modify">修改</el-button>
            </div>
          </div>
          <div class="info-content">
            <div class="content-msg">
              <label for="brandName">品牌名称</label>
              <input type="text" id="brandName" v-model="name"/>
            </div>
            <div class="content-logo">
              <label for="logo">修改LOGO</label>
              <!--<img width="100" height="100" :src="brand.logo_url" />-->
              <input id="logo" ref="inputfile" @change="imgChange" type="file" multiple="false"
                     accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
          </div>
          <div v-if="brandid == undefined" class="button-box">
            <el-button class="el-btn" type="success" :disabled="submitDisabled" @click.native="regist">添加</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  let cos;
  export default {
    name: 'EditBrand',
    data () {
      return {
        brand: {},
        name: '',
        logoUrl: '',
        brandid: this.$route.query.brandid
      }
    },
    computed: {
      submitDisabled() {
        if (!this.$route.params.id || this.name == '')
          return true;
        return false;
      }
    },
    methods: {
      ...mapActions([
        'addBrand',
        'getGroupList',
        'modifyBrand',
        'removeBrand',
        'getBrand',
        'goto',
        'showtoast',
        'CosCloudAssign'
      ]),
      regist() {
        if (this.brandName == '') return;

        //没有选择的时候给个默认值
        // if (this.enterprise == '' && this.enterpriseList[0]) this.enterprise = this.enterpriseList[0].id;
        this.addBrand({
          name: this.name,
          logo_url: this.logoUrl,
          // group_id: this.enterprise,
          group_id: this.$route.params.id,
          onsuccess: body => this.goto(-1)
        })
      },
      modify() {
        this.modifyBrand({
          id: this.brandid,
          name: this.name,
          group_id: this.$route.params.id,
          logo_url: this.logoUrl ? this.logoUrl : this.brand.logo_url,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      remove() {
        this.removeBrand({
          id: this.$route.query.brandid,
          onsuccess: body => this.goto(-1)
        })
      },
      getInfo() {
        this.getBrand({
          id: this.brandid,
          onsuccess: body => {
            if (body.data) {
              this.brand = body.data;
              this.name = this.brand.name;
              this.brandid = this.brand.id;
            }
          }
        })
      },
      imgChange(e) {
        let file = e.target.files[0];
        // this.$refs.inputfile.value = '';    //不清掉，选择同一张图片就不会触发change事件
        this.uploadImg(file);
      },
      uploadImg(file) {
        if (!file) return;
        let self = this;
        cos = new CosCloud({
          appid: 1252821823,// APPID 必填参数
          bucket: 'virgo',//bucketName 必填参数
          region: 'sh',//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
          getAppSign: function (callback) {//获取签名 必填参数
            self.CosCloudAssign({
              bucket_name: 'virgo',
              file_path: '/brand_logo/' + file.name,
              onsuccess: function (body) {
                // console.log(body)
                callback(body.data)
              }
            })
          },
          getAppSignOnce: function (callback) {//获取签名 必填参数
            self.CosCloudAssign({
              bucket_name: 'virgo',
              file_path: '/brand_logo/' + file.name,
              onsuccess: function (body) {
                callback(body.data)
              }
            })
          }
        });

        cos.uploadFile(
          body => {
            this.logoUrl = body.data.source_url;
          },
          err => console.log(err),
          progress => console.log(progress),
          'virgo',
          '/brand_logo/' + file.name,
          file,
          0
        );
      },
    },
    mounted() {
      if (this.brandid) {
        this.getInfo();
      }
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    .content {
      padding: 20px 20px;
      .enterprise-info {
        border: 1px solid #EAEDF0;
        .info-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #EAEDF0;
          line-height: 30px;
          padding: 16px 20px;
          font-size: 16px;
          .el-button {
            min-width: 160px;
            line-height: 20px;
            margin-left: 20px;
          }
        }

        .info-content {
          padding: 20px 40px;
          line-height: 45px;
          .title-msg {
            span {
              padding-right: 20px;
            }
            select {
              width: 280px;
              height: 32px;
              outline: none;
              background-color: #ffffff;
            }
          }
          .content-msg {
            display: flex;
            align-items: center;
            font-size: 14px;
            input {
              width: 260px;
              outline: none;
              border: solid 1px #EAEDF0;
              margin: 10px 26px;
              padding: 8px;
              font-size: 14px;
            }
          }
          .content-logo {
            label {
              margin-right: 10px;
            }
            input {
              min-width: 280px;
              outline: none;
              height: 32px;
            }
          }
        }
      }
      ._button {
        float: right;
        width: 120px;
        line-height: 38px;
        margin-top: 16px;
      }
    }
  }

  .table-content {
    padding: 10px 20px;
  }

  .brand-info {
    border: 1px solid #EAEDF0;;
    margin-top: 20px;
  }

  .error-info {
    color: red;
  }

  .el-btn {
    width: 160px;
    display: block;
    float: right;
    margin-top: 20px;
    font-size: 16px;
  }

</style>
