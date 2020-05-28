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
        <li class="pure-menu-item" v-if= isConnected>
          <router-link class="pure-menu-link" :to="'/user/' + userID">{{userName}}({{karma}})</router-link>
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
        userID: localStorage.getItem("userID"),
        karma: '',
        isConnected: false,
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

            axios.post('https://salty-inlet-98667.herokuapp.com/api/users', {
              name: user.name,
              email: user.email
            })
            .then(response => {
              console.log("Se ha ejecutado correctamente: ");
              console.log(response.data);
              localStorage.setItem("apiToken", response.data.apiKey);
              localStorage.setItem("userName", response.data.name);
              localStorage.setItem("userID", response.data.id);
              this.karma = response.data.karma;
            })
            .catch(err => {
            this.err = err;
            console.log(this.email);
            console.log(this.err);
            });
          }
        )
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
        //Para coger el karma del user

      },
      onLogout() {
        this.isConnected = false;
        localStorage.removeItem("userName");
        localStorage.removeItem("userID");
        localStorage.removeItem("apiToken");
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