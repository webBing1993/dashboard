<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">添加酒店品牌</h3>
      <div class="content">
        <div class="enterprise-info">
          <p class="info-title">品牌信息</p>
          <div class="info-content">
            <!--<div class="title-msg">
                <span>所属企业</span>
                <select @change="enterpriseChange">
                  <option v-for="(obj, index) of enterpriseList" :value="obj.id">{{obj.name}}</option>
                </select>
            </div>-->
            <div class="content-msg">
              <label for="brandName">品牌名称</label>
              <input type="text" id="brandName" v-model="brandName" @change="nameChange"/>
              <span v-show="nameError" class="error-info">* 请输入品牌名称</span>
            </div>
            <div class="content-logo">
              <label for="logo">上传LOGO</label>
              <input id="logo" ref="inputfile" @change="imgChange" type="file" multiple="false"
                     accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
          </div>
        </div>
        <div class="button-content">
          <XButton @onClick="regist" value="添加"></XButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  // const cos = require('cos-js-sdk-v4')
  let cos;
  export default {
    name: 'BrandAdd',
    data () {
      return {
        brandName: '',
        logoUrl: '',
        nameError: false,
        list: [],
        enterprise: '',
        enterpriseList: []
      }
    },
    methods: {
      ...mapActions([
        // 'getEnterpriseList',
        'addBrand',
        'goto',
        'CosCloudAssign'
      ]),
      enterpriseChange(e) {
        this.enterprise = e.target.value;
      },
      nameChange(e) {
        if (e.target.value != '')
          this.nameError = false;
        else
          this.nameError = true;
      },
      // getEnterprise() {
      //   this.getEnterpriseList({
      //     onsuccess: body => this.enterpriseList = body.data
      //   })
      // },
      regist() {
        if (this.brandName == '') {
          this.nameError = true;
          return;
        }

        //没有选择的时候给个默认值
        // if (this.enterprise == '' && this.enterpriseList[0]) this.enterprise = this.enterpriseList[0].id;

        this.addBrand({
          name: this.brandName,
          logo_url: this.logoUrl,
          // group_id: this.enterprise,
          group_id: this.$route.params.id,
          onsuccess: body => this.goto(-1)
        })
      },
      imgChange(e) {
        let file = e.target.files[0];
        // this.$refs.inputfile.value = '';    //不清掉，选择同一张图片就不会触发change事件
        this.uploadImg(file);
      },
      uploadImg(file) {
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
      // this.getEnterprise();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    border-bottom: 1px solid #ECECEC;
  }

  .content {
    padding: 20px;
  }

  .info-content {
    padding: 10px 40px;
  }

  .content-msg {
    display: flex;
    align-items: center;
    font-size: 14px;
    input {
      outline: none;
      border: none;
      border-bottom: solid 1px #EAEDF0;
      margin: 10px 20px;
      padding: 8px;
      flex: 1;
      font-size: 14px;
    }
  }

  .content-logo {
    margin: 15px 0 30px;
  }

  .table-content {
    padding: 10px 20px;
  }

  .info-title {
    line-height: 30px;
    padding: 8px 20px;
    font-size: 16px;
    font-weight: 300;
    background-color: #EAEDF0;
    border-bottom: 1px solid transparent;
  }

  .enterprise-info {
    border: 1px solid #EAEDF0;
  }

  .brand-info {
    border: 1px solid #EAEDF0;;
    margin-top: 20px;
  }

  .button-content {
    margin-top: 45px;
    cursor: pointer;
  }

  .error-info {
    color: red;
  }
</style>
