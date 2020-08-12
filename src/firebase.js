import firebase from 'firebase'
import store from './store'

const firebaseConfig = {
    apiKey: "AIzaSyAOfx8Lys3GvZmWjYf7_gjpR1R-bZpFoYc",
    authDomain: "answerisoneline.firebaseapp.com",
    databaseURL: "https://answerisoneline.firebaseio.com",
    projectId: "answerisoneline",
    storageBucket: "answerisoneline.appspot.com",
    messagingSenderId: "778161710221",
    appId: "1:778161710221:web:9b0dd0e6b5803abf50eec4",
    measurementId: "G-K0304YCT37"
  };

export default {
    init() {
        firebase.initializeApp(firebaseConfig)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    },
    logout() {
        firebase.auth().signOut()
    },
    onAuth() {
        firebase.auth().onAuthStateChanged(user => {
            user = user ? user : {};
            store.commit('setUser', user);
            store.commit('setLogin', user.uid ? true : false);
        })
    },
    login() {
        // const provider = new firebase.auth.TwitterAuthProvider();
        // firebase.auth().signInWithPopup(provider);
        store.commit('setUser', firebase.auth().currentUser)
        store.commit('setLogin', true)
    },
}