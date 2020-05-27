<template>
  <div class="container">
    <item v-for="contribution in contributions" :key="contribution.id" :contribution="contribution"></item>
  </div>
</template>

<script>
import Item from '@/views/Item.vue'
import axios from "axios";
export default {
  name: 'home',
  components: {
    'item': Item
  },
  data: function() {
    return {
      err: "",
      contributions: []
    };
  },

  created: function() {
    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/contribucions/users/" + this.$route.params.id +
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