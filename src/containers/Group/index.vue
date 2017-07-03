<template>
  <div>
    <div class="module-wrapper">
      <p class="side_title" v-show="list.length > 1"><span v-for="(obj, index) in list"
                                                           @click="breadGo(obj.path)">{{obj.name}}</span></p>
      <router-view class="third-router"/>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
  import '../../assets/styles/asideMenu_title/index.less';
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
