<template>
  <div class="container">
    <CommentThread v-for="comment in comments" :key="comment.id" :comment="comment"></CommentThread>
  </div>
</template>

<script>
import CommentThread from '@/views/CommentThread.vue'
import axios from "axios";
export default {
  name: 'home',
  components: {
    'CommentThread': CommentThread
  },
  data: function() {
    return {
      err: "",
      comments: []
    };
  },

  created: function() {
    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/comments/users/" + this.$route.params.id +
            ".json")
      .then(result => {
        this.comments = result.data;
      })
      .catch(err => {
        this.err = err;
      });
  }
};
</script>