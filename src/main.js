import Vue from 'vue'
import 'vue-awesome/icons'
import Icon from "vue-awesome/components/Icon.vue";
import App from './App.vue'

Vue.component('icon', Icon)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
