<template>
  <div>
      <div>{{ list }}</div>
      <div>{{ pushList }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  name: "VuexTest",
  data() {
    return {};
  },
  computed: {
      ...mapState({
          list: state => state.list,
      }),
      ...mapGetters({
          pushList: 'pushList'
      }),
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
});
</script>

<style lang='scss' scoped>
</style>