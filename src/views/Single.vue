<template>
  <div class="container">
    <p>Score: {{ contribution.cached_votes_up }}</p>
    <div v-if="contribution.url">
      <a :href="contribution.url" target="_blank"><h2>{{ contribution.title }} ({{ getHost(contribution.url)}})</h2></a>
    </div>
    <div v-else>
      <h2>{{ contribution.title }}</h2>
      <span class="meta">
        <button class="up_button" v-on:click="upVoteContribution(contribution.id)">▲</button>
        <button class="up_button" v-on:click="downVoteContribution(contribution.id)">▼</button>
        by <router-link :to="'/user/' + contribution.user_id">{{ userName }}</router-link> | {{ moment(contribution.created_at).fromNow() }} | 
        {{ comments.length }} comments
      </span>
      <p>{{ contribution.text }}</p>
    </div>
    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment">></CommentItem>
  </div>
</template>

<script>
    import moment from 'moment'
    import CommentItem from '@/views/CommentItem.vue'
    import axios from "axios";
    export default {
    name: "Single",
    components: {
    'CommentItem': CommentItem
  },

  methods: {
    moment,
    getHost(href){
    return Object.assign(document.createElement('a'), { href }).host
    },
    upVoteContribution(id) {
      axios.put('https://salty-inlet-98667.herokuapp.com/api/contribucions/vote/' + id, {
        apiKey: localStorage.getItem('apiToken')
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    },
    downVoteContribution(id) {
      axios.put('https://salty-inlet-98667.herokuapp.com/api/contribucions/downvote/' + id, {
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
        contribution: {},
        comments: [],
        userNamesComment: [],
        userName: "",
        };
    },

  created: function() {
      axios.get(
            "https://salty-inlet-98667.herokuapp.com/api/contribucions/" +
            this.$route.params.id +
            ".json"
        )
      .then(res => {
            this.contribution = res.data;
            axios
            .get("https://salty-inlet-98667.herokuapp.com/api/users/" + this.contribution.user_id + ".json")
            .then(result => {
              this.userName = result.data.name;
              console.log(this.userName);
            })
            .catch(err => {
              this.err = err;
              console.log(err);
            });
            //console.log(res.data);
            this.contribution.comments = [];
            axios
                .get("https://salty-inlet-98667.herokuapp.com/api/comments/contribucions/" + this.$route.params.id + ".json")
                .then(res => {
                this.$nextTick(() => {
                    //console.log(res.data);
                    this.comments = res.data;
                });
                })
                .catch(err => {
                console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
      });
      console.log("ASTOR GARCIA" + this.contribution.user_id)


    }
    };
</script>

<style scoped>
.comment-wrap {
  margin-bottom: 1.25rem;
  display: table;
  width: 100%;
  min-height: 5.3125rem;
}
.photo {
  padding-top: 0.625rem;
  display: table-cell;
  width: 3.5rem;
}
.photo .avatar {
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;
  background-size: contain;
}
.comment-block {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
.comment-block textarea {
  width: 100%;
  resize: none;
}
.comment-text {
  margin-bottom: 1.25rem;
}
.bottom-comment {
  color: #acb4c2;
  font-size: 0.875rem;
}
.comment-date {
  float: left;
}
.comment-actions {
  float: right;
}
.comment-actions li {
  display: inline;
  margin: -2px;
  cursor: pointer;
}
.comment-actions li.complain {
  padding-right: 0.75rem;
  border-right: 1px solid #e1e5eb;
}
.comment-actions li.reply {
  padding-left: 0.75rem;
  padding-right: 0.125rem;
}
.comment-actions li:hover {
  color: #0095ff;
}
</style>