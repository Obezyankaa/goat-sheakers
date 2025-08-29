<script setup>
import { onMounted, watch, ref, provide, reactive } from 'vue'
import axios from 'axios'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import CardList from './components/Card/CardList.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  item.isFavorite = !item.isFavorite
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
provide('addToFavorite', addToFavorite)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
    <Header />

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
      <CardList :items="items" @addToFavorite="addToFavorite" />
    </div>
  </div>
</template>
