<template>
    <div>
    <ul class="user-collection-grid">
        <li v-for="item in collection" :key="item.game_id">
            <GameCardCollection :item="item" />            
        </li>
    </ul>
    </div>
</template>

<script setup lang="ts">
import type { CollectionItem } from "~/types/collection";
import GameCardCollection from './GameCardCollection.vue';

const config = useRuntimeConfig()
const { data: collection } = await useFetch<CollectionItem[]>(`${config.public.apiUrl}/collections`)
</script>