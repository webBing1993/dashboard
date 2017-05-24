<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">修改酒店品牌</h3>
      <div class="content">
        <div class="enterprise-info">
          <p>品牌信息</p>
          <div class="info-content">
            <div class="title-msg">
              <span>所属企业</span>
              <select @change="enterpriseChange">
                <option v-for="(obj, index) of chooseList" :value="obj.id">{{obj.name}}</option>
              </select>
            </div>
            <div class="content-msg">
              <label for="brandName">品牌名称</label>
              <input type="text" id="brandName" v-model="brand.name" @change="nameChange"/>
              <span v-show="nameError" class="error-info">* 请输入品牌名称</span>
            </div>
            <div class="content-logo">
              <label for="logo">修改LOGO</label>
              <!--<img width="100" height="100" :src="brand.logo_url" />-->
              <input id="logo" ref="inputfile" @change="imgChange" type="file" multiple="false"
                     accept="image/jpg,image/jpeg,image/png,image/gif">
            </div>
          </div>
        </div>
        <span class="_button" @click="modify">修改</span>
        <!--<XButton @onClick="modify" value="修改"></XButton>-->
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  let cos;
  export default {
    name: 'BrandEdit',
    data () {
      return {
        brand: {},
        nameError: false,
        enterprise: '',
        logoUrl: '',
        enterpriseList: [],
        chooseList: []
      }
    },
    watch: {
      enterpriseList(val) {
        let list = [].concat(val);
        let index = list.findIndex(v => v.id == this.$route.params.id);
        if (index == -1) {
          this.chooseList = list;
          return;
        }
        let obj = list.splice(index, 1)[0];
        if (obj == undefined) {
          this.chooseList = list;
          return;
        }
        list.unshift(obj);
        this.chooseList = list;
      }
    },
    methods: {
      ...mapActions([
        'getEnterpriseList',
        'modifyBrand',
        'getBrand',
        'goto',
        'showtoast',
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
      getEnterprise() {
        this.getEnterpriseList({
          onsuccess: body => this.enterpriseList = body.data
        })
      },
      modify() {
        if (this.brand.name == '') {
          this.nameError = true;
          return;
        }

        //没有选择的时候给个默认值
        if (this.enterprise == '' && this.chooseList[0]) this.enterprise = this.chooseList[0].id;

        this.modifyBrand({
          id: this.$route.params.brandid,
          name: this.brand.name,
          group_id: this.enterprise,
          logo_url: this.logoUrl ? this.logoUrl : this.brand.logo_url,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      getInfo() {
        this.getBrand({
          id: this.$route.params.brandid,
          onsuccess: body => body.data ? this.brand = body.data : this.showtoast('数据不存在')
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
      this.getEnterprise();
      this.getInfo();
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
    padding: 20px 20px;
    .enterprise-info {
      border: 1px solid #EAEDF0;
      p {
        line-height: 30px;
        padding: 8px 20px;
        font-size: 16px;
        font-weight: 300;
        background-color: #EAEDF0;
        border-bottom: 1px solid transparent;
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
</style>
