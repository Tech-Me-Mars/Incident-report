<template>
        <HeaderMenu class="flex">
            <NuxtLink :to="`/mission`">
        <TmmButtonBackPage />
    </NuxtLink>
    </HeaderMenu>
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>