<template>
  <div class="friend-card">
    <img src="" alt="" />
    <span>FirstName LastName</span>
    <span>Sex: male/female</span>
    <span>Age: 20</span>
    <span>Friends: 83</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Account } from '../types/Account'

  export default defineComponent({
    name: 'FriendCard',
    props: {
      user: Object as PropType<Account>,
    },
  })
</script>
