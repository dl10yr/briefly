<template>
  <div id="app">
    <div id="nav">
      <h1>答えは一行</h1>
      <router-link to="/">Home</router-link> |
      <router-link to="/new">New</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  
  methods: {
    ...mapActions([
      'user/signInAnonymously',
      'posts/fetchPosts'
    ])
  },
  mounted () {
    this['user/signInAnonymously']()
    this['posts/fetchPosts']()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 500px;
  margin: 0 auto;
  width: 95%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
