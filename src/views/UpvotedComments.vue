<template>
<div>
  <div class="container">
    <h1> Upvoted comments: </h1>
    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment"></CommentItem>
  </div>
    <br>
    <div class="container">
    <h1> Upvoted replies: </h1>
    <ReplyItem v-for="reply in replies" :key="reply.id" :reply="reply"></ReplyItem>
  </div>
</div>
</template>

<script>
import CommentItem from '@/views/CommentItem.vue'
import ReplyItem from '@/views/ReplyItem.vue'
import axios from "axios";
export default {
  name: 'UpvotedComments',
  components: {
    'ReplyItem': ReplyItem,
    'CommentItem': CommentItem
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
      .get("https://salty-inlet-98667.herokuapp.com/api/comments/upvoted/users/" + localStorage.getItem("userID") +
            ".json")
      .then(result => {
        this.comments = result.data;
      })
      .catch(err => {
        this.err = err;
      });
          axios
      .get("https://salty-inlet-98667.herokuapp.com/api/replies/upvoted/users/" + localStorage.getItem("userID") +
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