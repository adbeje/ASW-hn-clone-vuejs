import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  data: {
    userName:'',
    userID:'',
    apiToken:''
  },
  mounted() {
    if (localStorage.userName) {
      this.userName = localStorage.userName;
    }
    if (localStorage.userID) {
      this.userID = localStorage.userID;
    }
    if (localStorage.apiToken) {
      this.apiToken = localStorage.apiToken;
    }
  },
  watch: {
    userInfo(newName, newID, newToken) {
      localStorage.userName = newName;
      localStorage.userID = newID;
      localStorage.apiToken = newToken;
    }
  },
  render: h => h(App)
}).$mount('#app')
