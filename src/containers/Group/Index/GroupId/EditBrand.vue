<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="enterprise-info">
          <h3>品牌信息</h3>
          <div class="info-content">
            <div class="content-item">
              <span>品牌名称</span>
              <el-input class="el-right" v-model="name" name="name" v-validate="'required'"
                        :class="{'is-danger': errors.has('name') }" placeholder="请输入品牌名称"></el-input>
              <span class="help is-danger" v-show="errors.has('name')">品牌名称不能为空!</span>
            </div>
            <div class="content-item">
              <span>品牌编码</span>
              <el-input class="el-right" v-model="code" name="code" v-validate="'required'"
                        :class="{'is-danger': errors.has('code') }"  placeholder="请输入品牌编码"></el-input>
              <span class="help is-danger" v-show="errors.has('code')">品牌编码不能为空!</span>
            </div>
            <div class="content-logo">
              <label for="logo">上传LOGO</label>
              <input id="logo" ref="inputfile" @change="imgChange" type="file" multiple="false"
                     accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
            <img v-if="logoUrl" width="100" height="100" :src="logoUrl"/>
          </div>
          <div class="edit_btn" v-if="brandid != undefined">
            <el-button type="success" size="small" @click.native="remove">删除</el-button>
            <el-button type="success" size="small" @click.native="nextStep">修改</el-button>
          </div>
          <div v-if="brandid == undefined" class="edit_btn">
            <el-button type="success" @click.native="nextStep">添加</el-button>
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
        code: '',
        logoUrl: '',
        brandid: this.$route.query.brandid
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
      nextStep() {
        this.$validator.validateAll().then(() => {
          this.brandid ? this.modify() : this.regist()
        }).catch(() => {
        });
      },
      regist() {
        this.addBrand({
          name: this.name,
          code: this.code,
          logo_url: this.logoUrl,
          group_id: this.$route.params.id,
          onsuccess: body => this.goto(-1)
        })
      },
      modify() {
        this.modifyBrand({
          id: this.brandid,
          name: this.name,
          code: this.code,
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
              this.code = this.brand.code;
              this.brandid = this.brand.id;
              this.logoUrl = this.brand.logo_url;
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
      padding: 23px 36px 25px 25px;
      .enterprise-info {
        border: 1px solid #EAEDF0;
        margin: 0;
        h3 {
          background-color: #FAFAFA;
          border-bottom: 1px solid #EAEDF0;
          line-height: 42px;
          font-size: 16px;
          color: #4A4A4A;
          padding: 0 20px;
        }
        .info-content {
          padding: 22px 40px 44px;
          line-height: 35px;
          .content-item {
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              width: 86px;
            }
            .el-input {
              width: 50%;
              outline: none;
              font-size: 14px;
            }
          }
          .content-logo {
            display: flex;
            align-items: center;
            line-height: 65px;
            label {
              font-size: 14px;
              margin-right: 18px;
            }
            input {
              display: flex;
              align-items: center;
              min-width: 280px;
              outline: none;
              font-size: 14px;
            }
          }
        }

        .edit_btn {
          display: inline-block;
          align-items: center;
          width: 100%;
          text-align: center;
          margin-bottom: 26px;
          .el-button {
            width: 246px;
            /*line-height: 24px;*/
            background-color: #39C240;
            border-color: #39C240;
            border-radius: 0;
            &:nth-child(1) {
              margin-right: 12px;
            }
          }
        }
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
