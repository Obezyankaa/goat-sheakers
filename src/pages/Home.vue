<script setup>
import { inject, onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from '../components/Card/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/items`, {
      params,
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorite = async () => {
  try {
    const { data: favorites } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`)

    const favorite = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.favoriteId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
    items.value = favorite
  } catch (err) {
    console.log(err)
  }
}


const addToFavorite = async (item) => {
  try {
    console.log('addToFavorite');
    if (!item.isFavorite) {
      console.log('айтем который передали в функцию', item);
      const obg = {
        ...item,
        isFavorite: true,
        favoriteId: item.id
      }
      console.log('этот объект уходит в боди на апи', obg);
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, obg)
      item.isFavorite = true
    } else {
      console.log('айтем который в delete', item);
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${item.favoriteId}`)
      item.isFavorite = false
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  await fetchItems()
  await fetchFavorite()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }))
})

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }))
})
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="price">По цене (дешевле)</option>
        <option value="-price">По цене (дороже)</option>
      </select>

      <div class="relative">
        <img class="absolute top-5 left-4 -translate-y-1/2" src="/search.svg" alt="иконка поиска" />
        <input @input="onChangeSearchInput" type="text" placeholder="Поиск..."
          class="border border-gray-300 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" />
      </div>
    </div>
  </div>
  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
</template>
