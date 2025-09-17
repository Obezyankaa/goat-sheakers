<script setup="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
// import type { Item } from '../types/item';

const items = ref([]);

const getData = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/items`);
    items.value = data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getData();
});


</script>

<template>
  <h1>main</h1>
  <ul>
    <li v-for="item in items" :key="item.id">
      <img :src="item.imageUrl" :alt="item.title" width="120" />
      <h2>{{ item.title }}</h2>
      <p>{{ item.price }} ₽</p>
    </li>
  </ul>
</template>
