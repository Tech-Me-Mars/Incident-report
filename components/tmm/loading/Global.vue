
<template>
    <div></div>
</template>
<script setup>
// ********** [[ GLOBAL LOADING ]]
import { showLoadingToast } from 'vant';
setToastDefaultOptions({ duration: 0 });
const showLoad = () => {
    showLoadingToast({
        message: 'Loading...',
        forbidClick: true,
        loadingType: 'spinner',
    });
}
const closeLoad = () => {
    closeToast();
}
const isloadingAxi = useState("isloadingAxi");
watch(isloadingAxi, (newValue, oldValue) => {
    if (newValue) {
        showLoad(); // เรียก showLoad หาก isloadingAxi เป็น true
    } else {
        closeLoad(); // เรียก closeLoad หาก isloadingAxi เป็น false
    }
});
</script>