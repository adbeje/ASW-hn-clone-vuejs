<template>
  <div class="container">
    <div class = "user-view">
      <template v-if="user">
      <h1>User : {{ user.name }}</h1>
      <ul class="meta">
        <li><span class="label">created:</span> {{ moment(user.created_at).fromNow() }} </li>
        <li><span class="label">karma:</span> {{ user.karma }}</li>
        
      </ul>
      <td v-if = "user.id == userID" class="meta">
        <li><span class="label">about:</span>
          <textarea v-model="user.about" placeholder="add something about you" rows="10" cols="50">
            user.about
          </textarea></li>
        <br>
        <button v-on:click="submitChanges(user.about)">Update</button>
      </td>
      <ul v-else>
        <li v-if="user.about" v-html="user.about" class="about">about: </li>
      </ul>
        <pre>
          
        </pre>
        <span class="meta">
        <router-link :to="'/contribucions/users/' + user.id">{{ "submissions" }}</router-link>
        <br>
        <router-link :to="'/comments/users/' + user.id">{{ "comments" }}</router-link>
        </span>
      </template>
      <template v-else-if="user === false">
        <h1>User not found.</h1>
      </template>
    </div>
  </div>
</template>

<script>
    import moment from 'moment'
    import axios from "axios";
    export default {
    name: "Single",

  methods: {
    moment,
    submitChanges(about) {
      axios.put('https://salty-inlet-98667.herokuapp.com/api/users/' + localStorage.getItem('userID'), {
        about: about,
        apiKey: localStorage.getItem('apiToken')
      })
      .then(response => {
        console.log(response.data);
        alert("Your information has been updated.")
      })
      .catch(err => {
        console.log(err);
        console.log(localStorage.getItem('userID') + "   " + localStorage.getItem('apiToken'));
        console.log(about);
      });
    }
  },

    data: function() {
        return {
        user: {},
        userID: localStorage.getItem("userID")
        };
    },
    created: function() {
        axios
        .get(
            "https://salty-inlet-98667.herokuapp.com/api/users/" +
            this.$route.params.id +
            ".json"
        )
        .then(res => {
            this.user = res.data;
                    })
        .catch(err => {
            console.log(err);
        });
    }
    };
</script>

<style lang="stylus">
.user-view
  background-color #fff
  box-sizing border-box
  padding 2em 3em
  h1
    margin 0
    font-size 1.5em
  .meta
    list-style-type none
    padding 0
  .label
    display inline-block
    min-width 4em
  .about
    margin 1em 0
  .links a
    text-decoration underline

</style>