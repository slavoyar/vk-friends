<template>
  <div class="searchbox">
    <input
      class="searchbox-input"
      type="text"
      placeholder="Type name or id"
      v-model="value"
    />
    <div class="searchbox-items" v-show="items.length > 0">
      <button class="searchbox-item" v-for="item of items">
        <img :src="item.photo_100" class="searchbox-img" />
        {{ item.first_name }} {{ item.last_name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { jsonp } from 'vue-jsonp'
  import { Account } from '../types/Account'

  interface ResponseGet {
    response: Array<Account>
  }

  interface ResponseSearch {
    response: { count: number; items: Array<Account> }
  }

  export default defineComponent({
    name: 'SearchBox',
    data() {
      return {
        items: new Array<Account>(),
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
        console.log(response)
        this.handleResponse(response.response.items)
      },
      handleResponse(response: Array<Account>) {
        this.items = []
        console.log(response)
        if (response) {
          for (const item of response) {
            this.items.push(item)
          }
          console.log(this.items)
        }
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
            this.items = []
          }
        }, 500)
      },
    },
  })
</script>

<style>
  .searchbox {
    margin: 50px auto;
    text-align: center;
  }

  .searchbox-input {
    font-size: 14pt;
    width: 300px;
  }

  .searchbox-items {
    border: 1px solid;
    width: 300px;
    margin: 10px auto 0;
    max-height: 300px;
    overflow-y: scroll;
  }

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
