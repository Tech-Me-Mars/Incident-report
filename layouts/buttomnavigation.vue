<template>
  <van-tabbar class="max-w-4xl mx-auto">
    <van-tabbar-item v-for="(item, index) in menuNavigation" :key="index" :name="item.activeRouteName" :icon="item.icon"
      :to="item.to" :class="customClass(item.activeRouteName)">{{ item.label }}</van-tabbar-item>
  </van-tabbar>
</template>
<style>
.van-tabbar--fixed {
  position: fixed;
  bottom: 0;
  left: auto;
  right: auto;
}
</style>
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const currentRoute = computed(() => {
  return route.path;
});
const customClass = (list) => {
  console.log(list)
  if (currentRoute.value == "/" && list == "/") {
    return "van-tabbar-item--active";
  } else if (
    currentRoute.value.includes(list) &&
    currentRoute.value != "/" &&
    list != "/"
  ) {
    return "van-tabbar-item--active";
  }
};
const menuNavigation = ref([
  { id: 1, label: "Home", icon: "home-o", to: "/", activeRouteName: "/" },
  { id: 2, label: "Jobs", icon: "description-o", to: "/jobs/add", activeRouteName: "jobs" },
  { id: 2, label: "Report", icon: "records-o", to: "/report/add", activeRouteName: "report" },
  { id: 2, label: "News", icon: "bulb-o", to: "/news", activeRouteName: "news" },

])
</script>