<template>
  <div class="searchbox">
    <input
      class="searchbox-input"
      type="text"
      placeholder="Type name or id"
      v-model="value"
    />
    <div class="searchbox-items" v-show="users.length > 0">
      <search-item
        v-for="user of users"
        :user="user"
        v-on:click="updateSelectedUsers(user)"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { jsonp } from 'vue-jsonp'
  import { Account } from '../types/Account'
  import SearchItem from '../components/SearchItem.vue'

  interface ResponseGet {
    response: Array<Account>
  }

  interface ResponseSearch {
    response: { count: number; items: Array<Account> }
  }

  export default defineComponent({
    name: 'SearchBox',
    components: {
      SearchItem,
    },
    emits: ['addUser'],
    data() {
      return {
        users: new Array<Account>(),
        value: '',
        count: 20, //max number of search results
        timer: null as any,
        api: import.meta.env.VITE_API_URL,
        token: import.meta.env.VITE_ACCESS_TOKEN,
      }
    },
    methods: {
      async getUserById() {
        const requestUrl =
          this.api +
          'users.get?v=5.131&' +
          'access_token=' +
          this.token +
          '&user_ids=' +
          this.value +
          '&fields=photo_100'

        const response = (await jsonp(requestUrl)) as ResponseGet
        this.handleResponse(response.response)
      },
      async getUsersByName() {
        const requestUrl =
          this.api +
          'users.search?v=5.131&' +
          'access_token=' +
          this.token +
          '&q=' +
          this.value +
          '&fields=photo_100' +
          '&count=' +
          this.count

        const response = (await jsonp(requestUrl)) as ResponseSearch
        this.handleResponse(response.response.items)
      },
      handleResponse(response: Array<Account>) {
        this.users = []
        console.log(response)
        if (response) {
          for (const item of response) {
            this.users.push(item)
          }
        }
      },
      updateSelectedUsers(user: Account) {
        this.$emit('addUser', user)
        this.users = []
        this.value = ''
      },
    },
    watch: {
      value() {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null as any
        }
        this.timer = setTimeout(() => {
          const numberReg = /^\d+$/
          if (numberReg.test(this.value)) {
            this.getUserById()
          } else if (this.value !== '') {
            this.getUsersByName()
          } else {
            this.users = []
          }
        }, 500)
      },
    },
  })
</script>

<style>
  .searchbox {
    position: relative;
    margin: 50px auto;
    text-align: center;
  }

  .searchbox-input {
    font-size: 14pt;
    width: 300px;
  }

  .searchbox-items {
    background-color: white;
    z-index: 100;
    position: absolute;
    border: 1px solid;
    width: 300px;
    margin-top: 10px;
    max-height: 300px;
    left: calc(50% - 150px);
    overflow-y: scroll;
  }
</style>
