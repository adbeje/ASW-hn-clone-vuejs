<template>
<div>
  <div class="container">
    <h1> Upvoted contribucions: </h1>
    <Item v-for="contribution in contributions" :key="contribution.id" :contribution="contribution"></Item>
  </div>
</div>
</template>

<script>
import Item from '@/views/Item.vue'
import axios from "axios";
export default {
  name: 'UpvotedContributions',
  components: {
    'Item': Item,
  },
  data: function() {
    return {
      err: "",
      contributions: [],
    };
  },

  created: function() {
    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/contribucions/upvoted/users/" + localStorage.getItem("userID") +
            ".json")
      .then(result => {
        this.contributions = result.data;
      })
      .catch(err => {
        this.err = err;
      });
  }
};
</script>