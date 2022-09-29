<template>
  <search-box v-on:add-user="updateUsers" />
  <div class="selected-users">
    <search-item
      style="display: inline-flex"
      v-for="user of users"
      :user="user"
      v-on:click="deleteUser(user)"
    />
  </div>
  <button class="show-friends-button">Show friends</button>
</template>

<script lang="ts">
  import { Account } from 'src/types/Account'
  import { defineComponent } from 'vue'
  import SearchBox from '../components/SearchBox.vue'
  import SearchItem from '../components/SearchItem.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      SearchBox,
      SearchItem,
    },
    data() {
      return {
        users: new Array<Account>(),
      }
    },
    methods: {
      updateUsers(newUser: Account) {
        let isAdded = false
        for (const user of this.users) {
          if (user.id === newUser.id) {
            isAdded = true
            break
          }
        }
        if (!isAdded) {
          this.users.push(newUser)
        }
      },
      deleteUser(user: Account) {
        const index = this.users.indexOf(user)
        this.users.splice(index, 1)
      },
    },
  })
</script>

<style>
  .show-friends-button {
    display: block;
    margin: 10px auto;
  }
</style>