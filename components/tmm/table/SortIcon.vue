<template>
    <Icon icon="heroicons:chevron-up" v-if="sortOrder >= 0" />
    <Icon icon="heroicons:chevron-down" v-else />
</template>

<script>
export default {
    name: "SortIcon",
    props: {
        sortOrder: Number,
    },
};
</script>