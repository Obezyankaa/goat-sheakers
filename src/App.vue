<script setup lang="ts">
import { watch, ref, provide, computed } from 'vue';
import Drawer from './components/Drawer.vue';
import Header from './components/Header.vue';

const cart = ref<Item>([])
const drawerOpen = ref(false)

const totalPrice = computed(() =>
  cart.value?.reduce((acc, curr) => acc + (curr?.price || 0), 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  console.log(item);
  // cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
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

provide('cart', { cart, closeDrawer, openDrawer, addToCart, removeFromCart })
</script>

<template>
  <Drawer v-if="drawerOpen" v-auto-animate :total-price="totalPrice" :vat-price="vatPrice" @create-order="createOrder"
    :is-loading="isCreatingOrder" />
  <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <button @click="addToCart"></button>
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
