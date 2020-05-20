<template>
  <div class="container">
    <item v-for="contribution in contributions" :key="contribution.id" :contribution="contribution"></item>
  </div>
</template>

<script>
import axios from "axios";
import Item from "@/views/Item.vue";

export default {
  name: "Ask",
  components: {
    item: Item
  },
  data: function() {
    return {
      err: "",
      contributions: []
    };
  },
    created: function() {
    axios
      .get("https://salty-inlet-98667.herokuapp.com/api/asks.json")
      .then(result => {
        this.contributions = result.data;
        console.log(this.$store.state.articles);
      })
      .catch(err => {
        this.err = err;
      });
  }
};
</script>>