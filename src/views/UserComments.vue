<template>
  <div class="container">
    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment"></CommentItem>
  </div>
</template>

<script>
import CommentItem from '@/views/CommentItem.vue'
import axios from "axios";
export default {
  name: 'home',
  components: {
    'CommentItem': CommentItem
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

    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/users/2.json")
      .then(result => {
        localStorage.setItem("userName", result.data.name);
        console.log(localStorage.getItem("userName"));
      })
      .catch(err => {
        this.err = err;
      });
  }
};
</script>