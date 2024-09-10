<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username"  
   required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password"  
   v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>  
  
    </div>
  </template>
  
  <script setup>
  import { useLogin } from '@nuxtjs/auth';
  
  const { login, error } = useLogin();
  
  const username = ref('');
  const password = ref('');
  
  const handleSubmit = async () => {
    try {
      await login({ username: username.value, password: password.value });
    } catch (error) {
      console.error(error);
    }
  };
  </script>