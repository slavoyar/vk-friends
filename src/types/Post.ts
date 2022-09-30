
/**
 * Type defenition for post.
 */
export interface Post {
  id: number
  date: number
  text: string
  likes?: { count: number }
  views?: { count: number }
}
