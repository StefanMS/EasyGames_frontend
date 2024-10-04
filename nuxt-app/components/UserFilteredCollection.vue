<template>
  <div>
    <ul class="user-collection-grid">
      <li v-for="item in user_collection" :key="item.id">
        <div class="game-card-container">
          <GameCard :item="item" />
          <button v-if="!item.enrolled_user" class="neon-button-pink" @click="placeBid(item.id)">Enroll</button>
          <button v-else class="neon-button-purple" @click="placeBid(item.id)">Enroll again</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncData } from '#app';
import type { UserCollectionItem } from '~/types/user_collection';
import GameCard from './GameCard.vue';
import '@/assets/css/neon-button.css';
import '@/assets/css/user-collection.css';

const fetchUserCollection = async () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found in localStorage');
  }

  const response = await fetch('http://127.0.0.1:8000/user-collections', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user collections');
  }

  return response.json();
};

const { data: user_collection, refresh } = await useAsyncData<UserCollectionItem[]>('user_collection', fetchUserCollection);

const router = useRouter();

const placeBid = async (game_id: number) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    const { data, error } = await useFetch(`http://127.0.0.1:8000/bids/?game_id=${game_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: {
        "game_id": game_id,
      },
    });

    if (error.value) {
      throw new Error(`Failed to place bid: ${error.value.message}`);
    }

    console.log('Bid placed successfully:', data.value);
    
    await refresh();
  } catch (error) {
    console.error('Error placing bid:', error);
  }
};

onMounted(async () => {
  await refresh();
});

</script>
