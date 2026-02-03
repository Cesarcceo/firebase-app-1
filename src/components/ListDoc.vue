<script setup>
  import { useDatabaseStore } from '../stores/database';
  import { useRouter } from 'vue-router';

  const databaseStore = useDatabaseStore()
  const router = useRouter()  

  databaseStore.getUrls()
</script>

<template>
  <div>
    <p v-if="databaseStore.loadingDoc">loading...</p>

    <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%">
        <a-card
            v-for="item in databaseStore.documents" :key="item.id"
            :title="item.short"
        >
            <template #extra>
                <a-space>
                    <a-button danger @click="databaseStore.removUrl(item.id)">Remove</a-button>
                    <a-button @click="router.push(`/edit/${item.id}`)">Edit</a-button>
                </a-space>
            </template>
            <p>{{ item.name }}</p>
        </a-card>
    </a-space>
  </div>
</template>

