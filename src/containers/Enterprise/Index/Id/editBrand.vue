<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">修改酒店品牌</h3>
      <div class="content">
        <div class="enterprise-info">
          <p class="info-title">品牌信息</p>
          <div class="info-content">
            <div class="title-msg">
                <span>所属企业</span>
                <select @change="enterpriseChange">
                  <option v-for="(obj, index) of chooseList" :value="obj.id">{{obj.name}}</option>
                </select>
            </div>
            <div class="content-msg">
              <label for="brandName">品牌名称</label>
              <input type="text" id="brandName" v-model="brand.name" @change="nameChange" />
              <span v-show="nameError" class="error-info">* 请输入品牌名称</span>
            </div>
          </div>
        </div>
        <div class="button-content">
          <XButton @onClick="modify" value="修改"></XButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'BrandEdit',
    data () {
      return {
        brand: {},
        nameError: false,
        enterprise: '',
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
        'goto'
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
          onsuccess: body => {
            alert('修改成功');
            this.goto(-1)
          },
          onFail: err => alert(err.errmsg)
        })
      },
      getInfo() {
        this.getBrand({
          id: this.$route.params.brandid,
          onsuccess: body => body.data ? this.brand = body.data : alert('数据不存在')
        })
      }
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
