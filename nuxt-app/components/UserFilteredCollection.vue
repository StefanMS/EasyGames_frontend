<template>
  <div>

    <div class="search-container">
      <label for="search-input">Search game:</label>
      <input
        id="search-input"
        type="text"
        v-model="searchedItem"
        placeholder="Enter game name..."
        class="search-input"
      />
    </div>

    <ul class="user-collection-grid">
      <li v-for="item in filteredGames" :key="item.id">
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncData } from '#app';
import type { UserCollectionItem } from '~/types/user_collection';
import GameCard from './GameCardUserCollection.vue';
import '@/assets/css/neon-button.css';
import '@/assets/css/user-collection.css';

const config = useRuntimeConfig();
const searchedItem = ref('');

const fetchUserCollection = async () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found in localStorage');
  }

  const response = await fetch(`${config.public.apiUrl}/user-collections`, {
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

const { data: user_collection, refresh } = await useAsyncData<UserCollectionItem[]>(
  'user_collection', 
  fetchUserCollection);


const filteredGames = computed(() => {
  if (!user_collection.value) return [];
  return user_collection.value.filter((game) =>
    game.game_name.toLowerCase().includes(searchedItem.value.toLowerCase())
  );
});

const router = useRouter();

const placeBid = async (game_id: number) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('No access token found in localStorage');
      return;
    }

    const { data, error } = await useFetch(`${config.public.apiUrl}/bids/?game_id=${game_id}`, {
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
