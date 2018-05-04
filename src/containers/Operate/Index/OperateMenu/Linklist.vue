<template>
  <div>
    <div class="module-wrapper">
      <table-LinkList :hotelStaffList="linkList" @click="_changeSwitch"></table-LinkList>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../../../assets/styles/system/index.less';

  export default {
    data() {
      return {
        linkList: []
      }
    },
    methods: {
      ...mapActions([
        'goto',
        'getProdBaseList'
      ]),
      _getProdBaseList(){
        this.getProdBaseList({
          onsuccess: body => {
            this.linkList = body.data;
          }
        })
      },
    },
    mounted() {
      this._getProdBaseList()
    }
  }
</script>
<style scoped lang="less">

</style>
