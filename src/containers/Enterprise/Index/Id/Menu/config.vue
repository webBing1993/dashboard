<template>
  <div>
    <div class="module-wrapper">
      <div class="content">
        <div class="business">
          <h3>业务配置</h3>
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
      h3 {
        line-height: 30px;
        border-bottom: solid 1px #EAEDF0;
        padding: 16px 20px;
        font-weight: 400;
        font-size: 18px;
        &:before {
          content: '';
          border-left: solid 4px #8f8f8f;
          padding-right: 6px;
        }
      }
      .brand {
        display: flex;
        align-items: center;
        margin: 16px;
        padding: 16px;
        line-height: 25px;
        border: solid 1px #EAEDF0;
        width: 400px;
        .brand-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        &:before {
          content: '';
          width: 48px;
          height: 48px;
          margin-right: 20px;
          background-color: #8f8f8f;
          border-radius: 50%;
        }
      }
    }
  }
</style>

