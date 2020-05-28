<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="container">
      <router-link to="/" class="pure-menu-heading pure-menu-link"
        >Hacker News</router-link
      >
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link class="pure-menu-link" to="/newest">News</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link class="pure-menu-link" to="/asks">Asks</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link class="pure-menu-link" to="/threads">Threads</router-link>
        </li>
        <li class="pure-menu-item" v-if= isConnected>
          <router-link class="pure-menu-link" :to="'/user/' + userID">{{userName}}({{karma}})</router-link>
        </li>
        <li class="pure-menu-item">
          <facebook-login class="button"
            appId="727005264774100"
            @login="onLogin"
            @logout="onLogout"
            @get-initial-status="getUserData"
            @sdk-loaded="sdkLoaded">
          </facebook-login>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import facebookLogin from 'facebook-login-vuejs'
  import axios from "axios";
  export default {
    name: "Navbar",
    data: function() {
      return {
        err: "",
        userName: localStorage.getItem("userName"),
        isConnected: false,
        name: '',
        email: '',
        FB: undefined
      };
    },
    components: {
      facebookLogin
    },
    methods: {
      getUserData() {
        this.FB.api('/me', 'GET', { fields: 'name,email' },
          user => {
            this.email = user.email;
            this.name = user.name;
            console.log("Facebook email: " + this.email);
            console.log("Facebook name: " + this.name);
          }
        )
        axios.post('https://salty-inlet-98667.herokuapp.com/api/users/email/', {
          email: 'adriaventura.herce@gmail.com'
        })
        .then(response => {
          console.log("INICIO SESION" + this.email);
          localStorage.setItem("userName", this.name);
          localStorage.setItem("apiToken", response.data.apiKey);
          localStorage.setItem("userId", response.data.id);
          console.log(response.data.apiKey);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.post('https://salty-inlet-98667.herokuapp.com/api/users', {
          name: this.name,
          email: this.email
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(err => {
        this.err = err;
        console.log(this.email);
        console.log(this.err.response.status);
      });
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
      },
      onLogout() {
        this.isConnected = false;
      }
    }
  };
</script>

<style scoped>
  .pure-menu {
    background-color: #e17842;
  }
  .pure-menu a {
    color: white;
  }
  .button {
    margin: auto;
  }
</style>