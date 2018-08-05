<template>
  <div id="app">
    <IndentedTree/>
  </div>
</template>

<script>
import IndentedTree from './components/IndentedTree.vue'

export default {
  name: 'app',
  components: {
      IndentedTree
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
