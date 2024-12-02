<template>
  <div class="navbar">
    <nav class="navbar-links">
      <span v-if="user" class="navbar-welcome">Welcome, {{ user.first_name }}!</span>
      <div>EasyGames</div>
      <button class="navbar-button" @click="navigateHome">HOME</button>

      <button v-if="!userLoggedIn" class="navbar-button" @click="handleSignup">Sign Up</button>
      <button v-if="!userLoggedIn" class="navbar-button" @click="handleLogin">Login</button>

      <div v-if="userLoggedIn" class="navbar-dropdown">
        <div class="navbar-account">
          <div class="navbar-account-icon"></div>
        </div>

        <div class="dropdown-content">
          <button class="dropdown-item" @click="navigateAccount">Account</button>
          <button class="dropdown-item" @click="handleLogout">Logout</button>
        </div>
      </div>

    </nav>
  </div>

    <GameBanner />
    <WalletBanner v-if="user" :user="user" />
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import "@/assets/css/navbar.css";
import { useCurrentUser } from '~/composables/useJwt';
import type { User } from "~/types/user";

const userLoggedIn = ref(false);
const router = useRouter();
const user = ref<User | null>(null);
const config = useRuntimeConfig()

const checkLoginStatus = async () => {
  const accessToken = localStorage.getItem('access_token');
  userLoggedIn.value = !!accessToken;
  const currentUser = useCurrentUser(accessToken);

  if (currentUser) {
    try {
      const userId = currentUser.userId;
      const response = await fetch(`${config.public.apiUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      user.value = data as User;

      await nextTick(); // Ensures updates are reflected in the DOM
    } catch (error) {
      console.error('An error occurred while fetching the user details:', error);
    }
  } else {
    console.error('No current user found');
  }
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
  user.value = null;
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
