import { jsonp } from 'vue-jsonp'
import { Account } from './types/Account'

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN
const API = import.meta.env.VITE_API_URL

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
  response: { count: number; items: Array<Account> }
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
    '&fields=photo_100'

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
export async function getUsersByName(value: string, count = 20): Promise<Account[]> {
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
  return response.response.items
}
