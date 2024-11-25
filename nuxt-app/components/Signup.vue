<template>
  <div class="signup-container">
    <h1 class="signup-title">Signup</h1>
    <div class="form-group">
      <label for="first_name">First Name:</label>
      <input type="text" id="first_name" v-model="first_name" />
    </div>
    <div class="form-group">
      <label for="last_name">Last Name:</label>
      <input type="text" id="last_name" v-model="last_name" />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" />
    </div>
    <div class="form-group">
      <label for="username">Username:</label>  
      <input type="text" id="username" v-model="username" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>  
    <div class="form-group">
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" />
    </div>
    <button class="submit-button neon-button" @click="handleSubmit">Submit</button>
  </div>
</template>

<script>
import '@/assets/css/authenticate.css'

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async handleSubmit() {
      const body = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        username: this.username,
        password: this.password
      };
      try {
        const response = await fetch(`${config.public.apiUrl}/sign-up`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (response.status === 200) {
          console.log('Signup successful');
        } else {
          console.error('Signup failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>