import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import CallTree from '@/components/CallTree.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/hello_world',
            component: HelloWorld
        },
        {
            path: '/call_tree',
            component: CallTree
        }
    ]
})

