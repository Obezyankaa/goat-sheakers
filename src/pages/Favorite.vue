<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Card from '@/components/Card/Card.vue';
import CardList from '@/components/Card/CardList.vue';

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`)
    favorites.value = data
  } catch (error) {
    console.log(error);

  }
})

</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <CardList :items="favorites" is-favorites />
</template>
