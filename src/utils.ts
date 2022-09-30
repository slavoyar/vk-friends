import { jsonp } from 'vue-jsonp'
import { Account } from './types/Account'
import { Post } from './types/Post'

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN
const API = 'https://api.vk.com/method/'

/**
 * Type for result got with user.get method.
 */
interface ResponseGet {
  response: Array<Account>
}

/**
 * Type for result got with user.search method.
 */
interface ResponseSearch {
  response: { count: number; items: Array<Account | Post> }
}

/**
 * Get user with given id.
 *
 * @param value User id.
 * @returns List of users.
 */
export async function getUserById(value: number): Promise<Account[]> {
  const requestUrl =
    API +
    'users.get?v=5.131&' +
    'access_token=' +
    TOKEN +
    '&user_ids=' +
    value +
    '&fields=photo_100,counters,bdate,sex'

  const response = (await jsonp(requestUrl)) as ResponseGet
  return response.response
}

/**
 * Get given number of users for requested string.
 *
 * @param value Name to search.
 * @param count Number of search results.
 * @returns List of users.
 */
export async function getUsersByName(
  value: string,
  count = 20
): Promise<Account[]> {
  const requestUrl =
    API +
    'users.search?v=5.131&' +
    'access_token=' +
    TOKEN +
    '&q=' +
    value +
    '&fields=photo_100' +
    '&count=' +
    count

  const response = (await jsonp(requestUrl)) as ResponseSearch
  return response.response.items as Account[]
}

/**
 * Get all friends of given user id.
 *
 * @param value User id.
 * @returns List of friends.
 */
export async function getFriendsById(value: number): Promise<Account[]> {
  const requestUrl =
    API +
    'friends.get?v=5.131&' +
    'access_token=' +
    TOKEN +
    '&user_id=' +
    value +
    '&fields=bdate,sex,photo_100'

  const response = (await jsonp(requestUrl)) as ResponseSearch
  return response.response != undefined
    ? (response.response.items as Account[])
    : []
}

/**
 * Get all posts from given user page.
 *
 * @param value Id of current user.
 * @returns Array of posts.
 */
export async function getPosts(value: number): Promise<Post[]> {
  const requestUrl =
    API +
    'wall.get?v=5.131&' +
    'access_token=' +
    TOKEN +
    '&owner_id=' +
    value

  const response = (await jsonp(requestUrl)) as ResponseSearch
  console.log(response.response)
  return response.response != undefined
    ? (response.response.items as Post[])
    : []
}

/**
 * Delay fro given time in ms.
 *
 * @param ms Delay in ms.
 * @returns
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
