<script setup>
// import Drawer from "./components/Drawer.vue";
import Header from "./components/Header.vue";
import CardList from "./components/Card/CardList.vue";
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl mt-14">
    <Header />

    <div class="p-10">
      <h2> Все кроссовки</h2>
      <CardList />
    </div>
  </div>

</template>
