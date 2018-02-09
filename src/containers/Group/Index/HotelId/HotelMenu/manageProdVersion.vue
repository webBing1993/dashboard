<!--产品版本页-->
<template>
  <div>
    <div class="module-wrapper">
      <span>产品版本</span>
      <el-select class="el-right" v-model="versionVal" placeholder="请选择自动通过值">
        <el-option
          v-for="(obj, index) of list"
          :key="index"
          :label="obj.version_name"
          :value="obj.version_name">
        </el-option>
      </el-select>
      <div class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

    export default {
        name: 'prodVersion',
        data () {
            return {
                list: [],
                versionVal:''
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
        watch:{
            configData(val){
                console.log('hehhe:',val)
            }
        },
        methods: {
            ...mapActions ([
                'getProdVersionList',
                'goto',
                'getConfig',
                'patchConfig'
            ]),
            //获取产品版本列表
            getList () {
                this.getProdVersionList ({
                    offset: 0,
                    limit: 0,
                    onsuccess: body => {
                        this.list = body.data;
                        console.log ('获取产品版本列表：', body.data);
                    }
                })
            },
            getConfigs(){
                this.getConfig({
                    hotel_id: this.$route.params.hotelid,
                    onsuccess: body => {
                    }
                })
            },
            save(){
                this.patchConfig({
                    hotel_id: this.$route.params.hotelid,
                    data:{product_version:this.versionVal},
                    onsuccess: body => {
                    }
                })
            }
        },
        mounted () {
            this.getList ();
            this.getConfigs()
        }
    }
</script>
<style scoped lang="less">
  .module-wrapper {
    padding:5rem;
    span{
      margin-right: 1rem;
    }
    .el-right{
      width: 50%;
    }
    .dialog-footer{
      margin-top: 2rem;
      margin-left: 36%;
      .el-button{
        width:15rem;
        background-color: #04c54b;
        border: none;
      }
    }
  }
</style>

