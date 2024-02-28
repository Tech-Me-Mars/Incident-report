<template>
    <div class="card">
        <Toast />
        <div class="bg-red-600" style="height: 1000px">Scroll down to lazy load an image.</div>

        <DeferredContent @load="onImageLoad">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi omnis ducimus cumque sed, autem explicabo ab aliquam</p>
        </DeferredContent>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const onImageLoad = () => {
   alert('loadimg')
};
</script>
