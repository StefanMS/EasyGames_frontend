<template>
    <div>
    <ul>
        <li v-for="item in collection" :key="item.game_id">
            <!-- It's called props-->
            <GameCard :item="item" />
            
        </li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types/collection";
import GameCard from './GameCard.vue';
const { data: collection } = await useFetch<CollectionItem[]>('http://127.0.0.1:8000/collections')
</script>