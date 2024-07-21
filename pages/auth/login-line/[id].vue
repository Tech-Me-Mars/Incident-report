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

const route = useRoute();

const checkPage = async () => {
    return navigateTo(`/auth/login-line?page=${route.params.id}`)
}
onMounted(checkPage());
</script>