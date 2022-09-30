import { Store } from 'vuex'
import { Account } from './types/Account'

declare module '@vue/runtime-core' {
  interface State {
    users: Array<Account>
    friends: Array<Account>
    rawFriends: Array<Account>
    loadLimit: number
    isLoaded: boolean
    isEmpty: boolean
    currentFriend: number
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
