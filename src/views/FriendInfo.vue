<template>
  <h1>Friends info {{ $route.params.id }}</h1>
  <router-link to="/">Home</router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FriendInfo",
});
</script>
