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
      groupMeta() {
        let meta = {};
        for (let obj of this.$route.matched) {
          if (obj.path === '/group/:id') {
            meta = obj.meta;
            break;
          }
        }
        return meta;
      },
      hotelMeta() {
        let meta = {};
        for (let obj of this.$route.matched) {
          if (obj.path === '/group/:id/hotel/:hotelid') {
            meta = obj.meta;
            break;
          }
        }
        return meta;
      },
      list() {
        let bread=[], groupId, hotelId;
        let groupPath, hotelPath;

        for (let obj of this.$route.matched) {
          if (obj.path === '/group') {
            bread.push({name: '企业管理', path: '/group'})
          } else if (obj.path === '/group/:id') {
            // groupPath = this.$route.fullPath.match(/^\/group.+\//)[0];

            groupId = this.$route.fullPath.split('group/')[1].split('/hotel')[0];
            
            // obj.meta为空对象，但是obj打出来明明有meta值，所以先用了计算属性，没问题
            let name = this.groupMeta.name ? this.groupMeta.name : '集团详情';
            bread.push({name: ` > ${name}`, path: `/group/${groupId}`})
          } else if (obj.path === '/group/:id/hotel/:hotelid') {
            // hotelPath = this.$route.fullPath.match(/\/hotel\/.+\//)[0];

            hotelId = this.$route.fullPath.split('hotel/')[1].split('/config')[0];
            let name = this.hotelMeta.name ? this.hotelMeta.name : '门店详情';
            bread.push({name: ` > ${name}`, path: `/group/${groupId}/hotel/${hotelId}`})
          }
        }
        return bread;
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
