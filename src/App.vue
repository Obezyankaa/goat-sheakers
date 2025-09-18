<script setup lang="ts">
import { provide, ref, type Ref, type InjectionKey } from 'vue';
import { DrawerKey } from './types/drawer';

const isOpen = ref(false);
const open = () => { isOpen.value = true; };
const close = () => { isOpen.value = false; };
const toggle = () => { isOpen.value = !isOpen.value; };

provide(DrawerKey, { isOpen, open, close, toggle });
</script>

<template>
  <RouterView />
</template>
