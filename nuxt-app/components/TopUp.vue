<template>
    <div>
      <button class="neon-button" @click="showModal = true">Top Up</button>
  
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>Top Up Your Account</h2>
          <input v-model.number="amount" type="number" placeholder="Enter amount" />
          <button class="neon-button" @click="handleTopUp">Confirm Top Up</button>
          <button class="close-button" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  import { ref } from 'vue';
  
  import '@/assets/css/neon-button.css'
  import '@/assets/css/topup-modal.css'
  
  const amount = ref(0);
  const showModal = ref(false);
  const emit = defineEmits(['topUpSuccess']);
  
  const props = defineProps({
    user_id: {
      type: Number,
      required: true,
    },
  });
  
  const handleTopUp = async () => {
    if (amount.value > 0) {
      try {
        const { data, error } = await useFetch(`http://127.0.0.1:8000/users/${props.user_id}/top-up/${amount.value}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            amount: amount.value,
          }),
        });
  
        if (error.value) {
          throw new Error(`Top-up failed: ${error.value.message}`);
        }
  
        console.log('Top Up successful:', data.value);
        emit('topUpSuccess');
        closeModal();
  
      } catch (err) {
        console.error('Error during top-up:', err);
      }
    } else {
      console.error('Amount must be greater than zero.');
    }
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  </script>
  
  