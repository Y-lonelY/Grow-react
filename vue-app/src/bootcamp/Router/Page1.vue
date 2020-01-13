
<template>
  <div>
    <p>current path: {{path}}</p>
    <p>current user: {{name}}</p>
    <router-link to="/page2">page2</router-link>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "Page1",
  data() {
    return {};
  },
  computed: {
    path: function() {
      return this.$route.path;
    },
    name: function() {
      console.log(this.$route);
      return this.$route.params.name ? this.$route.params.name : 'null';
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    console.log(this);
  }
});
</script>

<style lang='scss' scoped>
</style>