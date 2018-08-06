<template>
    <div id="app">
        <div>
            <router-link to="/hello_world">Hello World</router-link>
        </div>
        <div>
            <router-link to="/call_tree">Call Tree</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {
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
