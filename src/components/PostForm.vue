
<template>
  <div>
    <div class="alert alert-success" v-bind:style="{display: post_success }">SENT!</div>
    <form action class="m-1" @submit.prevent="sendPost">
      <input
        type="text"
        class="form-control"
        id="input"
        placeholder="Shorter is Better!!!"
        v-model="input"
        maxlength="20"
        minlength="1"
        required
      />
      <p class="help-block mb-1">{{csCount}}/20</p>
      <button class="btn btn-primary btn-block m-1 p-1" type="submit">POST</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import { setTimeout } from "timers";
export default {
  name: "form-wrapper",
  data() {
    return {
      input: "",
      post_success: "none"
    };
  },
  methods: {
    sendPost() {
      if (
        this.$store.getters.user.uid &&
        this.input.length > 0 &&
        this.input.length < 36
      ) {
        firebase
          .firestore()
          .collection("tifics")
          .add({
            content: this.input,
            name: this.$store.getters.user.displayName,
            icon: this.$store.getters.user.photoURL,
            user_uid: this.$store.getters.user.uid,
            created_at: new Date()
          })
          .then((this.post_success = "block"));
        this.input = "";
        setTimeout(() => {
          this.post_success = "none";
        }, 2000);
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    loginUser() {
      return this.$store.getters.user;
    },
    csCount: function() {
      return this.input.length;
    }
  }
};
</script>

<style scoped>
.active {
  text-align: center;
  z-index: 100;
  position: fixed;
  top: 100px;
}
</style>