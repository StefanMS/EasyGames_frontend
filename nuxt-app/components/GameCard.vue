<template>
    <div class="game-card">
      <h2>{{ item.game_name }}</h2>
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
