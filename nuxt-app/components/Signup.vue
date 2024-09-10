<template>
    <div class="signup-container">
      <h1>Signup</h1>
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
        <input type="password" id="confirmPassword"  
   v-model="confirmPassword" />
      </div>
      <button class="submit-button"  
   @click="handleSubmit">Submit</button>
    </div>
  </template>

<script>

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
    }

    , methods: {
        async handleSubmit() {
            const body = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                username: this.username,
                password: this.password
            };
            try {
                const response = await fetch('http://127.0.0.1:8000/sign-up', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)

                });
                if (response.status === 200) {
                    console.log('Signup successful');
                } else {
                    console.error('Signup failed');
                } }
            catch (error) {
                    console.error(error);
                }
            }
        }
    }


</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.form-group label {
  width: 120px;
  margin-right: 10px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;  

  margin-top: 10px;
}
</style>
