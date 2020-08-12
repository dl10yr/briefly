<template>
    <ul>
      <li v-for="post in posts" :key="post.uid">
        <div class="li-body">
          <div class="li-item">
            <div class="item-content">
              <h6>{{ post.content }}</h6>
            </div>
            <small>{{ post.created_at | moment }}</small>
          </div>
        </div>
      </li>
    </ul>
</template>

<script type="text/babel">
import moment from "moment";
import { mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      user: state => state.user.user,
      posts: state => state.posts.posts,
    })
  },
  methods: {
  },
  filters: {
    moment: function(date) {
      return moment(date).fromNow();
    }
  },

};
</script>

<style>
.loading-bar {
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.top-load-wrapper {
  line-height: 20px;
  text-align: center;
}
.icon-arrow {
  transition: 0.2s;
  transform: rotate(180deg);
}
.icon-loading {
  transform: rotate(0deg);
  animation-name: loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
li {
  cursor: pointer;
}
a.li {
  text-decoration: none;
}
a:link.li {
  color: #000000;
}
a:visited.li {
  color: #000000;
}
li :hover {
  background-color: #f5f5f5;
}
.li-body {
  padding: 5px;
  min-width: 288px;
}
.li-item {
  display: inline-block;
  vertical-align: top;
  max-width: 75%;
}
.item-content {
  width: 100%;
}
img {
  border-radius: 50%;
}
.btn-info {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  transform: translate3d(0, 0, 0);
}
</style>
