<template>
  <div class="container">
    <search-box v-on:add-user="updateUsers" />
    <div class="selected-users">
      <search-item
        style="display: inline-flex"
        v-for="user of users"
        :user="user"
        v-on:click="deleteUser(user)"
      />
    </div>
    <button class="show-friends-button" v-on:click="showFriends">
      Show friends
    </button>

    <div class="cards-container">
      <friend-card
        v-for="friend of friends"
        :user="friend"
        :colorRatio="computeColor(friend)"
      />
    </div>
    <button
      class="load-more-button"
      v-show="isLoaded && !isEmpty"
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

  export default defineComponent({
    name: 'Home',
    components: {
      SearchBox,
      SearchItem,
      FriendCard,
    },
    data() {
      return {
        users: new Array<Account>(),
        friends: new Array<Account>(),
        rawFriends: new Array<Account>(),
        loadLimit: 30,
        isLoaded: false,
        isEmpty: false,
        currentFriend: 0,
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
      async createFriendsArray() {
        this.rawFriends = []
        for (const user of this.users) {
          const response = await utils.getFriendsById(user.id)
          if (response) {
            this.rawFriends = this.rawFriends.concat(response)
          }
        }

        this.rawFriends = this.rawFriends.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        )
        this.rawFriends = this.rawFriends.filter(
          (el) => !this.users.find((rm) => rm.id === el.id)
        )
        this.rawFriends.sort((a: Account, b: Account) =>
          a.first_name.localeCompare(b.first_name)
        )
      },
      async loadMoreFriends() {
        const loader = useLoading()
        loader.show({ width: 200, height: 200 })

        this.isLoaded = false
        for (
          let i = this.currentFriend;
          i < this.currentFriend + this.loadLimit && i < this.rawFriends.length;
          i++
        ) {
          // Too many requests if we wnt to show number of friends.
          // So, delay used.
          const friendsArr = await utils.getFriendsById(this.rawFriends[i].id)
          this.rawFriends[i].friends = friendsArr
          await utils.delay(200)
          this.friends.push(this.rawFriends[i])
        }
        this.currentFriend += this.loadLimit
        if (this.currentFriend >= this.rawFriends.length - 1) {
          this.isEmpty = true
        }
        this.isLoaded = true

        loader.hide()
      },
      async showFriends() {
        this.friends = []
        this.currentFriend = 0
        await this.createFriendsArray()
        await this.loadMoreFriends()
      },
      computeColor(friend: Account) {
        if (friend.friends == null) {
          return 0
        }
        const usersNumber = this.users.length
        let commonFriends = -1
        for (const person of friend.friends) {
          for (const user of this.users) {
            if (user.id === person.id) {
              commonFriends++
            }
          }
        }
        return commonFriends / (usersNumber - 1)
      },
    },
  })
</script>

<style>
  .container {
    width: 70%;
    margin: 0 auto;
  }

  .show-friends-button {
    display: block;
    margin: 10px auto;
  }

  .load-more-button {
    display: block;
    margin: 10px auto;
  }
</style>
