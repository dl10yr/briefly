import firebase from 'firebase'
const user = {
	namespaced: true,
  state: {
    user: {
      uid: ""
    },
    isLogin: false,
  },
  mutations: {
    setUser(state, user) {
        state.user.uid = user.user.uid; //firebaseが返したユーザー情報
    },
    setLogin(state, isLogin) {
        state.isLogin = isLogin; //ログインしてるかどうか true or false
    },
  },
  getters: {
    user(state) {
        return state.user;
    },
    isLogin(state) {
        return state.isLogin;
    },
  },
  actions: {
    async signInAnonymously(context){
      firebase.auth().signInAnonymously()
      .then( user => {
        context.commit('setUser', user);
        context.commit('setLogin', true);
      })
      .catch( () => {
        context.commit('setLogin', false);
      })
    },
  },

}

export default user;