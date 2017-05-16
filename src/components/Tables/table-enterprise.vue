<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td>序号</td>
                    <td>企业账户编码</td>
                    <td>企业名称</td>
                    <td>门店</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj, index) of list">
                    <td>{{ ++index }}</td>
                    <td>{{ obj.code }}</td>
                    <td>{{ obj.name }}</td>
                    <td class="pointer" @click="goDetail(obj)">{{ obj.num }}家</td>
                    <td>
                        <a class="pointer" @click="goEdit(obj)">编辑</a>
                        <a class="pointer" @click="goConfig(obj)">配置</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
    },
    methods: {
      goDetail(obj) {
        this.$emit('detail', obj);
      },
      goEdit(obj) {
        this.$emit('edit', obj);
      },
      goConfig(obj) {
        this.$emit('config', obj);
      },
    }
  }
</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>


