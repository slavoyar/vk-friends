<template>
  <div class="friend-card" :style="getColor">
    <img :src="user?.photo_100" alt="" />
    <span>{{ user?.first_name }} {{ user?.last_name }}</span>
    <span>Sex: {{ getSex }}</span>
    <span>Age: {{ getAge }}</span>
    <span>Friends: {{ user?.friends?.length }}</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Account } from '../types/Account'

  export default defineComponent({
    name: 'FriendCard',
    props: {
      user: Object as PropType<Account>,
      colorRatio: Number,
    },
    computed: {
      getSex() {
        let result = 'Unknown'
        switch (this.user?.sex) {
          case 1:
            result = 'Female'
            break
          case 2:
            result = 'Male'
            break
          default:
            break
        }
        return result
      },
      getAge() {
        let result = null
        if (this.user?.bdate) {
          const splitted = this.user.bdate.split('.')
          if (splitted.length === 3) {
            const day = Number(splitted[0])
            const month = Number(splitted[1])
            const year = Number(splitted[2])
            const birthdate = new Date(year, month, day)
            let timeDiff = Math.abs(Date.now() - birthdate.getTime())
            result = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25)
          }
        }
        return result == null ? 'Unknown' : result
      },
      getColor() {
        const ratio = this.colorRatio != null ? this.colorRatio / 2 : 0
        return `background-color: rgba(0,0,0,${ratio})`
      },
    },
  })
</script>

<style>
  .friend-card {
    display: inline-block;
    width: 200px;
    margin: 10px;
    padding: 5px;
    text-align: center;
    border: 1px solid;
  }

  span {
    display: block;
  }
</style>
