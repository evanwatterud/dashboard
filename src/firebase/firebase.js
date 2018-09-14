import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyDU96OOJhp3m7qUKSvYEzC_Fb8BFfzzMN0',
  authDomain: 'dashboard-aee6c.firebaseapp.com',
  databaseURL: 'https://dashboard-aee6c.firebaseio.com/',
  projectId: 'dashboard-aee6c',
  storageBucket: '',
  messagingSenderId: '1009001581262'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export default auth
