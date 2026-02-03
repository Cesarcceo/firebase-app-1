<script setup>
    import { message } from 'ant-design-vue';
    import { useDatabaseStore } from '../stores/database';
    import { useRouter } from 'vue-router';

    const databaseStore = useDatabaseStore()
    const router = useRouter()  

    const confirm = async urlId => {
        const error = await databaseStore.removUrl(urlId)
        return !error? message.success('the document was removed'): message.error(error)
    }
    
    const cancel = () => {}

    databaseStore.getUrls()
</script>

<template>
  <div>
    <p v-if="databaseStore.loadingDoc">loading...</p>

    <a-space direction="vertical" v-else style="width: 100%">
        <a-card
            v-for="item in databaseStore.documents" :key="item.id"
            :title="item.short"
        >
            <template #extra>
                <a-space>
                    <a-popconfirm
                        title="Are you sure to remove this document?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="confirm(item.id)"
                        @cancel="cancel"
                    >
                        <a-button danger >Remove</a-button>
                    </a-popconfirm>
                    <a-button @click="router.push(`/edit/${item.id}`)">Edit</a-button>
                </a-space>
            </template>
            <p>{{ item.name }}</p>
        </a-card>
    </a-space>
  </div>
</template>

