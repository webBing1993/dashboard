<template>
  <router-view class="fourth-router"/>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'HotelId',
    methods: {
      ...mapActions([
        'getHotel',
        'showtoast'
      ]),
      getInfo() {
        this.getHotel({
          id: this.$route.params.hotelid,
          onsuccess: body => {
            if (body.data) {
              for (let obj of this.$route.matched) {
                if (obj.path === '/group/:id/hotel/:hotelid') {
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