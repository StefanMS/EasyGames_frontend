<template>
    <div>
      <UserCard v-if="user" :user="user" />
    </div>
</template>

<script setup lang="ts">
import { useCurrentUser } from '~/composables/useJwt';
import type { User } from "~/types/user";

const accessToken = localStorage.getItem('access_token');
const currentUser = useCurrentUser(accessToken);

let user: User | null = null;

if (currentUser) {
  try {
    const userId = currentUser.userId;
    const { data, error } = await useFetch<User>(`http://127.0.0.1:8000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    if (error.value) {
      throw new Error(`Failed to fetch user details: ${error.value.message}`);
    }

    user = data.value;

  } catch (error) {
    console.error('An error occurred while fetching the user details:', error);
  }
} else {
  console.error('No current user found');
}

</script>
