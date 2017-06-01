<template>
  <div>
    <!--<div class="module-wrapper"></div>-->
    <div class="module-wrapper">
      <div class="top-content">
        <h3>门店</h3>
        <p @click="edit">编辑</p>
      </div>
      <div class="content">
        <div class="content-input">
          <label for="groupCode">门店子账户编码</label>
          <input disabled="disabled" type="text" id="groupCode" v-model="hotel.code"/>
        </div>
        <div class="content-input">
          <label for="groupName">门店名称</label>
          <input disabled="disabled" type="text" id="groupName" v-model="hotel.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'HotelInfo',
    data() {
      return {
        hotel: {}
      }
    },
    methods: {
      ...mapActions([
        'getHotel',
        'showtoast'
      ]),
      getInfo() {
        this.getHotel({
          id: this.$route.params.hotelid,
          onsuccess: body => body.data ? this.hotel = body.data : this.showtoast({text: '数据不存在', type: 'warning'})
        })
      },
      edit() {
        if (!this.hotel.id) return;
        // this.$router.push(`/group/hotel/${this.hotel.id}/edit`)
        //这里不要跳门店编辑页面了，直接在当前页修改
      }
    },
    mounted() {
      this.getInfo();
    }
  }
</script>

<style scoped lang="less">
  .top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    border-bottom: 1px solid #ECECEC;
    line-height: 50px;
    font-size: 16px;
    p {
      padding-right: 20px;
      color: #576b95;
      cursor: pointer;
      &:hover {
        color: #586C94;
        text-decoration: underline;
      }
    }
  }

  .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    .content-input {
      display: flex;
      line-height: 40px;
      label {
        width: 120px;
      }
      input {
        flex: 1;
        outline: none;
        border: none;
        border-bottom: solid 1px #EAEDF0;
        font-size: 14px;
      }
    }
  }
</style>
