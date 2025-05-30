<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>404 Страница не найдена</h2>

      <p style="text-align: center; color: black;">Извините, эта страница не найдена</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 2rem 0;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

button {
  background: none;
  border: none;
  color: #4a6baf;
  cursor: pointer;
  text-decoration: underline;
}
</style>
