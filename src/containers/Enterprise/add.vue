<template>
  <div>
    <div class="module-wrapper"> 
      <h3>注册企业账户</h3>
      <div>
        <p>企业信息</p>
        <label for="enterpriseName">企业名称</label>
        <input type="text" id="enterpriseName" v-model="enterpriseName" />
        <label for="enterpriseDesc">企业名称</label>
        <input type="text" id="enterpriseDesc" v-model="enterpriseDesc" />
        <label for="enterpriseWeb">企业官网</label>
        <input type="text" id="enterpriseWeb" v-model="enterpriseWeb" />
      </div>
      <div>
        <p>联系信息</p>
        <label for="contactName">联系人姓名</label>
        <input type="text" id="contactName" v-model="contactName" />
        <label for="contactPosition">联系人职务</label>
        <input type="text" id="contactPosition" v-model="contactPosition" />
        <label for="contactPhone">联系人电话</label>
        <input type="text" id="contactPhone" v-model="contactPhone" />
      </div>
      <div>
        <p>品牌管理</p>
        <table>
          <thead>
            <tr>
              <td>序号</td>
              <td>品牌名称</td>
              <td>品牌LOGO</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(obj, index) of list">
              <td>{{ ++index }}</td>
              <td>{{ obj.name }}</td>
              <td>{{ obj.logo }}</td>
              <td>
                <a @click="goEdit(obj)">修改</a>
                <a @click="goConfig(obj)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button @click="regist">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'EnterpriseAdd',
    data () {
      return {
        enterpriseName: '',
        enterpriseDesc: '',
        enterpriseWeb: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        list: [{name: 'E01', logo: true}]
      }
    },
    methods: {
      goEdit(obj) {

      },
      goConfig(obj) {

      },
      regist() {

      }
    }
  }
</script>