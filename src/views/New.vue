<template>
  <div>
    <v-app>
      <v-card>
        <v-card-title>質問・相談を記入してください</v-card-title>
        <v-card-text>
          <v-form ref="new_form">
            <v-textarea
              v-model="text1"
              counter
              label="質問・相談内容"
              :rules="[required, limit_length]"
            >
            </v-textarea>
          </v-form>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text v-on:click="submit">送信する</v-btn>
          <span v-if="success">送信成功！</span>
        </v-card-actions>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';


const getUniqueStr = () => {
    var strong = 1000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}

export default {
  data() {
    return {
      text1: "",
      success: false,
      required: value => !!value || "必ず入力してください",
      limit_length: value => value.length <= 300 && value.length >= 10 || "10字以上300字以内で入力してください"
    }
  },
  methods: {
    submit() {
      if (this.$refs.new_form.validate()) {
        const random = Math.floor(Math.random() * 1000);
        const postId = getUniqueStr();
        const data = {
          content: this.text1,
          postId: postId,
          uid: this.user.uid,
          random: random,
          created_at: new Date(),
          answerCount: 0,
        }

        firebase.firestore().collection('posts')
        .doc(postId)
        .set(data)
        .then(() => {
          this.$refs.new_form.reset()
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
    })
  },
}
</script>