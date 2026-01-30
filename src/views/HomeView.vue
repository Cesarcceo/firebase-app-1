<script setup>
  import { useDatabaseStore } from '../stores/database';
  import FormsDoc from '../components/FormsDoc.vue'

  const databaseStore = useDatabaseStore()

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
        <button class="my-3" @click="databaseStore.removUrl(item.id)">Remove</button>
      </li>
    </ul>
    <FormsDoc/>
  </div>
</template>

