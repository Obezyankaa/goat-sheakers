<script setup lang="ts">
import { inject } from 'vue';
import { DrawerKey } from '../types/drawer';


const drawer = inject(DrawerKey);
if (!drawer) {
  // Фолбэк, чтобы не падать, если вдруг провайдера нет (дебаг / тесты)
  throw new Error('Drawer provider is missing. Убедись, что NavBar рендерится под компонентом с provide(DrawerKey, ...)');
}

// теперь пользуемся безопасно
const onClick = () => {
  drawer.close();
};
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white dark:bg-gray-800 w-96 h-full fixed right-0 top-0 z-20 p-8">
    <svg @click="onClick" class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
      width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  </div>
</template>
