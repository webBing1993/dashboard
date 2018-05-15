<!--产品版本页-->
<template>
  <div class="module-wrapper">
    <div class="title">
      <div class="tip">日期</div>
      <div class="block">
        <el-date-picker
          v-model="binDate"
          @change="_getBinTime"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-option="_getBinTime"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="tip">至</div>
      <div class="block">
        <el-date-picker
          v-model="enddate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          @change="_getEndTime"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <table-Withoutcard :withoutCardList="withoutCardLists"></table-Withoutcard>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

  export default {
    name: 'prodVersion',
    data () {
      return {
        withoutCardLists: [],
        binDate: '',
        enddate: '',
        starttime: '',
        endtime: '',


      }
    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
      }),
      groupId () {
        return this.$route.params.id
      },
      hotelId () {
        return this.$route.params.hotelid
      }
    },
    watch: {},
    methods: {
      ...mapActions([
        'goto',
        'getwithoutCardList',
      ]),
      _getBinTime(){
        var d = new Date(this.binDate);
        let YYYY=d.getFullYear()
        let MM=(d.getMonth() + 1)>10?(d.getMonth() + 1):'0'+(d.getMonth() + 1)
        let DD=(d.getDate() + 1)>10?(d.getDate() + 1):'0'+(d.getDate() + 1)
        this.starttime= YYYY+'-'+MM+'-'+DD
        console.log(YYYY+'-'+MM+'-'+DD)
        console.log(this.starttime)
      },
      _getEndTime(){
        var d = new Date(this.enddate);
        let YYYY=d.getFullYear()
        let MM=(d.getMonth() + 1)>10?(d.getMonth() + 1):'0'+(d.getMonth() + 1)
        let DD=(d.getDate() + 1)>10?(d.getDate() + 1):'0'+(d.getDate() + 1)
        this.endtime= YYYY+'-'+MM+'-'+DD
        this._getwithoutCardList()
      },

      //获取产品版本列表
      _getwithoutCardList () {
        this.getwithoutCardList({
          hotelId:this.hotelId,
          startDate:this.starttime,
          endDate:this.endtime,
          onsuccess: body => {
            this.withoutCardLists = body.data;
          }
        })
      },


    },
    mounted () {
      this._getwithoutCardList();
    }
  }
</script>
<style scoped lang="less">
  .module-wrapper {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    .title {
      display: flex;
      flex-direction: row;
      margin-bottom: 30px;
      div {
        color: #4A4A4A;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        text-align: left;
      }

      .block {
        margin-left: 40px;
        margin-right: 40px;
      }
    }
    span {
      margin-right: 1rem;
    }
    .el-right {
      width: 50%;
    }
    .dialog-footer {
      margin-top: 2rem;
      margin-left: 36%;
      .el-button {
        width: 15rem;
        background-color: #04c54b;
        border: none;
      }
    }
  }
</style>

