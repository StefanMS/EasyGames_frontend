<template>
    <div v-if="accessToken">
        <UserFilteredColelction />
    </div>
    <div v-else>
        <Collection />
    </div>
</template>

<script lang="ts">

import { onMounted } from 'vue';

onMounted(() => {
    checkToken();
})


const checkToken = () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
}


</script>