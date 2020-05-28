<template>
  <div class="story">
    <span class="score">{{ contribution.cached_votes_up}}</span>
    <div v-if="contribution.url"><a :href="contribution.url" target="_blank"><a>{{ contribution.title }}</a></a>
    <span class="host">
      ({{ getHost(contribution.url)}})
    </span></div>
    <div v-else><router-link :to="{ path: '/contribution/' + contribution.id }">{{ contribution.title }}</router-link></div>
    <span class="meta">
    <button class="up_button" v-on:click="upVoteContribution()">▲</button>
    <button class="up_button" v-on:click="downVoteContribution()">▼</button>
    by <router-link :to="'/user/' + contribution.user_id">{{ userName }}</router-link> | {{ moment(contribution.created_at).fromNow() }} | 
    <router-link :to="{ path: '/contribution/' + contribution.id }">{{ comments.length }} comments </router-link>
    </span>
  </div>
</template>

<script>

import moment from 'moment'

import axios from "axios";

export default {
  name: 'Item',
  props: [
    'contribution'
  ],
	methods: {
    getHost(href){
    return Object.assign(document.createElement('a'), { href }).host
    },
    moment,
    upVoteContribution() {
      axios.put('https://salty-inlet-98667.herokuapp.com/api/contribucions/vote/' + this.contribution.id, {
        apiKey: localStorage.getItem('apiToken')
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    },
    downVoteContribution() {
      axios.put('https://salty-inlet-98667.herokuapp.com/api/contribucions/downvote/' + this.contribution.id, {
        apiKey: localStorage.getItem('apiToken')
      })
      .then(response => {
        console.log(response.data);
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
      userID: localStorage.getItem("userID"),
      comments: [],
      myDate: null // Set to whatever
    };
  },



  created: function() {
      axios
      .get("https://salty-inlet-98667.herokuapp.com/api/users/" + this.contribution.user_id + ".json")
      .then(result => {
        this.userName = result.data.name;
        //console.log(this.userName);
      })
      .catch(err => {
        this.err = err;
      });

      axios
      .get("https://salty-inlet-98667.herokuapp.com/api/comments/contribucions/" + this.contribution.id + ".json")
      .then(result => {
        this.comments = result.data;
        //console.log(this.comments.length);
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
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.score{
  color: #f60;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
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