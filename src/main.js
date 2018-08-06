import Vue from 'vue'
import 'vue-awesome/icons'
import Icon from "vue-awesome/components/Icon.vue"
import App from './App.vue'
import router from './router'

Vue.component('icon', Icon)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
