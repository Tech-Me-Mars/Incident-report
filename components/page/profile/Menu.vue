<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px" class="card !w-full"
    mode="inline" :items="items" @click="handleClick" />
  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import * as dataApi from './api/data.js'
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

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})


const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([
  {
    key: '1',
    icon: () => h(SettingTwoTone),
    label: 'ประวัติการปฏิบัติงาน',
    title: 'ประวัติการปฏิบัติงาน',

  },
  {
    key: '2',
    icon: () => h(SettingTwoTone),
    label: 'ประวัติการบันทึกรายงานเหตุ',
    title: 'ประวัติการบันทึกรายงานเหตุ',

  },
  {
    key: '3',
    icon: () => h(SettingTwoTone),
    label: 'ตั้งค่าบัญชี',
    title: 'ตั้งค่าบัญชี',

  },
  {
    key: '4',
    icon: () => h(ExclamationCircleTwoTone),
    label: 'ข้อกำหนดและเงื่อนไข',
    title: 'ข้อกำหนดและเงื่อนไข',
  },
  {
    key: '5',
    icon: () => h(QuestionCircleTwoTone),
    label: 'นโยบายความเป็นส่วนตัว',
    title: 'นโยบายความเป็นส่วนตัว',
  },
  {
    key: '6',
    icon: () => h(LogoutOutlined),
    label: 'ออกจากระบบ',
    title: 'ออกจากระบบ',
    danger: true
  },
]);
const handleClick = menuInfo => {
  console.log('click ', menuInfo);
  if (menuInfo.key == 1) {
    navigateTo('/my-jobs')
  }
  if (menuInfo.key == 2) {
    navigateTo('/my-report')
  }
  if (menuInfo.key == 3) {
    navigateTo('/profile/edit')
  }
  if (menuInfo.key == 4) {
    navigateTo('/terms')
  }
  if (menuInfo.key == 5) {
    navigateTo('/privacy')
  }
  if (menuInfo.key == 6) {
    showConfirmDialog({
      title: 'ออกจากระบบ',
      message:
        `คุณต้องการออกจากระบบใช่หรือไม่`,
    })
      .then(() => {
        logout()
      })
      .catch(() => {
      });

  }
};

const logout = async () => {
  try {
    const res = await dataApi.logout();
    localStorage.clear()
    navigateTo('/auth/login-line');
  } catch (error) {
    errorAlert.value = true;
    dataError.value = error;
    console.error(error)
  }
}


</script>