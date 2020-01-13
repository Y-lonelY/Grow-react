<template>
  <div>
      <slot name="test" />
  </div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "Slot",
  data() {
    return {};
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
});
</script>

<style lang='scss' scoped>
</style>