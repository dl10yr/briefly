import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts.js'
import user from './user.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user: user,
    posts: posts,
  }
});
