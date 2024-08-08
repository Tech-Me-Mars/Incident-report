<template>
    <form @submit.prevent="handleSubmit(onSubmit)">
      <div v-for="(person, index) in persons" :key="index">
        <label for="name">Name:</label>
        <input v-model="person.name" name="name" />
  
        <div v-if="person.validate && !person.name">
          Name is required
        </div>
  
        <label for="tel">Telephone:</label>
        <input v-model="person.tel" name="tel" />
  
        <label for="age">Age:</label>
        <input v-model="person.age" name="age" />
  
        <label for="validate">Validate:</label>
        <input type="checkbox" v-model="person.validate" name="validate" />
  
        <button type="button" @click="removePerson(index)">Remove</button>
      </div>
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { z } from 'zod';
  
  // Schema สำหรับแต่ละบุคคล
  const personSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    tel: z.string().min(1, 'Telephone number is required'),
    age: z.number().min(0, 'Age must be a positive number'),
    validate: z.boolean()
  });
  
  // Schema สำหรับฟอร์ม
  const schemaWithValidation = z.object({
    persons: z.array(personSchema).refine(data => data.every(person => person.validate || person.name.trim() !== ''), {
      message: 'Name is required when validate is true',
    }),
  });
  
  // ข้อมูลเริ่มต้น
  const persons = ref([
    { age: 43, name: "kay", tel: "0631282446", validate: true },
    { age: 33, name: "kay", tel: "0631282446", validate: false },
    { age: 51, name: "kay", tel: "0631282446", validate: false },
    // เพิ่มรายการอื่น ๆ ตามต้องการ
  ]);
  
  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const handleSubmit = (onSubmit) => {
    const result = schemaWithValidation.safeParse({ persons: persons.value });
    if (result.success) {
      onSubmit(result.data);
    } else {
      console.error(result.error.errors);
    }
  };
  
  const onSubmit = (values) => {
    console.log('Form submitted:', values);
  };
  
  const removePerson = (index) => {
    persons.value.splice(index, 1);
  };
  </script>
  