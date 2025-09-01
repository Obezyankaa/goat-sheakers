<script setup>
import { onMounted, watch, ref, provide, reactive, computed } from 'vue'
import axios from 'axios'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import Home from './pages/Home.vue'

const cart = ref([])
const isCreatingOrder = ref(false)
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, curr) => acc + curr.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
    })
    cart.value = []
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
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
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
