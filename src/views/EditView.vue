<script setup>
    import { useRoute } from 'vue-router';
    const route = useRoute()

    console.log(route.params.id)

    const handleSubmit = () => {
        console.log('edito la url')
    }
</script>

<template>
    <div>
        <h1>Edit View</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Enter the url">
            <button type="submit">Edit</button>
        </form>
    </div>
</template>