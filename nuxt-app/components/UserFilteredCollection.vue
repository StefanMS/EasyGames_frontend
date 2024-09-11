<template>
    <div>
      <ul>
        <li v-for="item in user_collection" :key="item.id">
          <GameCard :item="item" />
          <p>
            Capacity: {{ item.capacity}} / 100
          </p>
          <p>
            Expires in: 
            days: {{ item.countdown.days}}
            hours: {{ item.countdown.hours}}
          </p>
        </li>
          
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import type { UserCollectionItem } from '~/types/user_collection';
  import GameCard from './GameCard.vue';
  
  const user_collection = ref<UserCollectionItem[]>([]);
  const router = useRouter();

  onMounted(async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const response = await fetch('http://127.0.0.1:8000/user-collections', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user collections');
        }
  
        user_collection.value = await response.json();
      } else {
        console.error('No access token found in localStorage');
        router.push('/collection');
      }
    } catch (error) {
      console.error('Error fetching user collections:', error);
    }
  });
  </script>