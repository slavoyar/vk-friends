<template>
  <div class="post-container">
    <h2>Post id: {{ post?.id }}</h2>
    <p>{{ post?.text }}</p>
    <span>Likes: {{ post?.likes?.count }}</span>
    <span>Views: {{ post?.views?.count }}</span>
    <span>Date: {{ date }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Post } from '../types/Post'

  export default defineComponent({
    name: 'PostItem',
    props: {
      post: Object as PropType<Post>,
    },
    computed: {
      date() {
        let date = 'unknown'
        if (this.post?.date) {
          date = new Date(this.post.date * 1000).toDateString()
        }
        return date
      },
    },
  })
</script>

<style>
  .post-container {
    border: 1px solid;
    margin: 30px;
    padding: 20px;
    border-radius: 10px;
  }
</style>
