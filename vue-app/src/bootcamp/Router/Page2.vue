<template>
  <div>
      page2
      <button @click="back">back</button>
      <router-view></router-view>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "Page2",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    back() {
      this.$router.push('/page1/uuu')
    }
  }
});
</script>

<style lang='scss' scoped>
</style>