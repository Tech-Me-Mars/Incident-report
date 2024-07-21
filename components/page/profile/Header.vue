<template>
  <HeaderMenu class="flex flex-col ">
    <div class="flex gap-5 items-center">
      <NuxtLink to="/">
        <TmmButtonBackPage />
      </NuxtLink>
      <p class="font-bold text-lg">PROFILE</p>
    </div>

  </HeaderMenu>
  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
import { format } from "date-fns";

const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});
const route = useRoute();


const resProfile = ref()
const loadProfile = async () => {
    try {
        const res = await dataApi.getMyProfile()
        resProfile.value = res.data.data;
        resProfile.value.fullname = `${res.data.data?.rank_name_th_abb} ${res.data.data?.first_name} ${res.data.data?.last_name}`
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    loadProfile()
})
</script>