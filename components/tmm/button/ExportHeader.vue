<template>
    <a-config-provider :theme="{
        token: {
            colorPrimary: colorDisplay,
        },
    }">

        <a-button :type="type" :htmlType="htmlType" :ghost="outlined" :loading="loading"
            :class="`w-[2.5rem] h-[2.5rem] text-center !flex items-center justify-center rounded-xl  ${className}`" :shape="shape"
            :size="size" @click="emitClick">
            <i :class="`text-lg text-gray-500 ${icon}`" /> {{ label }}
        </a-button>
    </a-config-provider>
</template>

<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "mdi mdi-upload-box-outline",
    },
    severity: {
        type: String,
        default: "primary",
    },
    size: {
        type: String,
        default: "middle", //large | middle | small
    },
    htmlType: {
        type: String,
        default: "button", //or submit
    },
    outlined: {
        type: Boolean,
        default: false
    },
    className: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "default",
    },
    shape: {
        type: String,
        default: "", // circle or round
    }
});

const primaryColor = "#1677ff"
const secondary = "#696b6e"
const successColor = "#52c41a"
const warningColor = "#faad14"
const errorColor = "#ff4d4f"
const infoColor = "#1677ff"
const darkColor = "#000"

const colorDisplay = (() => {
    switch (props.severity) {
        case "primary":
            return primaryColor
        case "secondary":
            return secondary
        case "success":
            return successColor
        case "warning":
            return warningColor
        case "error":
            return errorColor
        case "info":
            return infoColor
        case "dark":
            return darkColor
        default:
            return primaryColor // ถ้าไม่มีเงื่อนไขใดเลยที่ตรงกับ props.type ให้ใช้ primaryColor
    }
})()


const emits = defineEmits();
const emitClick = (event) => {
    emits('click', event); // Emit the keydown event
}
</script>