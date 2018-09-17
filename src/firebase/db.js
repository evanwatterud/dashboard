import { db } from './firebase'

export const doCreateUser = (uid, username, email) => db.ref(`users/${uid}`).set({
  username,
  email
})

export const doCreateTodo = (uid, item) => db.ref(`todos/${uid}`).push({
  item
})

export const doRemoveTodo = (uid, key) => db.ref(`todos/${uid}/${key}`).remove()

export const getUserTodos = uid => db.ref(`todos/${uid}`).orderByKey().once('value')

export const onceGetUser = id => db.ref(`users/${id}`).once('value')
