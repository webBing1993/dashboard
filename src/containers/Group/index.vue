<template>
  <div>
    <div class="module-wrapper">
      <p class="side_title" v-show="list.length > 1"><span v-for="(obj, index) of list"
                                                           @click="breadGo(obj.path)">{{obj.name}}</span></p>
      <router-view class="third-router"/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  export default {
    name: 'Group',
    data() {
      return {
        groupId: '',
        hotelId: '',
        groupName: '企业详情',
        hotelName: '酒店详情'
      }
    },
    computed: {
      list() {
        let bread = [];

        for (let obj of this.$route.matched) {
          if (obj.path === '/group') {
            bread.push({name: '企业管理', path: '/group'})
          } else if (obj.path === '/group/:id') {
            this.groupId = this.$route.params.id;

            bread.push({name: `${this.groupName}`, path: `/group/${this.groupId}`})
          } else if (obj.path === '/group/:id/hotel/:hotelid') {
            this.hotelId = this.$route.params.hotelid;

            bread.push({name: `${this.hotelName}`, path: `/group/${this.groupId}/hotel/${this.hotelId}`})
          } else if (obj.name && obj.name === 'EditDevice') {
            if (this.$route.query && this.$route.query.deviceid) {
              bread.push({name: '编辑设备', path: this.$route.fullPath})
            } else if (!this.$route.query || !this.$route.query.deviceid) {
              bread.push({name: '添加设备', path: this.$route.fullPath})
            }
          } else if (obj.name && obj.name === 'AddGroup') {
            bread.push({name: '添加企业', path: this.$route.fullPath})
          } else if (obj.name && obj.name === 'AddHotel') {
            bread.push({name: '添加门店', path: this.$route.fullPath})
          } else if (obj.name && obj.name === 'EditBrand') {
            if (this.$route.query && this.$route.query.brandid) {
              bread.push({name: '编辑品牌', path: this.$route.fullPath})
            } else if (!this.$route.query || !this.$route.query.deviceid) {
              bread.push({name: '添加品牌', path: this.$route.fullPath})
            }
          }
        }
        return bread;
      },
      matched() {
        return this.$route.matched
      }
    },
    watch: {
      groupId() {
        this.getGroupInfo();
      },
      hotelId() {
        this.getHotelInfo();
      }
    },
    methods: {
      ...mapActions([
        'getGroup',
        'getHotel',
        'goto'
      ]),
      breadGo(path) {
        this.goto(path)
      },
      getGroupInfo() {
        this.getGroup({
          id: this.$route.params.id,
          onsuccess: body => {
            if (body.data) {
              this.groupName = body.data.name;
            }
          }
        })
      },
      getHotelInfo() {
        this.getHotel({
          id: this.$route.params.hotelid,
          onsuccess: body => {
            if (body.data) {
              this.hotelName = body.data.name;
            }
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .side_title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #39C240;
    width: 100%;
    box-sizing: border-box;
    line-height: 39px;
    padding: 13px 0 8px 40px;
    position: relative;
    border-bottom: solid 1px #e0e0e0;
    span {
      display: flex;
      align-items: center;
      &:last-child {
        color: #4A4A4A;
      }
      &:not(:first-child):before {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        margin-left: 3px;
        margin-right: 6px;
        border-left: solid 1px #4A4A4A;
        border-bottom: solid 1px #4A4A4A;
        transform: rotate(-135deg);
      }
    }
  }

</style>
