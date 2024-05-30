<script setup lang="ts">
const user = useUserStore();
</script>

<template>
  <div class="page">
    <div v-if="user.isLoading" class="loading">Loading...</div>

    <div v-else-if="user.error" class="error">
      <div>{{ user.error.message }}</div>
      <div>{{ user.error.statusMessage }}</div>
      <button class="button" @click="user.logout">Logout</button>
    </div>

    <div v-else-if="!user.data" class="login">
      <button class="button" @click="user.login">Login</button>
    </div>

    <div v-else class="content">
      <img class="avatar" :src="user.data.picture || undefined" alt="Avatar" />
      <h1 class="name">{{ user.data.name }}</h1>
      <button class="button" @click="user.logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;
}
.button:hover {
  background-color: #45a049;
}
.button:active {
  background-color: #388e3c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.content,
.error {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 24px;
}

.name {
  margin-top: 0;
  margin-bottom: 32px;
}
</style>
