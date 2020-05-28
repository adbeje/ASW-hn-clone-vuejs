<template>
  <div class="reply">
   <div><a >{{ reply.content }}</a></div>
    <div class="meta">
    by <router-link :to="'/user/' + reply.user_id">{{ userName }}</router-link> | {{ moment(reply.created_at).fromNow() }} 
  </div>
  </div>
</template>

<script>

import moment from 'moment'
import axios from "axios";

export default {
  name: 'ReplyItem',

  props: [
    'reply'
  ],
	methods: {
  moment,
  },

  data: function() {
    return {
      err: "",
      userName: "",
      replies: [],
      myDate: null // Set to whatever
    };
  },



  created: function() {
      axios
      .get("https://salty-inlet-98667.herokuapp.com/api/users/" + this.reply.user_id + ".json")
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
.reply {
  background-color: #fff;
  padding: 20px 5px 20px 20px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.reply a {
  color: #34495e;
  font-weight: 600;
  text-decoration: none;
}
.reply a span {
  font-size: .85em;
  margin-left: 10px;
  color: #828282;
}
.reply .meta {
  font-size: .85em;
  color: #828282;
}
</style>