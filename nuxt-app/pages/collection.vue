<template>
    <NavBar />
    <div>
      <h1>Collection</h1>
      <ul>
        <li v-for="item in collection" :key="item.game_id">
          {{ item.game_name }}
        </li>
      </ul>
      {{ collection }}
    </div>
    <Footer />
  </template>

<script setup lang="ts">
import type { CollectionItem } from "../types/collection";
const { data: collection } = await useFetch<CollectionItem[]>('http://127.0.0.1:8000/collections')
</script>