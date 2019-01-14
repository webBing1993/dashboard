<!--门店配置页-->
<template>
  <div class="wrapper">
    <div class="title">开通产品配置</div>
    <div class="switchContent">
      <div v-for="(item,index)  of  prodConfigList" class="switchList">
        <span>{{item.name}}</span>
        <el-switch
          v-model="item.status"
          @change="_openThisConfig(item)"
          active-color="#39C240"
          inactive-color="#ff4949"
          active-text=""
          inactive-text="">
        </el-switch>
        <a v-if="item.status" class="charge" target="_blank" :href="item.control_url">管理</a>
      </div>
    </div>
  </div>
</template>

<script>
  import ElDialog from "../../../../../../../node_modules/element-ui/packages/dialog/src/component.vue";


  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import ElInput from "../../../../../../../node_modules/element-ui/packages/input/src/input";
  import tool from '@/assets/tools/tool.js'
  export default {
    components: {
      ElDialog,
      ElInput
    },
    data() {
      return {
        prodConfigList: []
      }
    },

    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
      }),
    },

    methods: {
      ...mapActions([
        'goto',
        'getProdConfig',
        'setProdConfig',
      ]),
      _getProdConfig(){
          this.prodConfigList=[]
      this.getProdConfig({
      hotel_id: this.$route.params.hotelid,
      onsuccess: body => {
         this.prodConfigList=body.data
      }
    })
  }
  ,
  _openThisConfig(obj){
    console.log('当前项',obj)
    console.log('获取的状态值',obj.status)
    let code = obj.fun_model_code
//    let status = !obj.status
    let status = obj.status
    console.log('传输的状态值',status)
    this.setProdConfig({
      hotel_id: this.$route.params.hotelid,
      code:code,
      status: status,
      onsuccess: body => {
        this._getProdConfig()
      }
    })

  }
  ,
  },

  mounted()
  {
    this._getProdConfig()
  }
  ,

  computed: {
  ...
    mapState({}),
  }
  ,

  watch: {
  }
  ,
  }
</script>
<style lang="less">
  .fifth-router {
    margin-left: 40px;
    display: flex;
    flex-direction: column;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #4A4A4A;
      letter-spacing: 0;
      margin-bottom: 40px;
    }
    .switchContent {
      display: flex;
      flex-direction: column;
      width: 100%;
      .switchList {
        height: 60px;
        line-height: 50px;
        width: 95%;
        border-bottom: 1px solid #979797;
        .charge {
          float: right;
          margin-right: 20px;
          color: #1AAD19;
        }
      }
    }

  }

</style>


