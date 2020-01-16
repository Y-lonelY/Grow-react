<template>
  <div>
    <div>{{ list }}</div>
    <div>{{ pushList }}</div>
    <button @click="add({type: 'add', list: [4,5]})">add</button>
    <button @click="delayAdd({type: 'delayAdd', time: 3000})">clear</button>
  </div>
</template>

<script>
import Vue from "vue"
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"

export default Vue.extend({
  name: "VuexTest",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      list: state => state.list
    }),
    ...mapGetters({
      pushList: "pushList"
    })
  },
  methods: {
    ...mapMutations({
      add: "add"
    }),
    ...mapActions({
      delayAdd: 'delayAdd'
    })
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
})
</script>

<style lang='scss' scoped>
</style>