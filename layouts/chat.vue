<template>
    <div class=" pb-16">
        <!-- <Header class="max-w-4xl mx-auto"/> -->
        <div class="max-w-4xl mx-auto bg- ">
            <!-- <HeaderMainChat /> -->
            <slot class="" />
         
        </div>
        <!-- <div class="">
      
    </div> -->

    </div>
</template>

<script setup>
import Header from '@/layouts/header.vue'
import Navigation from '@/layouts/buttomnavigation'

import * as dataApi from '@/service/ProfileService'
onMounted(async()=>{
  // await loadProfile();
})
const loadProfile = async () => {
  try {
    const res = await dataApi.getProfile();
    const police_employee_id = useState("police_employee_id", () => res.data.data.police_employee_id);
    // localStorage.setItem("police_employee_id", res.data.data.police_employee_id);
  } catch (error) {
    console.error(error);
  }
}
</script>

<style></style>