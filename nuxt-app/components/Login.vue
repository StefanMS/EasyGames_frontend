<template>
    <div class="login-container">
      <h1 class="login-title">Login</h1>
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
        <button class="submit-button neon-button" type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>  
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import '@/assets/css/authenticate.css'
  
  const username = ref('');
  const password = ref('');
  const error = ref(null);
  const router = useRouter();
  const config = useRuntimeConfig()
  
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${config.public.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username.value,
          password: password.value,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
  
      localStorage.setItem('access_token', data.access_token);
  
      router.push('/user_collection').then(() => {
        window.location.reload();
      });
    } catch (err) {
      error.value = err.message;
    }
  };
  </script>
