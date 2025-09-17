<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="flex items-centre justify-between m-5 p-3 shadow-md dark:shadow-white rounded-4xl">
    <RouterLink to="/" v-slot="{ isExactActive }">
      <span
        :class="['text-[rgb(91,99,109)] dark:text-white transition-colors duration-300 hover:text-sky-400 dark:hover:text-sky-400', isExactActive ? 'font-medium underline underline-offset-4 text-black dark:text-sky-400' : '']">
        Главная
      </span>
    </RouterLink>
    <div class="flex gap-3">
      <RouterLink to="/favorite" v-slot="{ isActive }">
        <span
          :class="['text-[rgb(91,99,109)] dark:text-white transition-colors duration-300 hover:text-sky-400 dark:hover:text-sky-400', isActive ? 'font-medium underline underline-offset-4 text-black dark:text-sky-400' : '']">
          Избранное
        </span>
      </RouterLink>
      <RouterLink to="/basket" v-slot="{ isActive }">
        <span
          :class="['text-[rgb(91,99,109)] dark:text-white transition-colors duration-300 hover:text-sky-400 dark:hover:text-sky-400', isActive ? 'font-medium underline underline-offset-4 text-black dark:text-sky-400' : '']">
          Корзина
        </span>
      </RouterLink>
      <!-- <RouterLink to="/sneakers/43">Корзина</RouterLink> -->
      <RouterLink to="/login" v-slot="{ isActive }">
        <span
          :class="['text-[rgb(91,99,109)] dark:text-white transition-colors duration-300 hover:text-sky-400 dark:hover:text-sky-400', isActive ? 'font-medium underline underline-offset-4 text-black dark:text-sky-400' : '']">
          Зарегестрироваться/Войти
        </span>
      </RouterLink>
    </div>
  </nav>
</template>


<style scoped>
/* nav {
  background-color: rgb(247, 248, 250);
  color: rgb(91, 99, 109);
} */
</style>
