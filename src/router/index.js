import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import List from '@/components/List'
import Create from '@/components/Editor'
import Send from '@/components/Send'
import Viewer from '@/components/Viewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/editor',
      name: 'newEditor',
      component: Create
    },
    {
      path: '/editor:id',
      name: 'updateEditor',
      component: Create
    },
    {
      path: '/send:id',
      name: 'send',
      component: Send
    },
    {
      path: '/viewer:id',
      name: 'viewer',
      component: Viewer
    }
  ]
})
