<template>
    <div>
    <ul>
        <li v-for="item in collection" :key="item.game_id">
            <!-- <GameCard :item="item" /> -->
             <div>
                {{ item.game_name }}
             </div>
            
        </li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types/collection";
import GameCard from './GameCard.vue';

const config = useRuntimeConfig()
const { data: collection } = await useFetch<CollectionItem[]>(`${config.public.apiUrl}/collections`)
</script>