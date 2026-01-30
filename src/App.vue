<script setup>
  import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

  const userStore = useUserStore()
  const router = useRouter()

  const logout = async() => {
    await userStore.logoutUser()
    router.push('/login')
  }
</script>

<template>
  <div>
    <h1>APP Base</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link v-if="userStore.userData" to="/">Home</router-link> | 
      <router-link v-if="!userStore.userData" to="/login">Login</router-link> |
      <router-link v-if="!userStore.userData" to="/register">Register</router-link> |
      <button v-if="userStore.userData" @click="logout">Logout</button>
    </nav>
    <div v-else>
      <h1>Loading...</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

