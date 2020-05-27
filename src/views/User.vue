<template>
  <div class="user-view">
    <template v-if="user">
      <h1>User : {{ user.name }}</h1>
      <ul class="meta">
        <li><span class="label">Created:</span> {{ moment(user.created_at).fromNow() }} </li>
        <li><span class="label">Karma:</span> {{ user.karma }}</li>
        <li v-if="user.about" v-html="user.about" class="about"></li>
      </ul>
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
</template>

<script>
    import moment from 'moment'
    import axios from "axios";
    export default {
    name: "Single",

  methods: {
    moment
  },

    data: function() {
        return {
        user: {},
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