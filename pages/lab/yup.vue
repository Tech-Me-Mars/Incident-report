<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input v-model="form.email" id="email" type="email" />
        <span v-if="!$v.form.email.$pending && !$v.form.email.$model">{{ errors.email }}</span>
      </div>
  
      <div>
        <label for="password">Password:</label>
        <input v-model="form.password" id="password" type="password" />
        <span v-if="!$v.form.password.$pending && !$v.form.password.$model">{{ errors.password }}</span>
      </div>
  
      <div>
        <label for="name">Name:</label>
        <input v-model="form.name" id="name" type="text" />
        <span v-if="!$v.form.name.$pending && !$v.form.name.$model">{{ errors.name }}</span>
      </div>
  
      <div>
        <label for="police_province_id">Police Province ID:</label>
        <input v-model="form.police_province_id" id="police_province_id" type="number" />
        <span v-if="!$v.form.police_province_id.$pending && !$v.form.police_province_id.$model">{{ errors.police_province_id }}</span>
      </div>
  
      <!-- Add other form fields similarly -->
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import * as yup from 'yup';
  
  // Define Yup schema
  const schema = yup.object({
    police_province_id: yup.number().required("กรุณาระบุข้อมูล"),
    incident_date: yup.string().required("กรุณาระบุข้อมูล").default(""),
    incident_time: yup.string().required("กรุณาระบุข้อมูล").default(""),
    type_report_code: yup.string().required("กรุณาระบุข้อมูล").default(""),
    incident_cause_text: yup.string().required("กรุณาระบุข้อมูล").default(""),
    incident_area_text: yup.string().required("กรุณาระบุข้อมูล").default(""),
    incident_structure_text: yup.string().required("กรุณาระบุข้อมูล").default(""),
    incident_area_lat: yup.number().required("กรุณาระบุข้อมูล"),
    incident_area_long: yup.number().required("กรุณาระบุข้อมูล"),
    police_head_station_employee_id: yup.number().required("กรุณาระบุข้อมูล"),
    incident_detail: yup.string().required("กรุณาระบุข้อมูล").default(""),
    inquiry_employee_fullname: yup.string().required("กรุณาระบุข้อมูล").default(""),
    inquiry_employee_position: yup.string().required("กรุณาระบุข้อมูล").default(""),
    inquiry_employee_phone: yup.string().required("กรุณาระบุข้อมูล").default(""),
    senior_police_control_employee_fullname: yup.string().required("กรุณาระบุข้อมูล").default(""),
    senior_police_control_employee_position: yup.string().required("กรุณาระบุข้อมูล").default(""),
    senior_police_control_employee_phone: yup.string().required("กรุณาระบุข้อมูล").default(""),
    incident_process_text: yup.string().required("กรุณาระบุข้อมูล").default(""),
    sufferer_array: yup.array().of(yup.object({
      suffer_firstname: yup.string().required("กรุณาระบุข้อมูล").default(""),
      suffer_lastname: yup.string().required("กรุณาระบุข้อมูล").default(""),
      suffer_age: yup.number().required("กรุณาระบุข้อมูล"),
      suffer_nationality: yup.string().required("กรุณาระบุข้อมูล").default(""),
      suffer_passport_number: yup.string().required("กรุณาระบุข้อมูล").default(""),
      suffer_type_damage_code: yup.string().required("กรุณาระบุข้อมูล").default(""),
    })),
    property_array: yup.array().of(yup.object({
      type_property_code: yup.string().required("กรุณาระบุข้อมูล").default(""),
      type_property_brand: yup.string().when('type_property_code', {
        is: val => ['รถยนต์', 'รถจักรยานยนต์'].includes(val),
        then: yup.string().required("กรุณาระบุข้อมูล"),
        otherwise: yup.string().optional()
      }).default(""),
      type_property_qty: yup.number().when('type_property_code', {
        is: val => ['อาคาร/บ้านเรือน', 'อื่นๆ'].includes(val),
        then: yup.number().required("กรุณาระบุข้อมูล"),
        otherwise: yup.number().optional()
      }).default(null),
      type_property_price: yup.number().required("กรุณาระบุข้อมูล"),
    })),
    villain_array: yup.array().of(yup.object({
      gangster_data_has: yup.number().required("กรุณาระบุข้อมูล"),
      gangster_firstname: yup.string(),
      gangster_lastname: yup.string(),
      gangster_age: yup.number(),
      gangster_nationality: yup.string(),
      gangster_offense_count: yup.number(),
      gangster_weapon: yup.string().required("กรุณาระบุข้อมูล").default(""),
    })).test('validateGangsterData', "กรุณาระบุข้อมูล", function(value) {
      const { gangster_data_has, gangster_firstname, gangster_lastname, gangster_age, gangster_nationality, gangster_offense_count } = value;
      if (gangster_data_has === 1) {
        if (!gangster_firstname || !gangster_lastname || gangster_age === undefined || !gangster_nationality || gangster_offense_count === undefined) {
          return false;
        }
      } else if (gangster_data_has === 0) {
        // Clear optional fields if gangster_data_has is 0
        gangster_firstname = '';
        gangster_lastname = '';
        gangster_age = undefined;
        gangster_nationality = '';
        gangster_offense_count = undefined;
      }
      return true;
    }),
    attach_array: yup.array().of(yup.object({
      group_text_detail: yup.string().when('type_group_image_id', {
        is: val => !val,
        then: yup.string().required("กรุณาระบุข้อมูล"),
        otherwise: yup.string().optional()
      }).default(""),
      type_group_image_id: yup.number().optional(),
      image_detail: yup.array().of(yup.string()).min(1, "กรุณาระบุข้อมูล").optional()
    }))
  });
  
  // Create reactive form data
  const form = reactive({
    email: '',
    password: '',
    name: '',
    police_province_id: '',
    incident_date: '',
    incident_time: '',
    type_report_code: '',
    incident_cause_text: '',
    incident_area_text: '',
    incident_structure_text: '',
    incident_area_lat: '',
    incident_area_long: '',
    police_head_station_employee_id: '',
    incident_detail: '',
    inquiry_employee_fullname: '',
    inquiry_employee_position: '',
    inquiry_employee_phone: '',
    senior_police_control_employee_fullname: '',
    senior_police_control_employee_position: '',
    senior_police_control_employee_phone: '',
    incident_process_text: '',
    sufferer_array: [{}],
    property_array: [{}],
    villain_array: [{}],
    attach_array: [{}],
  });
  
  // Define validation rules
  const rules = computed(() => {
    return {
      email: yup.string().email().required(),
      password: yup.string().required(),
      name: yup.string().required(),
      police_province_id: yup.number().required(),
      // Add other fields similarly
    };
  });
  
  const $v = useVuelidate(rules, form);
  
  // Define error messages
  const errors = computed(() => {
    const validationErrors = {};
    for (const [key, value] of Object.entries(form)) {
      const error = $v.value[key]?.$errors[0];
      if (error) {
        validationErrors[key] = error.$message;
      }
    }
    return validationErrors;
  });
  
  const handleSubmit = async () => {
    $v.value.$touch();
    if ($v.value.$invalid) {
      console.log('Form validation failed');
      return;
    }
    // Submit form data
    console.log('Form data:', form);
  };
  
  // Ensure validations are checked on form load
  onMounted(() => {
    $v.value.$touch();
  });
  </script>
  
  <style scoped>
  span {
    color: red;
    font-size: 0.875rem;
  }
  </style>
  