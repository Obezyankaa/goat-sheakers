<script setup lang="ts">
import { watch, ref, provide, computed } from 'vue';
import Drawer from './components/Drawer.vue';
import Header from './components/Header.vue';
import type { Item } from './types/item';
import { CartKey } from './types/cart'

const cart = ref<Item[]>([])
const drawerOpen = ref(false)


// переписать функции для прайсво и передать в компонент корзины
// const totalPrice = computed(() =>
//   cart.value?.reduce((acc, curr) => acc + (curr?.price || 0), 0)
// )
// const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = (): void => {
  drawerOpen.value = false
}

const openDrawer = (): void => {
  drawerOpen.value = true
}

const addToCart = (item: Item): void => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item: Item): void => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide(CartKey, { cart: cart?.value, closeDrawer, openDrawer, addToCart, removeFromCart })
</script>

<template>
  <Drawer v-if="drawerOpen" v-auto-animate @create-order="createOrder" :is-loading="isCreatingOrder" />
  <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
    <Header @open-drawer="openDrawer" />
    <button @click="addToCart"></button>
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
