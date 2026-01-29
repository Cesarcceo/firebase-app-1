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
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <button @click="logout">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

