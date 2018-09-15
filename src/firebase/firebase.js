import firebase from 'firebase/app'
import 'firebase/auth'
import config from './secrets'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const firebaseAuth = firebase.auth()

export default firebaseAuth
