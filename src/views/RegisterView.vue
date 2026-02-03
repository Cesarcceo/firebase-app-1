<script setup>
  import { reactive } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

  const userStore = useUserStore()
  const router = useRouter()

  const formState = reactive({
    email: '',
    password: '',
    repassword: '',
  })

  const onFinish = async values => {
    console.log('Success:', values);
    const error = await userStore.registeruser(formState.email, formState.password)
    if(!error){
      message.success('User created')
      router.push('/')
      return;
    }

    switch(error){
      case "auth/email-already-in-use":
        message.error("this email already in use");
        break;
      default: 
        message.error("Error from farebase")
        break;
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validatePass = async (_rule, value) => {
    if(value === ''){
      return Promise.reject('Repit the password')
    }
    if (value !== formState.password) {
      return Promise.reject('The passwords no match')
    }
    return Promise.resolve()
  }
</script>

<template>
  <a-row>
    <a-col span="12" offset="6">
      <h1>Register</h1>
      <a-form
        name="basicRegister"
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
        <a-form-item
          name="repassword"
          label="Repeat Password"
          :rules="[{
            required: true, 
            validator: validatePass,
            }]"
        >
          <a-input-password v-model:value="formState.repassword"></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser">Register</a-button>
        </a-form-item>

      </a-form>
    </a-col>
  </a-row>
</template>