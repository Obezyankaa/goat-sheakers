<script setup>
defineProps({
  totalPrice: Number,
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-100 px-8 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">GOAT Sheakers</h2>
        <p class="text-slate-400">Магазин кроссовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex item-center gap-3 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} rub</b>
      </li>
      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
        <img src="/heart.svg" alt="cart" />
        <span>закладки</span>
      </li>
      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
        <img src="/profile.svg" alt="cart" />
        <span>профиль</span>
      </li>
    </ul>
  </header>
</template>
