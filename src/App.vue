<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import FriendInfo from './views/FriendInfo.vue'
  import Home from './views/Home.vue'

  export default defineComponent({
    components: {
      Home,
      FriendInfo,
    },
  })
</script>
