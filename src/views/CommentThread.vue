<template>
  <div class="story">
   <div><a >{{ comment.content }}</a></div>
    <div class="meta">
    by <router-link :to="'/user/' + comment.user_id">{{ userName }}</router-link> | {{ moment(comment.created_at).fromNow() }}
    | <router-link :to="'/contribution/' + comment.contribucion_id">{{ "parent" }}</router-link>
  </div>
  </div>
</template>

<script>

import moment from 'moment'
import axios from "axios";

export default {
  name: 'CommentItem',
components: {
},
  props: [
    'comment'
  ],
methods: {
  moment,
  },

  data: function() {
    return {
      err: "",
      userName: "",
      myDate: null // Set to whatever
    };
  },

  created: function() {
      axios
      .get("https://salty-inlet-98667.herokuapp.com/api/users/" + this.comment.user_id + ".json")
      .then(result => {
        this.userName = result.data.name;
        })
      .catch(err => {
        this.err = err;
      });
  }
}

</script>

<style scoped>
.story {
  background-color: #fff;
  padding: 20px 5px 20px 20px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.story a {
  color: #34495e;
  font-weight: 600;
  text-decoration: none;
}
.story a span {
  font-size: .85em;
  margin-left: 10px;
  color: #828282;
}
.story .meta {
  font-size: .85em;
  color: #828282;
}
</style>