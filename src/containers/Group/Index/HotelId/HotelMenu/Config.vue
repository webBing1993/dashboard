<template>
  <div>
    <div class="module-wrapper">
      <a @click="goSummary">查看配置汇总</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Config',
    methods: {
      goSummary() {
        //这里需要判断是否有group_id,再决定跳哪个路由
        this.$router.push({
          name: 'GroupConfigSummary'
        })
        // this.$router.push({
        //   name: 'ConfigSummary'
        // })
      }
    }
  }
</script>