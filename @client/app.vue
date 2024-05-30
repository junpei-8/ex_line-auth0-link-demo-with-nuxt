<script setup lang="ts">
import './utils/liff'; // NOTE: LIFF を初期化

useHead({
  title: 'Line Auth0 Link Demo With Nuxt',
});
</script>

<template>
  <main class="main">
    <NuxtPage />
  </main>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style>
body {
  margin: 0;
}

#__nuxt {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh;
}
</style>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
