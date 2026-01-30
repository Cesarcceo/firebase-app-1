<script setup>
  import { useDatabaseStore } from '../stores/database';

  const databaseStore = useDatabaseStore()

  databaseStore.getUrls()
</script>

<template>
  <div>
    <h1>Home</h1>
    <p v-if="databaseStore.loadingDoc">loading...</p>
    <ul v-else>
      <li v-for="item in databaseStore.documents" :key="item.id">
        {{item.id}} - {{ item.name }}
        <br>
        {{ item.short }}
      </li>
    </ul>
  </div>
</template>

