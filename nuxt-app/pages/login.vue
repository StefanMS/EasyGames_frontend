<template>
    <div>
        <h1>Login</h1>
    </div>
    <intput v-model="email" placeholder="Email" />
    <intput v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if ="error">{{ error }}</p>
</template>

<script>
//TODO LOGIN logic
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    // async login() {
    //   try {
    //     const response = await this.$axios.post('/login', {
    //       username: this.email,
    //       password: this.password});

    //     // Store token in localStorage
    //     const token = response.data.access_token;
    //     localStorage.setItem('token', token);

    //     // Redirect user after successful login
    //     this.$router.push('/');
    //   } catch (error) {
    //     this.errorMessage = "Invalid email or password";
    //   };
    // }
}
};

</script>