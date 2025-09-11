export interface Item {
  id: number
  title: string
  price: number
  imageUrl: string
  favoriteId?: null | string
  isAdded?: boolean
}
