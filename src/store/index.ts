import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { Account } from '../types/Account'

// define your typings for the store state
export interface State {
  users: Array<Account>
  friends: Array<Account>
  rawFriends: Array<Account>
  loadLimit: number
  isLoaded: boolean
  isEmpty: boolean
  currentFriend: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    users: new Array<Account>(),
    friends: new Array<Account>(),
    rawFriends: new Array<Account>(),
    loadLimit: 30,
    isLoaded: false,
    isEmpty: false,
    currentFriend: 0,
  },
})

export function useStore () {
  return baseUseStore(key)
}