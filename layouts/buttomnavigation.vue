<template>
    <div class="flex h-14 justify-around border-t border-gray-200 bg-white shadow-lg fixed bottom-0 w-full z-50">
        <div class="w-full" v-for="(item, index) in menuNavigation" :key="index">
            <NuxtLink :to="item.to">
                <div class='flex flex-col items-center justify-center' :class="customClass(item.to)">
                <span :class="`${item.icon}`" style="font-size: 23px;"></span>
                <div class="text-sm">{{ item.label }}</div>
            </div>
        </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const currentRoute = computed(() => {
  return route.path;
});

const customClass = (list) => {
  if (currentRoute.value == "/" && list == "/") {
    return "!text-blue-700";
  } else if (currentRoute.value.includes(list) && currentRoute.value != "/" && list != "/") {
    return "!text-blue-700";
  }
}
const menuNavigation = ref([
    { id: 1, label: "Home", icon: "mdi mdi-home-variant-outline", to: "/" },
    { id: 2, label: "Jobs", icon: "mdi mdi-plus-box-outline", to: "/jobs/add" },
    { id: 2, label: "Report", icon: "mdi mdi-file-document-outline", to: "/report/add" },
    { id: 2, label: "News", icon: "mdi mdi-newspaper-variant-outline", to: "/news" },
])
</script>