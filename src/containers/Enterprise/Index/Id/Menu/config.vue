<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="business">
          <h3 class="title">业务配置</h3>
          <div class="brand" @click="goBrand">
            <div class="logo"></div>
            <div class="brand-info">
              <p>品牌配置</p>
              <p>相关的描述相关的描述相关的描述相关的描述</p>
            </div>
          </div>
        </div>
        <div class="system">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Config',
    data() {
      return {

      }
    },
    methods: {
      goBrand() {
        this.$router.push(`brand`)
      }
    }
  }
</script>
<style scoped>
  .content {
    padding: 10px 20px;
  }
  .title {
    line-height: 30px;
  }
  .business {
    
  }
  .brand {
    padding-top: 10px;
  }
  .logo {
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: green;
  }
  .brand-info {
    float: left;
  }
</style>

