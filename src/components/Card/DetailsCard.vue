<script setup>
import { ref, onMounted, provide, inject, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';


const route = useRoute();
const item = ref([])

const getData = async (id) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`)
    item.value = data;
    console.log('item после загрузки:', item.value)
  } catch (error) {
    console.log('ошибка при загрузке item:', error)
  }
}
onMounted(async () => {
  await getData(route.params.id)
})
</script>


<template>
  <div>
    <h1 class="font-bold text-3xl">{{ item.title }}</h1>
    <img :src="item.imageUrl" alt="Sneaker" />
    <div class="flex items-center justify-between">
      <p class="font-bold text-lg">{{ item.price }} руб.</p>
      <div class="flex items-center justify-between gap-10">
        <!-- <div class="buttons">
          <button
            class="px-6 py-3 text-white font-semibold rounded-lg bg-lime-500 hover:bg-lime-600 transition-all duration-200 shadow-md"
            v-if="!isInCart" @click="add(item)">
            Добавить в корзину
          </button>
          <button
            class="px-6 py-3 text-white font-semibold rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md"
            v-else @click="remove(item)">
            Удалить из корзины
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
