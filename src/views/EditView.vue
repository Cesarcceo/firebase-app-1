<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useDatabaseStore } from '../stores/database';
    import { onMounted, reactive } from 'vue';
    import { message } from 'ant-design-vue';

    const route = useRoute()
    const router = useRouter()
    const databaseStore = useDatabaseStore()

    const onFinish = async values => {
        console.log('Success:', values);
        const error = await databaseStore.updateUrt(route.params.id, formState.url)
        if(!error){
            message.success('Url Updated')
            router.push('/')
            return;
        }

        switch(error){
            default:
                message.error('Error from farebase')
        }
    }

    const formState = reactive({
        url: ''
    })

    onMounted(async() => {
        formState.url = await databaseStore.reedUrl(route.params.id)
    })
</script>

<template>
    <a-row>
        <a-col span="12" offset="6">
            <h1>Edit id: {{ route.params.id }}</h1>
            <a-form
                name="basicEdit"
                autocomplete="off"
                layout="vertical"
                :model="formState"
                @finish="onFinish"
            >
                <a-form-item
                    name="url"
                    label="New url"
                    :rules="[{
                        required:true,
                        whitespace:true,
                        pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                        message: 'Enter a valid url'
                    }]"
                >
                    <a-input v-model:value="formState.url"></a-input>
                </a-form-item>
                <a-form-item>
            <a-button 
                type="primary" 
                html-type="submit"
                :loading="databaseStore.loadingDoc"
                :disabled="databaseStore.loadingDoc"
            >
                Edit</a-button>
        </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>