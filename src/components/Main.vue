<script setup lang="ts">
import { inject, onMounted, provide, ref, watch } from 'vue';
import axios from 'axios';
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'
import CardItem from './ui/CardItem.vue';
import Drawer from './Drawer.vue';
import type { Item } from '../types/item';
import { DrawerKey } from '../types/drawer';

const items = ref<Item[]>([]);

const fetchItems = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/items`);
    items.value = data;
  } catch (error) {
    console.log(error);
  }
}

const fetchFavorite = async () => {
  try {
    const { data: favorites } = await axios.get(`${import.meta.env.VITE_API_URL}/favorites`)

    const favorite = items.value.map((item) => {
      const favorite = favorites.find((favorite: Item) => favorite.favoriteId === item.id)

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

const addToFavorite = async (item: Item) => {
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
      toast.success('Товар добавлен в избранное')

    } else {
      console.log('айтем который в delete', item);
      await axios.delete(`${import.meta.env.VITE_API_URL}/favorites/${item.favoriteId}`)
      item.isFavorite = false
      toast.info('Товар удалён из избранное')

    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchItems();
  fetchFavorite();
});

const drawer = inject(DrawerKey);
if (!drawer) {
  // Фолбэк, чтобы не падать, если вдруг провайдера нет (дебаг / тесты)
  throw new Error('Drawer provider is missing. Убедись, что NavBar рендерится под компонентом с provide(DrawerKey, ...)');
}
// watch(
//   () => drawer.isOpen.value,
//   (newVal, oldVal) => {
//     console.log('Drawer state changed:', oldVal, '→', newVal);
//   }
// );
</script>

<template>
  <Toaster theme="system" />
  <Drawer v-if="drawer.isOpen.value" />

  <!-- <section class="grid grid-cols-4 gap-5" v-auto-animate>
    <CardItem v-for="item in items" :key="item.id" :item="item" @add-to-favorite="addToFavorite" />
  </section> -->
</template>
