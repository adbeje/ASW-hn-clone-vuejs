<template>
<div>
  <div class="container">
    <h1> Comments: </h1>
    <CommentThread v-for="comment in comments" :key="comment.id" :comment="comment"></CommentThread>
  </div>
   <div class="container">
    <h1> Replies: </h1>
    <ReplyThread v-for="reply in replies" :key="reply.id" :reply="reply"></ReplyThread>
   </div>
  </div>
</template>

<script>
import ReplyThread from '@/views/ReplyThread.vue'
import CommentThread from '@/views/CommentThread.vue'
import axios from "axios";
export default {
  name: 'Threads',
  components: {
    'CommentThread': CommentThread,
    'ReplyThread': ReplyThread   
  },
  data: function() {
    return {
      err: "",
      comments: [],
      replies: []
    };
  },

  created: function() {
    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/comments/users/" + localStorage.getItem("userID") +
            ".json")
      .then(result => {
        this.comments = result.data;
      })
      .catch(err => {
        this.err = err;
      });

         axios
      .get("https://salty-inlet-98667.herokuapp.com/api/replies/users/" + localStorage.getItem("userID") +
            ".json")
      .then(result => {
        this.replies = result.data;
      })
      .catch(err => {
        this.err = err;
      });
  }
};
</script>