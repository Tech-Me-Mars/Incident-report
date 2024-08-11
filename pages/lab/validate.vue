<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    
    password: yup.string().min(6).required(),
    first_name: yup.string().min(6).required(),
    email: yup.string().email().required(),
    last_name: yup.string().min(6).required(),
   
  }),
});

const onSubmit = handleSubmit(
  values => {
    // alert(JSON.stringify(values, null, 2));
  },
  ({ errors }) => {
    const firstError = Object.keys(errors)[0];
    console.log(firstError)
    const el = document.querySelector(`[name="${firstError}"]`);
    el?.scrollIntoView({
      behavior: 'smooth',
    });
    el.focus();
  },
);


const [password, passwordAttrs] = defineField('password');
const [first_name, nameAttrs] = defineField('first_name');
const [last_name, lastnameAttrs] = defineField('last_name');
const [email, emailAttrs] = defineField('email');
</script>

<template>
  <form @submit="onSubmit">


    <input v-model="first_name" v-bind="nameAttrs" name="first_name" type="text" />
    <span>{{ errors.first_name }}</span>

    <input v-model="last_name" v-bind="lastnameAttrs" name="last_name" type="text" />
    <span>{{ errors.last_name }}</span>

    <input v-model="password" v-bind="passwordAttrs" name="password" type="password" />
    <span>{{ errors.password }}</span>

    <input v-model="email" v-bind="emailAttrs" name="email" type="email" />
    <span>{{ errors.email }}</span>

    <button>Submit</button>
  </form>
</template>

<style>
input,
button {
  margin-top: 300px;
  display: block;
}
</style>
