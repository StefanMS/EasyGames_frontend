<template>
    <div class="user-card">
        <div class="user-info">First name: {{ user.first_name }}</div>
        <div class="user-info">Last Name: {{ user.last_name }}</div>
        <div class="user-info">Balance: {{ user.balance }}</div>
        <div class="user-info">Email: {{ user.email }}</div>
    </div>
</template>

<script setup>
import '@/assets/css/user-card.css'
defineProps({
    user: {
        type: Object,
        requied: true

    }
});
</script>