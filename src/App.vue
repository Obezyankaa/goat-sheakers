<script setup>
import { onMounted, watch, ref, provide, reactive, computed } from 'vue'
import axios from 'axios'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import CardList from './components/Card/CardList.vue'

const items = ref([])
const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, curr) => acc + curr.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

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

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obg = {
        parentId: item.id,
      }
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, obg)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${item.favoriteId}`)
      item.isFavorite = false
      delete item.favoriteId
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorite = async () => {
  try {
    const { data: favorites } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

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

onMounted(async () => {
  await fetchItems()
  await fetchFavorite()
})
watch(filters, fetchItems)
provide('cart', { cart, closeDrawer, openDrawer, addToCart, removeFromCart })
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевле)</option>
            <option value="-price">По цене (дороже)</option>
          </select>

          <div class="relative">
            <img
              class="absolute top-5 left-4 -translate-y-1/2"
              src="/search.svg"
              alt="иконка поиска"
            />
            <input
              @input="onChangeSearchInput"
              type="text"
              placeholder="Поиск..."
              class="border border-gray-300 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>
      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
  </div>
</template>
