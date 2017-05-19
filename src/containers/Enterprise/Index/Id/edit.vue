<template>
  <div>
    <div class="module-wrapper">
      <h3 class="title">企业账户编辑</h3>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p class="info-title">企业信息</p>
            <p class="info-modify" @click="modify">修改</p>
          </div>
          <div class="info-content">
            <div class="content-msg">
              <label for="enterpriseCode">企业账户编码</label>
              <input type="text" id="enterpriseCode" v-model="group.id" readonly/>
            </div>
            <div class="content-msg">
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="group.name" @change="nameChange" />
              <span v-show="nameError" class="error-info">* 请输入企业名称</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseDesc">企业简介</label>
              <input type="text" id="enterpriseDesc" v-model="group.memo" @change="memoChange" />
              <span v-show="memoError" class="error-info">* 请输入企业简介</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="group.website" @change="websiteChange" />
              <span v-show="websiteError" class="error-info">* 请输入企业官网</span>
            </div>
          </div>
        </div>
        <button @click="remove">删除</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'Edit',
    data () {
      return {
        group: {},
        nameError: false,
        memoError: false,
        websiteError: false,
      }
    },
    methods: {
      ...mapActions([
        'getEnterprise',
        'modifyEnterprise',
        'removeEnterprise',
        'goto'
      ]),
      nameChange(e) {
        if (e.target.value != '') 
          this.nameError = false;
        else 
          this.nameError = true;
      },
      memoChange(e) {
        if (e.target.value != '') 
          this.memoError = false;
        else 
          this.memoError = true;
      },
      websiteChange(e) {
        if (e.target.value != '') 
          this.websiteError = false;
        else 
          this.websiteError = true;
      },
      getInfo() {
        this.getEnterprise({
          id: this.$route.params.id,
          onsuccess: body => body.data ? this.group = body.data : alert('数据不存在')
        })
      },
      modify() {
        if (this.group.name == '') this.nameError = true;
        if (this.group.memo == '') this.memoError = true;
        if (this.group.website == '') this.websiteError = true;
        if (this.group.name == '' || this.group.memo == '' || this.group.website == '') return;

        this.modifyEnterprise({
          id: this.group.id,
          name: this.group.name,
          memo: this.group.memo,
          website: this.group.website,
          onsuccess: body => alert('修改成功')
        })
      },
      remove() {
        this.removeEnterprise({
          id: this.group.id,
          onsuccess: body => this.goto(-1)
        })
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>
<style scoped lang="less">
  .title {
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #757575;
    font-size: 18px;
    font-weight: 400;
  }

  .content {
    padding: 20px 20px;
    button {
      float: right;
      width: 120px;
      line-height: 35px;
      margin-top: 16px;
    }
  }

  .enterprise-info {
    border: 1px solid #EAEDF0;
    .title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      border-bottom: 1px solid #EAEDF0;
      line-height: 50px;
      .info-title {
        font-size: 18px;
        font-weight: 400;
      }
    }
    .info-content {
      padding: 10px 40px;
      .content-msg {
        display: flex;
        align-items: center;
        font-size: 14px;
        label {
          width: 90px;
        }
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
    }
  }

  .error-info {
    color: red;
  }
</style>
