<template>
    <div>
        <!-- loading... -->
    </div>
</template>

<script setup>
definePageMeta({
    layout: false,
    // or middleware: 'auth'
});
import { ref } from 'vue'
import * as dataApi from '../api/data.js'
const route = useRoute();

const checkPage = async () => {
    return navigateTo(`/auth/login-line?page=${route.params.id}`)
}
const checkRegisterNotify =async () =>{
    try{
        const res =await dataApi.getCheckLineNotify();
        if (res.data.data?.connect == true) {
            localStorage.setItem("is_connect_line_notify", 1);
        }else{
            localStorage.setItem("is_connect_line_notify", 0);
        }
    }catch(error){
        console.error(error)
    }
}
onMounted(async()=>{
    await checkRegisterNotify();
    await checkPage()
});
</script>