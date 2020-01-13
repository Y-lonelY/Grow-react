<template>
  <div>
    <p>hello</p>
    <input type="text" name id v-focus />
    <SlotChildren>
      <template v-slot:title>
        <div>i am the title</div>
      </template>
      <template v-slot:content="slotProps">
        <div>i am the content, {{slotProps.message}}</div>
      </template>
    </SlotChildren>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import SlotChildren from "./SlotChildren.vue";
import { mixinTest } from "../Plugins/mixinTest";

export default Vue.extend({
  name: "SlotParent",
  components: {
    SlotChildren
  },
  mixins: [mixinTest],
  data() {
    return {
      name: "yh"
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