<template>
        <HeaderMenu class="flex justify-between items-center gap-5 sticky top-0 z-50">
        <div class="flex items-center gap-3">
            <NuxtLink to="/profile">
                <TmmButtonBackPage />
            </NuxtLink>
            <p class="font-bold text-lg">ข้อกำหนดและเงื่อนไข</p>
        </div>
    </HeaderMenu>
    <section class="p-3" >
    <p v-html="resTerms?.html">
    </p>
</section>
</template>

<script setup>
import * as dataApi from './api/data.js'

onMounted(() => {
    loadTerms();  
})
const resTerms = ref()
const loadTerms = async () =>{
    try{
        const res = await dataApi.getTerms();
        resTerms.value = res.data.data;
    }catch(error){
        console.error(error)
    }
}
</script>