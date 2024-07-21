<template>
    <div>
        <button @click="showLoad()">เริ่ม</button>
        <button @click="closeToast()">หยุด</button>
    </div>
</template>
<script setup>
import { showLoadingToast } from 'vant';
setToastDefaultOptions({ duration: 0 });
const showLoad = () => {
    showLoadingToast({
        message: 'Loading...',
        forbidClick: true,
        loadingType: 'spinner',
    });
    setTimeout(() => {
        closeLoad()
    }, 3000);
}
const closeLoad = () => {
    closeToast();
}

</script>