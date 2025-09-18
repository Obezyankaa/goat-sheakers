export interface Item {
  id: number
  title: string
  imageUrl: string
  price: number
  isFavorite?: boolean // 👈 Добавь это
  favoriteId?: number // 👈 Это тоже
}
