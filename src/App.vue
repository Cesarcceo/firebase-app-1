<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from './stores/user'
  import 'ant-design-vue/dist/reset.css';
  import { ref, watch } from 'vue';

  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()

  const selectedKeys = ref([route.name])
  
  watch(() => route.name, () => selectedKeys.value = [route.name]) 

  const logout = async() => {
    await userStore.logoutUser()
    router.push('/login')
  }
</script>

<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu 
        v-model:selectedKeys="selectedKeys"
        theme="dark" 
        mode="horizontal" 
        :style="{ lineHight: '64px'}"
      >
        <a-menu-item v-if="userStore.userData" key="home"> 
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link  to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item key="logout">
        <a-menu-item v-if="userStore.userData" @click="logout">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px'}">
        <div v-if="userStore.loadingSession">
          <h1>Loading...</h1>
        </div>
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

