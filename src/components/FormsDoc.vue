<script setup>
    import { useDatabaseStore } from '../stores/database';
    import { ref } from 'vue';

    const databaseStore = useDatabaseStore()

    const url = ref('')

    const handleSubmit = ()=> {
        databaseStore.addUrl(url.value)
    }
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="URL" v-model="url">
        <button type="submit">Save</button>
    </form>
</template>