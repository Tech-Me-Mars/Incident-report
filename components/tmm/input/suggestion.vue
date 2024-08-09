<template>

        <a-auto-complete  :status="errorStatus"
        :class="` ${className}`" v-model:value="model" :options="filteredOptions"
                        :placeholder="placeholder" @search="weponSearch"
                        :field-names="{ label: label, value: value }" />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const model = defineModel()
const props = defineProps({
    filter: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: '',
    },
    value: {
        type: [String, Number],
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    className: {
        type: String,
        default: "",
    },
    search: {
        type: Boolean,
        default: true,
    },
    error: {
        type: String,
        default: "",
    }
});
const errorStatus = computed(() => {
    return props.error ? 'error' : ''; // ถ้ามี error ให้ส่งค่า 'error' มิฉะนั้นส่งค่าว่าง
});

const emits = defineEmits();
// const weponSearch = (val) => {
//     try {
//         if (val.length > 1) {
//             resWepon.value = resWepon.value.filter(item =>
//                 item?.detail.toLowerCase().includes(val.toLowerCase())
//             );

//         } else {
//             resWepon.value = resWeponSuggestion.value
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

const filteredOptions = ref([...props.options]);

const weponSearch = (val) => {
    try {
        console.log(props.options)
        console.log(val.length)
        if (val.length > 1) {
            // filteredOptions.value = props.options.filter((item) =>{
            //     console.log(item[props.label])
            //     item[props.label].toLowerCase().includes(val.toLowerCase())
                
            // }
            // );
            filteredOptions.value = props.options.filter(item =>
                item?.[props.label].toLowerCase().includes(val.toLowerCase())
            );
        } else {
            filteredOptions.value = props.options;
        }
    } catch (error) {
        console.error(error);
    }
};

</script>