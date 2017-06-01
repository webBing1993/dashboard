<template>
  <div>
    <div class="module-wrapper">
      <p><span v-for="(obj, index) of list" @click="breadGo(obj.path)">{{obj.name}}</span></p>
      <router-view class="third-router"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Group',
    computed: {
      groupId(){
        return this.$route.fullPath.match(/\/hotel\/.+\//)
      },
      list() {
        let bread=[];
        // for (let obj of this.$route.matched) {
        //   if (obj.path === '/group')
        //     bread.push({name: '企业管理', path: '/group'})
        //   if (obj.path === '/group/:id') {
        //     let fullPath = this.$route.fullPath;
        //     let groupId = fullPath
        //     bread.push({name: '企业管理', path: `/geoup/${}`})
        //   }
        // }
        console.log(this.$route)
        console.log(this.$route.matched)

        const groupPath = this.$route.fullPath.match(/^\/group.+\//)
        const hotelPath = this.$route.fullPath.match(/^\/hotel.+\//)

        

        this.$route.matched.some(i=>i.path === '/group') ? bread.push({name: '企业管理', path: '/group'}) : null;
        this.$route.matched.some(i=>i.path === '/group/:id') ? bread.push({name: '集团详情', path: groupPath[0]}) : null;
        return bread
      }
    },
    methods: {
      breadGo(path) {
        console.log(path)
        this.$router.push(path)
      }
    }
  }
</script>
