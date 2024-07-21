<template>
        <HeaderMenu class="flex">
            <NuxtLink :to="`/jobs/mission/${route.params.id}`">
        <TmmButtonBackPage />
    </NuxtLink>
    </HeaderMenu>
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>