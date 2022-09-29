<template>
  <button class="searchbox-item">
    <img :src="user?.photo_100" class="searchbox-img" />
    {{ user?.first_name }} {{ user?.last_name }}
  </button>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Account } from '../types/Account'

  export default defineComponent({
    name: 'SearchItem',
    props: {
      user: Object as PropType<Account>,
    },
  })
</script>

<style>
  .searchbox-img {
    width: 30px;
  }

  .searchbox-item {
    display: block;
    background-color: white;
    border: 0;
    cursor: pointer;
    font-size: 14pt;
    height: 30px;
    margin: 5px;
  }
</style>
