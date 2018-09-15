import { authentication } from './firebase'

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return authentication.createUserWithEmailAndPassword(email, password)
}
// Sign In
export const doSignInWithEmailAndPassword = (email, password) => {
  return authentication.signInWithEmailAndPassword(email, password)
}
// Sign Out
export const doSignOut = () => {
  return authentication.signOut()
}
// Password Reset
export const doPasswordReset = (email) => {
  return authentication.sendPasswordResetEmail(email)
}
// Password Change
export const doPasswordUpdate = (password) => {
  return authentication.currentUser.updatePassword(password)
}
