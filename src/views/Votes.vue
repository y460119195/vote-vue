<template>
      <div class="content-body">
        <vote-list></vote-list>
      </div>
</template>

<script>
// @ is an alias to /src

import VoteList from '../components/VoteList.vue'

export default {
  name: 'home',
  components: {
    IndexHeader,
    VoteList
  }
}
</script>
