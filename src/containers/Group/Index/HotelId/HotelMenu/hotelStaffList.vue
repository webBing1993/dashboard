<template>
  <div class="module-content">
    <div>
      <div>
        <table-list :hotelStaffList="hotelStaffList" @click="_changeSwitch"></table-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import tool from '@/assets/tools/tool.js';

  export default {
    name: 'OnlineStatus',
    data() {
      return {
        switchStatue: 1,
        checked: true,
        unchecked: false,
        hotelStaffList: []
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'getHotelStaff',
        'modifyStatus'
      ]),
      _hotelStaffList(){
        this.getHotelStaff({
          hotel_id: this.$route.params.hotelid,
          onsuccess: body => {
              console.log(body.data)
            this.hotelStaffList = body.data;
          }
        })
      },

      _changeSwitch(obj){
        console.log('------>',obj)
        this.modifyStatus({
          id: obj.id,
          status: obj.status=='0'?'1':'0',
          onsuccess: body => {
            this._hotelStaffList();
          }
        })
      }
    },

    mounted() {
      this._hotelStaffList();
    }
  }
</script>

<style scoped lang="less">
  .module-content {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    .title, .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #f5f5f5;

    }
  }

</style>
