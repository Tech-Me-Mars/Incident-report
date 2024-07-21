<template>
    <!-- <fwb-progress :progress="value" :size="size" :label="label" :label-position="labelposition" -->
    <div class="">
        <a-progress :percent="value" :size="size" style="width: 100%;" :stroke-color="getStrokeColor(value)">

            <template #format="percent">
            </template>
        </a-progress>
    </div>
</template>

<script setup>
import { FwbProgress } from 'flowbite-vue'

const getStrokeColor = (value) => {


    if (value >= 100) {
        return  {
            '0%': '#12B508',
            '60%': '#FFC300',
            '80%': '#E94901',
            '100%': '#DA0900',
        } // แดงเข้ม
    } else if (value >= 80) {
        return {
            '0%': '#12B508',
            '60%': '#FFC300',
            '80%': '#E94901',
        }
    } else if (value >= 60) {
        return {
            '0%': '#12B508',
            '60%': '#FFC300',
        }
    } else if (value >= 20) {
        return '#12B508'; // เขียว
    } else {
        return '#12B508'; // สีเริ่มต้น หรือสีใดก็ได้ที่คุณต้องการสำหรับค่าน้อยกว่า 20
    }
};


const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    value: {
        type: [String, Number],
        default: "",
    },
    size: {
        type: String,
        default: "small", //sm || md || lg ||xl
    },
    labelposition: {
        type: String, // outside | inside
        default: "outside",
    },
    strokeColor: {
        type: String,
        default: "#127adb"
    },
    trailColor: {
        type: String,
        default: "#127adb"
    },

});
</script>