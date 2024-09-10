<template>
    <NavBar />
    <div>
        <h1>Account</h1>
    </div>
    <Footer />
</template>

<script setup lang="ts">
import type { User } from '../types/user';

// TODO get current user
// const { data: user } = await useFetch<User>('http://127.0.0.1:8000/user/')
</script>