<template>
    <a-config-provider :theme="{
        token: {
            colorPrimary: colorDisplay,
        },
    }">

        <a-button :type="type" :htmlType="htmlType" :ghost="outlined" :loading="loading" :class="`${className}`"
            :disabled="disabled" :shape="shape" :size="size" @click="emitClick">
            <i :class="`${icon}`" /> {{ label }}
        </a-button>
    </a-config-provider>
</template>

<script setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
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
const orangeColor = "#f78431"
const infoColor = "#1677ff"
const darkColor = "#000"
const whiteColor = "#FFFFFF"

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
        case "orange":
            return orangeColor
        case "info":
            return infoColor
        case "dark":
            return darkColor
        case "white":
            return whiteColor
        default:
            return primaryColor // ถ้าไม่มีเงื่อนไขใดเลยที่ตรงกับ props.type ให้ใช้ primaryColor
    }
})()

const emits = defineEmits();
const emitClick = (event) => {
    emits('click', event); // Emit the keydown event
}
</script>