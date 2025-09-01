<script setup>
// import { inject } from 'vue'
import Card from './Card.vue'

const props = defineProps({
  items: Array,
  isFavorites: Boolean,
})

// const addToFavorite = inject('addToFavorite')
console.log(props.items, 'ITEMS');

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card v-for="item in items" :key="item.id" :id="item.id" :title="item.title" :imageUrl="item.imageUrl"
      :price="item.price" :isFavorite="item.isFavorite" :isAdded="item.isAdded" :onClickFavorite="isFavorites ? null
        : () => emit('addToFavorite', item)" :onClickAdd="isFavorites ? null : () => emit('addToCart', item)" />
  </div>
</template>
