<template>
  <div>
      <slot name="title"></slot>
      <slot name="content" :message="say">
          {{say}}
      </slot>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "SlotChildren",
  data() {
    return {
        say: 'hhhhh'
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
});
</script>

<style lang='scss' scoped>
</style>