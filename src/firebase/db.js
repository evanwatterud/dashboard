import { db } from './firebase'

export const doCreateUser = (id, username, email) => db.ref(`users/${id}`).set({
  username,
  email
})

export const onceGetUser = id => db.ref(`users/${id}`).once('value')
