import firebase from 'firebase'
import moment from 'moment'
import result from './getRelatedImages'


const config = {
  apiKey: 'AIzaSyBRv1tiwEwNyb8wC6tqGIBJYxxeb5Rp2Ao',
  authDomain: 'brainstoming-485f2.firebaseapp.com',
  databaseURL: 'https://brainstoming-485f2.firebaseio.com',
  projectId: 'brainstoming-485f2',
  storageBucket: 'brainstoming-485f2.appspot.com',
  messagingSenderId: '624991355286'
};


// initialize Firebase
firebase.initializeApp(config)
var auth = firebase.auth()
var database = firebase.database()

// variable
var _userInfo = {}
var _userRef = null
var _themes = {}
var _publicThemesRef = null
var _myThemesRef = null
var _fetchedPublicCount = 0
var _fetchedMyselfCount = 0
var _ideas = {}
var _myIdeaRef = null

export default {
  initFirebase () {
    // Initiates Firebase auth and listen to auth state changes.
    auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
  },

  getAuth () {
    return auth.currentUser || {}
  },

  // Signs-in
  signIn () {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  },

  // Signs-out
  signOut () {
    // Sign out of Firebase.
    auth.signOut()
  },

  onAuthStateChanged (user) {
    if (user) { // User is signed in!
      this.fetchUserInfo(user.uid)
        .then(val => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: val.name || user.displayName,
            profilePicUrl: user.photoURL
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        }).catch(() => {
          _userInfo = {
            loggedIn: true,
            uid: user.uid,
            name: user.displayName,
            profilePicUrl: user.photoURL
          }
          _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
        })
    } else {
      _userInfo = {
        loggedIn: false,
        uid: '',
        name: 'guest',
        profilePicUrl: ''
      }
      _App.$store.dispatch('onAuthStateChanged', Object.assign({}, _userInfo))
    }
  },

  fetchUserInfo (uid) {
    return new Promise((resolve, reject) => {
      _userRef = database.ref('users')
      _userRef.child(uid).once('value')
        .then(snapshot => {
          const user = snapshot.val()
          resolve(user)
        }).catch(reject)
    })
  },

  setUserInfo (key, val) {
    return new Promise((resolve, reject) => {
      if (key && val && this.checkSignedInWithMessage()) {
        _userRef = database.ref('users').child(_userInfo.uid).child(key)
        _userRef.set(val)
          .then(() => {
            _userInfo[key] = val
            resolve()
          }).catch(reject)
      }
    })
  },

  checkSignedInWithMessage () {
    if (auth.currentUser) return true
    return false
  },

  fetchTheme (key) {
    return new Promise((resolve, reject) => {
      _publicThemesRef = database.ref('publicThemes').child(key)
      _publicThemesRef.once('value')
        .then(snapshot => {
          const theme = snapshot.val()
          _themes[key] = theme
          resolve({
            theme: Object.assign({}, theme),
            key: key
          })
        }).catch(reject)
    })
  },

  fetchThemes (count, type) {
    return new Promise((resolve, reject) => {
      if (type === 'public') {
        _fetchedPublicCount += count
        _publicThemesRef = database.ref('publicThemes')
        _publicThemesRef.orderByChild('created').limitToLast(_fetchedPublicCount).once('value')
          .then(snapshot => {
            const theme = snapshot.val() || {}
            Object.keys(theme).forEach(key => {
              _themes[key] = theme[key]
            })
            resolve(Object.assign({}, _themes))
          }).catch(reject)
      } else if (type === 'myself' && this.checkSignedInWithMessage()) {
        _fetchedMyselfCount += count
        _myThemesRef = database.ref('themes').child(_userInfo.uid)
        _myThemesRef.orderByChild('created').limitToLast(_fetchedMyselfCount).once('value')
          .then(snapshot => {
            const theme = snapshot.val() || {}
            Object.keys(theme).forEach(key => {
              _themes[key] = theme[key]
              _themes[key].author = {
                uid: _userInfo.uid,
                name: _userInfo.name
              }
            })
            resolve(Object.assign({}, _themes))
          }).catch(reject)
      } else reject('required login for myself timeline')
    })
  },

  addTheme (theme) {
    return new Promise((resolve, reject) => {
      // Check that the user entered a message and is signed in.
      if (theme && this.checkSignedInWithMessage()) {
        _myThemesRef = database.ref('themes').child(_userInfo.uid)
        var key = ''
        const now = parseInt(moment().format('x'))
        _myThemesRef.push({
          title: theme.title,
          created: now,
          modified: now
        }).then(val => {
          key = val.key
          _publicThemesRef = database.ref('publicThemes').child(key)
          return _publicThemesRef.set({
            title: theme.title,
            created: now,
            modified: now,
            author: {
              uid: _userInfo.uid,
              name: _userInfo.name
            }
          })
        }).then(() => {
          _themes[key] = theme
          resolve({
            theme: Object.assign({}, {
              created: now,
              modified: now,
              author: {
                uid: _userInfo.uid,
                name: _userInfo.name
              }
            }, theme),
            key: key
          })
        }).catch(reject)
      }
    })
  },

  deleteTheme (key) {
    return new Promise((resolve, reject) => {
      if (key && this.checkSignedInWithMessage()) {
        _publicThemesRef = database.ref('publicThemes').child(key)
        _publicThemesRef.remove()
          .then(() => {
            _myThemesRef = database.ref('themes').child(_userInfo.uid).child(key)
            return _myThemesRef.remove()
          }).then(() => {
            resolve(key)
            delete _themes[key]
          }).catch(reject)
      }
    })
  },

  updateTheme (key, theme) {
    return new Promise((resolve, reject) => {
      if (theme && this.checkSignedInWithMessage()) {
        _myThemesRef = database.ref('theme').child(theme.author.uid).child(key)
        const now = parseInt(moment().format('x'))
        _myThemesRef.set({
          title: theme.title,
          created: theme.created,
          modified: now
        }).then(() => {
          _publicThemesRef = database.ref('publicThemes').child(key)
          return _publicThemesRef.set({
            title: theme.title,
            created: theme.created,
            modified: now,
            author: {
              uid: theme.author.uid,
              name: theme.author.name
            }
          })
        }).then(() => {
          _themes[key] = theme
          resolve()
        }).catch(reject)
      }
    })
  },

  addIdea (tid, idea) {
  	return new Promise((resolve, reject) => {
			_myIdeaRef = database.ref('ideas').child(tid)
			var iid = ''
			const now = parseInt(moment().format('x'))
      result.getRelatedImages(idea.body)
      .then(image =>{
        _myIdeaRef.push({
  				body: idea.body,
          image0:image[0],
          image1:image[1],
          image2:image[2],
          image3:image[3],
          image4:image[4],
          image5:image[5],
  				created: now,
  				modified: now
  			}).then(val => {
  				iid = val.key
  				_ideas[iid] = idea
  				resolve({
  					idea: Object.assign({}, {
  						created: now,
  						modified: now,
  					}, idea),
  					key: iid
  				})
  			}).catch(reject)
      })
  	})
  },
  fetchIdeas (tid) {
  	return new Promise((resolve, reject) => {
  		_myIdeaRef = database.ref('ideas').child(tid)
  		_myIdeaRef.once('value')
        .then(snapshot => {
          console.log(snapshot)
          const idea = snapshot.val() || {}
          Object.keys(idea).forEach(key => {
            _ideas[key] = idea[key]
          })
          resolve(Object.assign({}, _ideas))
        }).catch(reject)
  	})
  }
}
