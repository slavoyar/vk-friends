<template>
  <div class="container">
    <search-box v-on:add-user="updateUsers" />
    <div class="selected-users">
      <search-item
        style="display: inline-flex"
        v-for="user of $store.state.users"
        :user="user"
        v-on:click="deleteUser(user)"
      />
    </div>
    <button class="show-friends-button" v-on:click="showFriends">
      Show friends
    </button>

    <div class="cards-container">
      <friend-card
        v-for="friend of $store.state.friends"
        v-on:click="cardClickHandler(friend)"
        :user="friend"
        :colorRatio="computeColor(friend)"
      />
    </div>
    <button
      class="load-more-button"
      v-show="$store.state.isLoaded && !$store.state.isEmpty"
      v-on:click="loadMoreFriends"
    >
      Load more
    </button>
  </div>
</template>

<script lang="ts">
  import { Account } from 'src/types/Account'
  import { defineComponent } from 'vue'
  import * as utils from '../utils'

  //components
  import SearchBox from '../components/SearchBox.vue'
  import SearchItem from '../components/SearchItem.vue'
  import FriendCard from '../components/FriendCard.vue'

  //progress wheel
  import { useLoading } from 'vue3-loading-overlay'
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
  import { store } from '../store'

  export default defineComponent({
    name: 'Home',
    components: {
      SearchBox,
      SearchItem,
      FriendCard,
    },
    methods: {
      updateUsers(newUser: Account) {
        let isAdded = false
        for (const user of store.state.users) {
          if (user.id === newUser.id) {
            isAdded = true
            break
          }
        }
        if (!isAdded) {
          store.state.users.push(newUser)
        }
      },
      deleteUser(user: Account) {
        const index = store.state.users.indexOf(user)
        store.state.users.splice(index, 1)
      },
      async createFriendsArray() {
        store.state.rawFriends = []
        for (const user of store.state.users) {
          const response = await utils.getFriendsById(user.id)
          if (response) {
            store.state.rawFriends = store.state.rawFriends.concat(response)
          }
        }

        store.state.rawFriends = store.state.rawFriends.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        )
        store.state.rawFriends = store.state.rawFriends.filter(
          (el) => !store.state.users.find((rm) => rm.id === el.id)
        )
        store.state.rawFriends.sort((a: Account, b: Account) =>
          a.first_name.localeCompare(b.first_name)
        )
      },
      async loadMoreFriends() {
        const loader = useLoading()
        loader.show({ width: 200, height: 200 })

        store.state.isLoaded = false
        for (
          let i = store.state.currentFriend;
          i < store.state.currentFriend + store.state.loadLimit && i < store.state.rawFriends.length;
          i++
        ) {
          // Too many requests if we wnt to show number of friends.
          // So, delay used.
          const friendsArr = await utils.getFriendsById(store.state.rawFriends[i].id)
          store.state.rawFriends[i].friends = friendsArr
          await utils.delay(200)
          store.state.friends.push(store.state.rawFriends[i])
        }
        store.state.currentFriend += store.state.loadLimit
        if (store.state.currentFriend >=store.state.rawFriends.length - 1) {
          store.state.isEmpty = true
        }
        store.state.isLoaded = true

        loader.hide()
      },
      async showFriends() {
        store.state.friends = []
        store.state.currentFriend = 0
        await this.createFriendsArray()
        await this.loadMoreFriends()
      },
      computeColor(friend: Account) {
        if (friend.friends == null) {
          return 0
        }
        const usersNumber = store.state.users.length
        let commonFriends = -1
        for (const person of friend.friends) {
          for (const user of store.state.users) {
            if (user.id === person.id) {
              commonFriends++
            }
          }
        }
        return commonFriends / (usersNumber - 1)
      },
      cardClickHandler(friend: Account) {
        this.$router.push(`/info/${friend.id}`)
      },
    },
  })
</script>

<style>

  .show-friends-button {
    display: block;
    margin: 10px auto;
  }

  .load-more-button {
    display: block;
    margin: 10px auto;
  }
</style>
