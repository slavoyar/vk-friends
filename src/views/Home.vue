<template>
  <search-box />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SearchBox from '../components/SearchBox.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      SearchBox,
    },
  })
</script>
