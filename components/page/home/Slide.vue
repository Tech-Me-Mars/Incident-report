<script setup>

const daysOfMonth = ref([]);

const month = ref(new Date())
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// สร้าง computed property เพื่อดึงชื่อเดือนจากตัวแปร month
const monthName = computed(() => {
    if (!month.value) {
        month.value = new Date()
    }
    const monthIndex = month.value.getMonth();
    //   populateDaysOfMonth()
 
    return months[monthIndex];
});
const calendaDashboardUseState = useState("calendaDashboardUseState", () => "");
const initialSlide = ref();
const populateDaysOfMonth = () => {
    daysOfMonth.value = [];
    const currentDate = new Date(month.value);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        const dayIndex = date.getDay();
        const dayName = getDayName(dayIndex);
        const isActive = isSameDay(date, new Date()); // เช็คว่าเป็นวันปัจจุบันหรือไม่

        daysOfMonth.value.push({ date: i, datename: dayName, active: isActive });
        if (isActive) {
            calendaDashboardUseState.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            initialSlide.value = i - 1; // ลบออกเพราะ swiper เริ่มนับที่ 0
        }
    }
};
const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
};
watch(month, (newValue, oldValue) => {
    populateDaysOfMonth()
});

const getDayName = (dayIndex) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[dayIndex];
};
// สร้างตัวแปร calendaDashboardUseState โดยกำหนดค่าเริ่มต้นเป็น null
const toggleActive = (item) => {
    daysOfMonth.value.forEach((e) => {
        e.active = false;
    });

    item.active = !item.active;
    // ตรวจสอบว่า item ที่ถูกคลิก active หรือไม่
    if (item.active) {
        // กำหนดค่า calendaDashboardUseState ให้เป็นวันที่ที่ถูกคลิก active ในรูปแบบ 'YYYY-mm-dd'
        calendaDashboardUseState.value = `${month.value.getFullYear()}-${String(month.value.getMonth() + 1).padStart(2, '0')}-${String(item.date).padStart(2, '0')}`;
    } else {
        calendaDashboardUseState.value = null; // ถ้าไม่ active กำหนดให้ calendaDashboardUseState เป็น null
    }
    console.log(calendaDashboardUseState.value)
};

onMounted(async () => {
    await populateDaysOfMonth()

});
const slidPerPage = ref(6);
const slidesPerView = computed(() => {
    let slidesToShow = slidPerPage.value;

    switch (true) {
        case window.innerWidth >= 1280:
            slidesToShow = 15;
            break;
        case window.innerWidth >= 1024:
            slidesToShow = 13;
            break;
        case window.innerWidth >= 768:
            slidesToShow = 12;
            break;
        case window.innerWidth >= 520:
            slidesToShow = 7;
            break;
        default:
            slidesToShow = slidPerPage.value;
            break;
    }

    return slidesToShow;
});

</script>
<template>

    <div class="w-full mySwiper mb-3 flex gap-1">
        <div
            class="flex flex-col justify-center items-center border-2 border-gray-200 w-[3rem] h-[4rem] rounded-2xl font-semibold shadow-sm ">
            <Calendar showButtonBar :showTodayButton="true" :showClearButton="false" v-model="month"
                class="!bg-transparent !border-0 !border-none" view="month" showIcon iconDisplay="input" />
            <h6 class="text-sm font-light text-gray-400">{{ monthName }}</h6>
        </div>
        <swiper v-if="initialSlide != undefined" :slidesPerView="slidesPerView" :spaceBetween="5"
            :initialSlide="initialSlide" :freeMode="true" :pagination="{
                clickable: true,
            }" class="mySwiper">

            <swiper-slide v-for="(item, index) in daysOfMonth" :key="index" class="">
                <div class="flex flex-col justify-center items-center border-2 border-gray-200 w-[3rem] h-[4rem] rounded-2xl font-semibold shadow-sm "
                    :class="{ '!border-blue-500 !text-blue-500': item.active }" @click="toggleActive(item)">
                    <p class="text-md">{{ item.date }}</p>
                    <h6 class="text-xs font-light text-gray-400" :class="{ '!text-blue-500': item.active }">{{
                        item.datename }}</h6>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<style scoped>
.swiper {
    width: 85%;
    height: 100%;
}
</style>