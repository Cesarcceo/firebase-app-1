<script setup>
    import { useRoute } from 'vue-router';
    import { useDatabaseStore } from '../stores/database';
    import { onMounted, ref } from 'vue';

    const route = useRoute()
    const databaseStore = useDatabaseStore()

    const handleSubmit = () => {
        console.log('edito la url')
    }

    const url = ref('')

    onMounted(async() => {
        url.value = await databaseStore.reedUrl(route.params.id)
    })
</script>

<template>
    <div>
        <h1>Edit View</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Enter the url" v-model="url">
            <button type="submit">Edit</button>
        </form>
    </div>
</template>