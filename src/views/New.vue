<template>
  <div class="container">
    <item v-for="contribution in contriubtions" :key="contribution.id" :contribution="contribution"></item>
  </div>
</template>

<script>
import Item from '@/views/Item.vue'
export default {
  name: 'New',
  components: {
    'item': Item
  },
  data: function () {
    return {
        err: '',
        contributions: this.$store.state.newContributions
    }
  },
  created: function () {
    if (this.$store.state.newContributions.length === 0) this.$store.dispatch('fetch_new_stories')
  }
}
</script>