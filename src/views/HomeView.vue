<script setup>
  import { useDatabaseStore } from '../stores/database';
  import FormsDoc from '../components/FormsDoc.vue'
  import { useRouter } from 'vue-router';

  const databaseStore = useDatabaseStore()
  const router = useRouter()  

  databaseStore.getUrls()
</script>

<template>
  <div>
    <h1>Home</h1>
    <p v-if="databaseStore.loadingDoc">loading...</p>
    <ul v-else>
      <li v-for="item in databaseStore.documents" :key="item.id">
        {{item.id}}
        <br>
        {{ item.name }}
        <br>
        {{ item.short }}
        <br>
        <button @click="databaseStore.removUrl(item.id)">Remove</button>
        <button @click="router.push(`/edit/${item.id}`)">Edit</button>
      </li>
    </ul>
    <FormsDoc/>
  </div>
</template>

