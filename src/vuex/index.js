import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from './../api/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase'

var database = firebase.database()

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  user: {
    loggedIn: false,
    uid: '',
    name: '',
    profilePicUrl: ''
  },
  themes: {},
  ideas: []
}

const mutations = {
  onAuthStateChanged (state, { user }) {
    state.user = user
  },

  setUser (state, { key, val }) {
    Vue.set(state.user, key, val)
  },

  setTheme (state, { key, theme }) {
    Vue.set(state.themes, key, theme)
  },

  setThemes (state, { themes }) {
    state.themes = themes || {}
  },

  deleteTheme (state, { key }) {
    Vue.delete(state.themes, key)
  },

  setIdea (state, { key, idea }) {
    Vue.set(state.ideas, key, idea)
  },

  setIdeas (state, { ideas }) {
    state.ideas = ideas || {}
  },

  ...firebaseMutations
}

const actions = {
  onAuthStateChanged ({ commit }, user) {
    commit('onAuthStateChanged', { user })
  },

  signIn () {
    Firebase.signIn()
  },

  signOut () {
    Firebase.signOut()
  },

  setUserInfo ({ commit, state }, { key, val }) {
    return new Promise((resolve, reject) => {
      if (state.user.loggedIn) { // is signed in. Firebase
        Firebase.setUserInfo(key, val)
          .then(() => {
            commit('setUser', { key, val })
            resolve()
          }).catch(reject)
      } else { // is signed out. Localstrage
        reject('still dev for guest')
      }
    })
  },

  fetchTheme ({ commit, state }) {
    Firebase.fetchTheme(state.route.params.id)
      .then(obj => {
        commit('setTheme', {
          key: obj.key,
          theme: obj.theme
        })
      })
  },

  fetchThemes ({ commit }, { count, type }) {
    if (state.user.loggedIn || type === 'public') { // is signed in. Firebase
      Firebase.fetchThemes(count, type)
        .then(themes => {
          commit('setThemes', { themes })
        })
    } else { // is signed out. Localstrage
    }
  },

  addTheme ({ commit, state }, theme) {
    return new Promise((resolve, reject) => {
      if (state.user.loggedIn) { // is signed in. Firebase
        Firebase.addTheme(theme)
          .then(obj => {
            commit('setTheme', {
              key: obj.key,
              theme: obj.theme
            })
            resolve(obj.key)
          }).catch(err => {
            reject()
          })
      } else { // is signed out. Localstrage
        reject('still dev for guest')
      }
    })
  },

  deleteTheme ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.user.loggedIn) { // is signed in. Firebase
        Firebase.deleteTheme(state.route.params.id)
          .then(key => {
            commit('deleteTheme', { key })
            resolve()
          }).catch(reject)
      } else { // is signed out. Localstrage
        reject('still dev for guest')
      }
    })
  },

  updateTheme ({ commit, state }, theme) {
    return new Promise((resolve, reject) => {
      if (state.user.loggedIn) { // is signed in. Firebase
        const key = state.route.params.id
        Firebase.updateTheme(key, theme)
          .then(() => {
            commit('setTheme', { key, theme })
            resolve(key)
          }).catch(reject)
      } else { // is signed out. Localstrage
        reject('still dev for guest')
      }
    })
  },

  addIdea ({ state }, idea) {
  	return new Promise((resolve, reject) => {
  		const key = state.route.params.id
  		Firebase.addIdea(key, idea)
  			.then(obj => {
  				resolve(obj.key)
  			}).catch(err => {
  				reject()
  			})
  	})
  },

  fetchIdeas: firebaseAction(({ bindFirebaseRef, state }) => {
  	const tid = state.route.params.id
  	const ideaRef = database.ref('ideas').child(tid)
  	bindFirebaseRef('ideas', ideaRef)
  })
}

const getters = {
  themes: state => state.themes,
  currentThemeID: ({ route }) => route.params.id,
  currentTheme: state => {
    return state.route.params.id
      ? state.themes[state.route.params.id]
      : {}
  },
  ideas: state => state.ideas,
  user: state => state.user,
  currentUserName: state => state.user.name,
  currentUserId: state => state.user.uid
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
