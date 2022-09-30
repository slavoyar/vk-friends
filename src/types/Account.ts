export interface Account {
  id: number
  first_name: string
  last_name: string
  deactivated: string
  is_closed: boolean
  can_access_closed: boolean
  photo_100?: string
  sex?: number
  bdate?: string
  friends?: Account[]
}
