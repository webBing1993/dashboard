<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="business">
          <h3 class="title">业务配置</h3>
          <div class="brand" @click="goBrand">
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
      return {}
    },
    methods: {
      goBrand() {
        this.$router.push(`brand`)
      }
    }
  }
</script>
<style scoped lang="less">
  .content {
    .business {
      .title {
        line-height: 30px;
        border-bottom: solid 1px #EAEDF0;
        padding: 16px 20px;
        font-weight: 400;
        font-size: 18px;
      }
      .brand {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        line-height: 25px;
        .brand-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        &:before {
          content: '';
          width: 60px;
          height: 60px;
          margin-right: 20px;
          background-color: #8f8f8f;
          border-radius: 50%;
        }
      }
    }
  }
</style>

