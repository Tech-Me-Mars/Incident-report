<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px" class="card w-full"
      mode="inline" :items="items" @click="handleClick" />
</template>

<script setup>

import { h, ref } from 'vue';
import {
  SettingTwoTone,
  MailOutlined,
  ExclamationOutlined,
  ExclamationCircleFilled,
  ExclamationCircleTwoTone,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  QuestionCircleTwoTone,
  LogoutOutlined
} from '@ant-design/icons-vue';
const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    icon: () => h(SettingTwoTone),
    label: 'ตั้งค่าบัญชี',
    title: 'ตั้งค่าบัญชี',

  },
  {
    key: '2',
    icon: () => h(ExclamationCircleTwoTone),
    label: 'เกี่ยวกับเรา',
    title: 'เกี่ยวกับเรา',
  },
  {
    key: '3',
    icon: () => h(QuestionCircleTwoTone),
    label: 'ศูนย์ช่วยเหลือ',
    title: 'ศูนย์ช่วยเหลือ',
  },
  {
    key: '4',
    icon: () => h(LogoutOutlined),
    label: 'ออกจากระบบ',
    title: 'ออกจากระบบ',
    danger: true
  },
]);
const handleClick = menuInfo => {
  console.log('click ', menuInfo);
};
</script>