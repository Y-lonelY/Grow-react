<template>
  <div>
      page2's children page: {{name}}
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "PageChildren",
  props: ['name'],
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
      
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      console.log('children', this.$route);
  }
});
</script>

<style lang='scss' scoped>
</style>