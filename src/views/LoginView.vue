<script setup>
  import { reactive } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const formState = reactive({
    email: '',
    password: '',
  })

  const onFinish = async values => {
    console.log('Success:', values);
    await userStore.loginUser(formState.email, formState.password)
    router.push('/')
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
</script>

<template>
  <a-row>
    <a-col span="12" offset="6">
      <h1>Login</h1>
      <a-form 
        name="basicLogin"
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          label="Email"
          :rules="[{
            required: true, 
            whitespace:true, 
            type: 'email',
            message: 'Enter the email'
            }]"
        >
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
        <a-form-item
          name="password"
          label="Password"
          :rules="[{
            required: true, 
            min:8, 
            whitespace: true, 
            message: 'Enter the password'
            }]"
        >
          <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser">Login</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>


