<template>
<div>
  <div class="container">
    <h1> Contributions: </h1>
    <br>
    <Item v-for="contribution in contributions" :key="contribution.id" :contribution="contribution"></Item>
  </div>
   <div class="container">
    <h1> Comments: </h1>
    <br>
    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment"></CommentItem>
   </div>
  </div>
</template>

<script>
import CommentItem from '@/views/CommentItem.vue'
import Item from '@/views/Item.vue'
import axios from "axios";
export default {
  name: 'home',
  components: {
    'CommentItem': CommentItem,
    'Item': Item   
  },
  data: function() {
    return {
      err: "",
      comments: [],
      contributions: []

    };
  },

  created: function() {
    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/comments/users/" + localStorage.getItem("userId") +
            ".json")
      .then(result => {
        this.comments = result.data;
      })
      .catch(err => {
        this.err = err;
      });

         axios
      .get("https://salty-inlet-98667.herokuapp.com/api/contribucions/users/" + localStorage.getItem("userId") +
            ".json")
      .then(result => {
        this.contributions = result.data;
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