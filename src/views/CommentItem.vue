<template>
  <div class="story">
   <div><a >{{ comment.content }}</a></div>

    <div class="meta">
        <button class="up_button" v-on:click="upvoteComment()">▲</button>
        <button class="up_button" v-on:click="downVoteComment()">▼</button> 
        {{ comment.cached_votes_up }} points | 
    by <router-link :to="'/user/' + comment.user_id">{{ userName }}</router-link> | {{ moment(comment.created_at).fromNow() }}
  </div>
  <br>
    <div>
      <textarea v-model="newReply" placeholder="add a reply" maxlength="100" rows="5" cols="25"> newReply</textarea>
    </div>
    <br>
    <div>
      <button v-on:click="addReply()">Add reply</button>
    </div>
    <br>
  <ReplyItem v-for="reply in replies" :key="reply.id" :reply="reply">></ReplyItem>
  </div>
</template>

<script>

import moment from 'moment'
import ReplyItem from '@/views/ReplyItem.vue'
import axios from "axios";

export default {
  name: 'CommentItem',
components: {
    'ReplyItem': ReplyItem
},
  props: [
    'comment'
  ],
	methods: {
  moment,
  upvoteComment() {
  axios.put('https://salty-inlet-98667.herokuapp.com/api/comments/vote/' + this.comment.id, {
    apiKey: localStorage.getItem('apiToken')
  })
    .then(response => {
      console.log(response.data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
  },
  
  downVoteComment() {
    axios.put('https://salty-inlet-98667.herokuapp.com/api/comments/downvote/' + this.comment.id, {
      apiKey: localStorage.getItem('apiToken')
    })
    .then(response => {
      console.log(response.data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
    });
  },

  addReply() {
    axios.post('https://salty-inlet-98667.herokuapp.com/api/replies/comments/' + this.comment.id , {
        apiKey: localStorage.getItem('apiToken'),
        content: this.newReply
      })
      .then(response => {
        console.log(response.data);
        alert("Your reply has been submited.");
        location.reload();
          })
      .catch(err => {
        console.log(err);
      });
  }
  },

  data: function() {
    return {
      err: "",
      userName: "",
      replies: [],
      newReply: "",
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

        axios
      .get("https://salty-inlet-98667.herokuapp.com/api/replies/comments/" + this.comment.id + ".json")
      .then(result => {
        this.replies = result.data;
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
.up_button{
  color: #fff;
  background-color: #f60;
  border-color: rgb(177, 71, 0);
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