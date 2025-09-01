<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Card from '@/components/Card/Card.vue';

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`)

    favorites.value = data
    console.log(data);
  } catch (error) {
    console.log(error);

  }
})

</script>

<template>
  <Card v-for="item in favorites" :key="item.id" :title="item.title" :image-url="item.imageUrl" :price="item.price" />
</template>
