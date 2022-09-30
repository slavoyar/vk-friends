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
  import * as utils from '../utils'
  import { Account } from '../types/Account'
  import SearchItem from '../components/SearchItem.vue'

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
      }
    },
    methods: {
      async getUserById() {
        this.users = await utils.getUserById(Number(this.value))
      },
      async getUsersByName() {
        this.users = await utils.getUsersByName(this.value)
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
