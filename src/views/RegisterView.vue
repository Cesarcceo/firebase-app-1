<script setup>
  import { ref } from 'vue'
  import { useUserStore } from '../stores/user'
  
  const email = ref('')
  const password = ref('')

  const userStore = useUserStore()

  const handleSubmit = () => {
    if(!email.value || password.value.length < 8){
      return alert('Email or Passwor incorrect')
    }
    userStore.registeruser(email.value, password.value)
  }

</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="enter email" v-model.trim="email">
      <input type="password" placeholder="enter password" v-model.trim="password">
      <button type="submit" >Create user</button>
    </form>
  </div>
</template>

