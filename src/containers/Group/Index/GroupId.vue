<template>
  <router-view class="fourth-router"/>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'GroupId',
    methods: {
      ...mapActions([
        'getGroup'
      ]),
      getInfo() {
        this.getGroup({
          id: this.$route.params.id,
          onsuccess: body => {
            if (body.data) {
              for (let obj of this.$route.matched) {
                if (obj.path === '/group/:id') {
                  obj.meta.name = body.data.name;
                  break;
                }
              }
            }
          }
        })
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>
