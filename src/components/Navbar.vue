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
          {{userName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
      data: function() {
    return {
      err: "",
      userName: localStorage.getItem("userName")
    };
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
</style>