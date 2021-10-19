<template>
  <div class="home">
    <ListUsers />
  </div>
</template>

<script>
// @ is an alias to /src
import ListUsers from '@/components/ListUsers.vue'

export default {
  name: 'Home',

  components: {
    ListUsers,
  }
}
</script>
