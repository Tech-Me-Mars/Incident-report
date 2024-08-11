<template>
  <van-tabbar class="max-w-4xl mx-auto" style="padding-bottom: 16px;">
    <van-tabbar-item
      v-for="(item, index) in menuNavigation"
      :key="index"
      @click="handleNavigation(item)"
      :name="item.activeRouteName"
      :icon="item.icon"
      :class="customClass(item.activeRouteName)"
    >
      {{ item.label }}
    </van-tabbar-item>
    <context-holder />
  </van-tabbar>
</template>

<style>
.van-tabbar--fixed {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: auto;
  right: auto;
}
</style>

<script setup>
import { ref, computed, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const route = useRoute();
const router = useRouter();
const [modal, contextHolder] = Modal.useModal();

const currentRoute = computed(() => route.path);

const customClass = (list) => {
  if (currentRoute.value === "/" && list === "/") {
    return "van-tabbar-item--active";
  } else if (
    currentRoute.value.includes(list) &&
    currentRoute.value !== "/" &&
    list !== "/"
  ) {
    return "van-tabbar-item--active";
  }
};

const isSensitiveRoute = (path) => {
  const sensitivePatterns = [
    /^\/jobs\/add\/?$/,             // Matches "/jobs/add" or "/jobs/add/"
    /^\/report\/add\/?$/,           // Matches "/report/add" or "/report/add/"
    /^\/jobs\/mission\/process\/.*$/ // Matches "/jobs/mission/process/*"
  ];

  return sensitivePatterns.some(pattern => pattern.test(path));
};

const confirmNavigation = (item, next) => {
  modal.confirm({
    title: 'คุณยืนยันที่จะออกจากหน้านี้ใช่หรือไม่',
    icon: h(ExclamationCircleOutlined),
    okText: 'ใช่',
    cancelText: 'ไม่ใช่',
    onOk() {
      next();
    },
    onCancel() {
      console.log('Navigation cancelled');
    },
  });
};

const handleNavigation = (item) => {
  const currentPath = currentRoute.value;

  if (isSensitiveRoute(currentPath)) {
    confirmNavigation(item, () => {
      router.push(item.to);
    });
  } else {
    router.push(item.to);
  }
};

const menuNavigation = ref([
  { id: 1, label: "Home", icon: "home-o", to: "/", activeRouteName: "/" },
  { id: 2, label: "Jobs", icon: "description-o", to: "/jobs/add", activeRouteName: "jobs" },
  { id: 3, label: "Report", icon: "records-o", to: "/report/add", activeRouteName: "report" },
  { id: 4, label: "News", icon: "bulb-o", to: "/news", activeRouteName: "news" },
  { id: 5, label: "Map", icon: "map-marked", to: "/map", activeRouteName: "map" },
]);
</script>
