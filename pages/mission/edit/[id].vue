<template>
    <PageMissionEditHeader />
    <section class="p-3">
        <PageMissionEditProjectname />
        <hr />
        <PageMissionEditForm />

    </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
</script>