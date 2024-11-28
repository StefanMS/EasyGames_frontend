<template>
  <div class="navbar">
    <header class="navbar-header">EasyGames</header>
    <nav class="navbar-links">
      <button class="navbar-button" @click="navigateHome">Home</button>
      <button v-if="userLoggedIn" class="navbar-button" @click="navigateAccount">Account</button>
      <button v-if="!userLoggedIn" class="navbar-button" @click="handleSignup">Sign Up</button>
      <button v-if="!userLoggedIn" class="navbar-button" @click="handleLogin">Login</button>
      <button v-else class="navbar-button" @click="handleLogout">Logout</button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import "@/assets/css/navbar-header.css";

const userLoggedIn = ref(false);
const router = useRouter();

const checkLoginStatus = () => {
  const token = localStorage.getItem('access_token');
  userLoggedIn.value = !!token;
};

const updateLoginStatus = () => {
  userLoggedIn.value = !!localStorage.getItem('access_token');
};

onMounted(() => {
  checkLoginStatus();

  window.addEventListener('storage', updateLoginStatus);
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', updateLoginStatus);
});

const handleLogin = () => {
  router.push('/login');
};

const handleLogout = () => {
  localStorage.removeItem('access_token');
  userLoggedIn.value = false;
  router.push('/collection');
};

const navigateAccount = () => {
  router.push('/account');
};

const navigateHome = () => {
  if (userLoggedIn.value) {
    router.push('/user_collection');
  } else {
    router.push('/collection');
  }
};

const handleSignup = () => {
  router.push('/register');
};

</script>
