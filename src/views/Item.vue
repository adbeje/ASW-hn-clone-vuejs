<template>
  <div class="story">
    <span class="score">{{ contribution.cached_votes_up}}</span>
    <router-link :to="{ path: '/contribution/' + contribution.id }">{{ contribution.title }}<span>{{ contribution.url | host }}</span></router-link><br/>
    <span class="meta">
    by {{ contribution.user_id }} | {{ contribution.created_at }} Ago |  comments
    </span>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: [
    'contribution'
  ]
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