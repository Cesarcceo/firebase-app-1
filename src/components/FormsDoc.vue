<script setup>
    import { useDatabaseStore } from '../stores/database';
    import { reactive } from 'vue';
    import { message } from 'ant-design-vue';

    const databaseStore = useDatabaseStore()

    const formState = reactive({
        url: ''
    })

    const onFinish = async values => {
        console.log('Success:', values);
        const error = await databaseStore.addUrl(formState.url)
        if(!error){
            message.success('Url Created')
            return;
        }

        switch(error){
            default:
                message.error('Error from farebase')
        }
    }
</script>

<template>
    <a-form
        name="saveUrl"
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
    >
        <a-form-item
            name="url"
            label="New Url"
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
                Save</a-button>
        </a-form-item>
    </a-form>
</template>