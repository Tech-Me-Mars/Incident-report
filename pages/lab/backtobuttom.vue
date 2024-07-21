<template>
    <div>
        <van-cell v-for="item in list" :key="item" :title="item" />

        <van-back-top v-if="showBackToTop" @click="scrollToTop" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const list = [...Array(50).keys()];
const showBackToTop = ref(false);
// เมสcommit
const checkScrollPosition = () => {
    const scrolledFromTop = window.scrollY;
    showBackToTop.value = scrolledFromTop > 0;
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

onMounted(() => {
    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition);
});
</script>