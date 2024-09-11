<template>
    <div>
      <header>NavBar</header>
      <button v-if="!userLoggedIn" @click="handleLogin">Login</button>
      <button v-else @click="handleLogout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const userLoggedIn = ref(false);
  const router = useRouter();
  
  onMounted(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      userLoggedIn.value = true;
    }
  });
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    userLoggedIn.value = false;

  };
  </script>




<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  border-bottom: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

</style>