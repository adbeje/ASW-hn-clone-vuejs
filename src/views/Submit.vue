<template>
  <div class="container">
      <div class = "user-view">
        <div><span class="label">Title:</span>
          <input type="text" v-model="title" size="50" placeholder="add a title" title>
        </div>
        <br>
        <div><span class="label">Url:</span>
          <input type="text" v-model="url" size="50" placeholder="add an url" url>
        </div>
        <br>
        <div><span class="label">Text:</span>
          <textarea v-model="text" placeholder="add a text" maxlength="100" rows="10" cols="50"> text</textarea>
        </div>
        <pre>
          
        </pre>
        <button v-on:click="submitContribution()">Submit</button>
      </div>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
    name: "Submit",
    data: function() {
      return {
        err: "",
        title: '',
        text: '',
        url: ''
      };
  },
  methods: {
    submitContribution() {
      if (this.title == "") alert("No has puesto titulo");
      if (this.url == "" && this.text == "") {
        alert("Tienes que poner url o text");
      }
      if (this.url !== "" && this.text !== "") {
        alert("Solo puede haber url o text lleno");
      }

      axios.post('https://salty-inlet-98667.herokuapp.com/api/contribucions/', {
          apiKey: localStorage.getItem('apiToken'),
          title: this.title,
          url: this.url,
          text: this.text,
        })
        .then(response => {
          console.log(response.data);
          alert("Your contribution has been submited.")
          this.$router.push('/contribution/' + response.data.id);
        })
        .catch(err => {
          console.log(err);
        });
      }
  }
}
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