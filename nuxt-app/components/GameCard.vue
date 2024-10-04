<template>
    <div class="game-card">
      <div class="game-card-info">
            {{ item.game_name }}
            <div class="game-card-image">
            <img :src="item.image_url" alt="Game Image" class="game-image" />
            </div>
            <p>Capacity: {{ item.capacity }} / 100</p>
            <p>
              Expires in: 
              <span>days: {{ item.countdown.days }}</span>
              <span>hours: {{ item.countdown.hours }}</span>
            </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import '@/assets/css/game-card.css'
  defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  </script>