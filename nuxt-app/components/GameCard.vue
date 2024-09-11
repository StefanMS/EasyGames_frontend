<template>
    <div class="game-card">
      <h2>{{ item.game_name }}</h2>
      </div>
  </template>
  
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles for the game card here */
  .game-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  </style>
  