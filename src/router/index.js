import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import About from '@/components/about/about'
import HomeEdit from '@/components/home/edit'
import Blog from '@/components/blog/blog'
import BlogEdit from '@/components/blog/edit'
import Mall from '@/components/mall/mall'
import MallEdit from '@/components/mall/edit'
import HomeCategory from '@/components/category/home'
import MallCategory from '@/components/category/mall'
import BlogCategory from '@/components/category/blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/edit',
      name: 'HomeEdit',
      component: HomeEdit
    }, {
      path: '/blog',
      name: 'Blog',
      component: Blog
    }, {
      path: '/about',
      name: 'About',
      component: About
    }, {
      path: '/edit',
      name: 'BlogEdit',
      component: BlogEdit
    }, {
      path: '/mall',
      name: 'Mall',
      component: Mall
    }, {
      path: '/edit',
      name: 'MallEdit',
      component: MallEdit
    }, {
      path: '/category/home',
      name: 'HomeCategory',
      component: HomeCategory
    }, {
      path: '/category/mall',
      name: 'MallCategory',
      component: MallCategory
    }, {
      path: '/category/blog',
      name: 'BlogCategory',
      component: BlogCategory
    }
  ]
})
