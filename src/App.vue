<template>
  <div id="app">
    <TreeView :tree="tree"/>
  </div>
</template>

<script>
import TreeView from "./components/TreeView.vue"

const callTreeData = require("./assets/render_index.json")

export default {
    name: 'app',
    data: function () {
        return {
            tree: callTreeData
        }
    },
    components: {
        TreeView
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
