<template>
    <!-- <div class="flex h-14 justify-around border-t border-gray-200 bg-white shadow-lg fixed bottom-0 w-full z-50">
        <div class="w-full" v-for="(item, index) in menuNavigation" :key="index">
            <NuxtLink :to="item.to">
                <div class='flex flex-col items-center justify-center' :class="customClass(item.to)">
                <span :class="`${item.icon}`" style="font-size: 20px;"></span>
                <div class="text-xs">{{ item.label }}</div>
            </div>
        </NuxtLink>
        </div>
    </div> -->

    <van-tabbar v-model="active">
  <!-- {{ active }} -->
  <van-tabbar-item v-for="(item, index) in menuNavigation" :key="index" :name="item.activeRouteName" :icon="item.icon" :to="item.to">{{ item.label }}</van-tabbar-item>
</van-tabbar>
</template>

<script setup>
import { useRoute } from 'vue-router'

const active = ref('home');

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
    { id: 1, label: "Home", icon: "home-o", to: "/",activeRouteName:"home" },
    { id: 2, label: "Jobs", icon: "description-o", to: "/jobs/add",activeRouteName:"Jobs" },
    { id: 2, label: "Report", icon: "records-o", to: "/report/add",activeRouteName:"Report" },
    { id: 2, label: "News", icon: "bulb-o", to: "/news",activeRouteName:"News" },
])
</script>