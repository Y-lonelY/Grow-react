<template>
  <div id="app">
    <!-- <LifeCircle /> -->
    <!-- <router-view></router-view> -->
    <!-- <SlotParent /> -->
    <VuexTest />
  </div>
</template>

<script>
// lifecircle
// import LifeCircle from "./bootcamp/LifeCircle";
// slot
// import SlotParent from './bootcamp/Slot/SlotParent';
import VuexTest from './bootcamp/Vuex';

export default {
  name: "app",
  components: {
    // LifeCircl
    // SlotParent
    VuexTest
  },
  mounted: function() {
    console.log(this);
    this.$test();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
