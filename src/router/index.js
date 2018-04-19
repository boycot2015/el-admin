import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Edit from '@/components/home/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
