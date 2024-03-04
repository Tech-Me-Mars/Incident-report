<script setup>
const progressPercent = ref(75)
const daysOfMonth = ref([]);

const populateDaysOfMonth = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        const dayIndex = date.getDay();
        const dayName = getDayName(dayIndex);

        daysOfMonth.value.push({ date: i, datename: dayName, active: false });
    }
};

const getDayName = (dayIndex) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[dayIndex];
};

const toggleActive = (item) => {
    daysOfMonth.value.forEach((e) => {
        e.active = false;
    });

    item.active = !item.active;
};

onMounted(populateDaysOfMonth);
const slidPerPage = ref(6);
const slidesPerView = computed(() => {
  // Check if the screen width is md or larger
  const isMdOrLarger = window.innerWidth >= 768;
  // If it is, return 12, otherwise return the default value (6)
  return isMdOrLarger ? 12 : slidPerPage.value;
});
</script>
<template>
    <div class="w-full mySwiper card p-3 mb-3">
        <swiper :slidesPerView="slidesPerView" :spaceBetween="5" :freeMode="true" :pagination="{
            clickable: true,
        }" class="mySwiper">
            <swiper-slide v-for="(item, index) in daysOfMonth" :key="index" class="">
                <div class="flex flex-col justify-center items-center border-2 border-gray-200 w-[3rem] h-[4rem] rounded-2xl font-semibold shadow-sm "
                    :class="{ 'border-sky-700 !text-blue-800': item.active }" @click="toggleActive(item)">
                    <p class="text-lg">{{ item.date }}</p>
                    <h6 class="text-xs text-gray-400" :class="{ 'text-sky-800': item.active }">{{ item.datename }}</h6>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<style scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>