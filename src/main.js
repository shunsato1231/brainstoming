// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './vuex'
import Firebase from './api/firebase'

if (process.env.NODE_ENV !== 'production') Vue.config.debug = true

sync(store, router)
Firebase.initFirebase()

const app = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

global._App = app
