<script setup>
defineProps({
  totalPrice: Number,
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-100 px-8 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase dark:text-white">GOAT Sheakers</h2>
          <p class="text-slate-400 dark:text-slate-400">Магазин кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} rub</b>
      </li>
      <router-link to="/favorites">
        <li
          class="flex items-center gap-3 cursor-pointer transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <img src="/heart.svg" alt="cart" />
          <span>закладки</span>
        </li>
      </router-link>
      <li
        class="flex items-center gap-3 cursor-pointer transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        <img src="/profile.svg" alt="cart" />
        <span>профиль</span>
      </li>
    </ul>
  </header>
</template>
