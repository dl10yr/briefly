import firebase from 'firebase'

const posts = {
	namespaced: true,
  state: {
		posts: [],
		endDate: new Date(),
		startDate: new Date(),
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts; //firebaseが返したユーザー情報
    },
		setStartDate(state, startDate) {
			state.startDate = startDate;
		},
		setEndDate(state, endDate) {
			state.endDate = endDate;
		},
  },
  getters: {
    posts(state) {
      return state.posts;
		},
		endDate(state) {
			return state.endDate;
		},
		startDate(state) {
			return state.startDate;
		}
  },
  actions: {
    async fetchPosts(context){
			firebase
      .firestore()
			.collection("posts")
			.where('created_at', '<=', context.getters.endDate)
      .orderBy("created_at", "desc")
      .limit(10)
      .get()
      .then(querySnapshot => {
				let posts = [];
        querySnapshot.forEach(doc => {
          let data = {
            content: doc.data().content,
						created_at: doc.data().created_at.toDate(),
						uid: doc.data().uid,
						answerCount: doc.data().answerCount,
          };
          posts.push(data);
				});
				if(posts.length !== 0) {
					context.commit('setPosts', posts)
					context.commit('setEndDate', posts.slice(-1)[0].created_at);
					context.commit('setStartDate', posts[0].created_at);
				}	
			});
			
    },
  },

}

export default posts;