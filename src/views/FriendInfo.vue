<template>
  <router-link to="/">Back</router-link>
  <div class="container">
    <friend-card class="main-card" :user="user" />
    <div class="friends-container">
      <h2>Common friends</h2>
      <search-item
        style="display: inline-flex"
        v-for="user of friends"
        :user="user"
      />
    </div>
    <div class="posts">
      <h2>Posts</h2>
      <post-item v-for="post of posts" :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Account } from '../types/Account'
  import { Post } from '../types/Post'
  import { store } from '../store'
  import * as utils from '../utils'

  import SearchItem from '../components/SearchItem.vue'
  import FriendCard from '../components/FriendCard.vue'
  import PostItem from '../components/PostItem.vue'

  export default defineComponent({
    name: 'FriendInfo',
    components: {
      SearchItem,
      FriendCard,
      PostItem,
    },
    data() {
      return {
        user: {} as Account,
        friends: new Array<Account>(),
        posts: new Array<Post>(),
      }
    },
    async mounted() {
      for (const user of store.state.friends) {
        if (user.id === Number(this.$route.params.id)) {
          this.user = user
          break
        }
      }

      if (this.user.friends != null) {
        for (const friend of this.user.friends) {
          for (const user of store.state.users) {
            if (user.id === friend.id) {
              this.friends.push(user)
            }
          }
        }
      }

      this.posts = await utils.getPosts(this.user.id)
    },
  })
</script>

<style>
  .main-card {
    display: block;
    margin: 0 auto;
  }
</style>
