<template>
    <div class="wallet-banner">
        <div class="wallet-container">
            <div class="wallet-label">WALLET</div>
            <div class="wallet-value">
                {{ user.balance }}
            <span class="coin-emoji">🪙</span>
        </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/navbar.css'
defineProps({
    user: {
        type: Object,
        requied: true

    }
});
</script>
