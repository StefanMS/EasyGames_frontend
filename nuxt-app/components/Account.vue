<template>
    <div>
      <UserCard v-if="user" :user="user" />
      <TopUp v-if="user" :user_id="user.id" @topUpSuccess="refreshUserData" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useCurrentUser } from '~/composables/useJwt';
  import TopUp from '~/components/TopUp.vue';
  import UserCard from '~/components/UserCard.vue';
  import type { User } from "~/types/user";
  
  const user = ref<User | null>(null);
  
  const refreshUserData = async () => {
    const accessToken = localStorage.getItem('access_token');
    const currentUser = useCurrentUser(accessToken);
  
    if (currentUser) {
      try {
        const userId = currentUser.userId;
        const { data, error } = await useFetch<User>(`http://127.0.0.1:8000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  
        if (error.value) {
          throw new Error(`Failed to fetch user details: ${error.value.message}`);
        }
  
        user.value = data.value;
      } catch (error) {
        console.error('An error occurred while fetching the user details:', error);
      }
    } else {
      console.error('No current user found');
    }
  };
  
  onMounted(() => {
    refreshUserData();
  });
  </script>
  