<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="flex items-centre justify-between m-5 p-3">
    <RouterLink to="/">Home</RouterLink>
    <div class="flex gap-3">
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/sneakers/43">details</RouterLink>
      <RouterLink to="/login">login</RouterLink>
    </div>
  </nav>
</template>
