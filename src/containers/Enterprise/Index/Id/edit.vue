<template>
  <div>
    <div class="module-wrapper">
      <div class="title">
        <span @click="_goback"></span>
        <h3>企业账户编辑</h3>
      </div>
      <div class="content">
        <div class="enterprise-info">
          <div class="title-bar">
            <p class="info-title">企业信息</p>
            <p class="info-modify" @click="modify">修改</p>
          </div>
          <div class="info-content">
            <div class="content-msg">
              <label for="enterpriseCode">企业账户编码</label>
              <input type="text" id="enterpriseCode" v-model="group.code"/>
            </div>
            <div class="content-msg">
              <label for="enterpriseName">企业名称</label>
              <input type="text" id="enterpriseName" v-model="group.name" @change="nameChange"/>
              <span v-show="nameError" class="error-info">* 请输入企业名称</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseDesc">企业简介</label>
              <input type="text" id="enterpriseDesc" v-model="group.memo" @change="memoChange"/>
              <span v-show="memoError" class="error-info">* 请输入企业简介</span>
            </div>
            <div class="content-msg">
              <label for="enterpriseWeb">企业官网</label>
              <input type="text" id="enterpriseWeb" v-model="group.website" @change="websiteChange"/>
              <span v-show="websiteError" class="error-info">* 请输入企业官网</span>
            </div>
          </div>
        </div>
        <span class="_button" @click="remove">删除</span>
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
        'goto',
        'showtoast'
      ]),
      _goback(){
        this.goto(-1);
      },
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
          onsuccess: body => body.data ? this.group = body.data : this.showtoast('数据不存在')
        })
      },
      modify() {
        if (this.group.name == '') this.nameError = true;
        if (this.group.memo == '') this.memoError = true;
        if (this.group.website == '') this.websiteError = true;
        if (this.group.name == '' || this.group.memo == '' || this.group.website == '') return;

        this.modifyEnterprise({
          id: this.group.id,
          code: this.group.code,
          name: this.group.name,
          memo: this.group.memo,
          website: this.group.website,
          onsuccess: body => {
            this.goto(-1)
          }
        })
      },
      remove() {
        this.removeEnterprise({
          id: this.group.id,
          onsuccess: body => {
            this.goto('/enterprise')
          }
        })
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    .title {
      display: flex;
      align-items: center;
      line-height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #ECECEC;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #0D0D0D;
      }
      span {
        display: block;
        width: 24px;
        height: 24px;
        background-color: #C8C8CD;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        &:before {
          content: '';
          width: 6px;
          height: 6px;
          display: block;
          border-left: solid 1px #ffffff;
          border-bottom: solid 1px #ffffff;
          position: absolute;
          left: 10px;
          top: 8px;
          transform: rotate(45deg);
        }
      }
    }
    .content {
      padding: 20px 20px;
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
          .info-modify {
            cursor: pointer;
            padding-right: 20px;
            font-size: 15px;
            &:hover {
              color: #586C94;
              text-decoration: underline;
            }
          }
        }
        .info-content {
          padding: 20px 40px;
          .content-msg {
            display: flex;
            align-items: center;
            font-size: 14px;
            label {
              width: 90px;
            }
            input {
              outline: none;
              border: solid 1px #EAEDF0;
              margin: 10px 20px;
              text-indent: 8px;
              width: 320px;
              line-height: 32px;
              font-size: 14px;
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

  .error-info {
    color: red;
  }
</style>
