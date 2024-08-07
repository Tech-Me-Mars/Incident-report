<template>
<HeaderMainProfile />
<section class="p-3" >
    <HeaderMenu class="flex justify-between items-center gap-5 sticky top-0 z-50">
    <div class="flex items-center gap-3">
        <NuxtLink to="/profile">
            <TmmButtonBackPage />
        </NuxtLink>
        <p class="font-bold text-lg">นโยบายความเป็นส่วนตัว</p>
    </div>
</HeaderMenu>
<p v-html="resPrivacy?.html">
</p>
</section>
</template>

<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'นโยบาย' });
import * as dataApi from './api/data.js'

onMounted(() => {
loadPrivacy();  
})
const resPrivacy = ref()
const loadPrivacy = async () =>{
try{
    const res = await dataApi.getprivacy();
    resPrivacy.value = res.data.data;
}catch(error){
    console.error(error)
}
}
</script>