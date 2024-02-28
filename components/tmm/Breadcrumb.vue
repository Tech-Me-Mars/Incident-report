<template>
    <!-- *********** [ PRIMEVUE BREADCRUMB STYLE] **********-->
  <!-- <div class="flex justify-content-start mb-3">
    <Breadcrumb :home="home" :model="items"  style="
    padding-top: 10px;
    padding-bottom: 10px;
" />
  </div> -->
  <!-- *********** [ FLOWBIT BREADCRUMB STYLE] **********-->
  <div class="my-2">
  <fwb-breadcrumb>
    <fwb-breadcrumb-item home href="/">
      Home
    </fwb-breadcrumb-item>
    <fwb-breadcrumb-item v-for="(item,index) in props.items" :href="item.to">
        {{ item.label }}
    </fwb-breadcrumb-item>
  </fwb-breadcrumb>
</div>
</template>

<script setup>
// import Breadcrumb from "primevue/breadcrumb";
import { FwbBreadcrumb, FwbBreadcrumbItem } from 'flowbite-vue'

// const home = ref({
//   icon: "pi pi-home",
//   to: "/",
// });
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => ({
      label: "home",
    }),
  },
});
</script>
