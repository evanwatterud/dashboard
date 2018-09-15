import firebaseAuth from './firebase'

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password)
}
// Sign In
export const doSignInWithEmailAndPassword = (email, password) => {
  return firebaseAuth.signInWithEmailAndPassword(email, password)
}
// Sign Out
export const doSignOut = () => {
  return firebaseAuth.signOut()
}
// Password Reset
export const doPasswordReset = (email) => {
  return firebaseAuth.sendPasswordResetEmail(email)
}
// Password Change
export const doPasswordUpdate = (password) => {
  return firebaseAuth.currentUser.updatePassword(password)
}
