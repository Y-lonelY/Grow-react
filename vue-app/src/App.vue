<template>
  <div id="app">
    <LifeCircle />
  </div>
</template>

<script>
import LifeCircle from "./bootcamp/LifeCircle";

export default {
  name: "app",
  components: {
    LifeCircle
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
