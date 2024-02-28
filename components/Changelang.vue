<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

// ฟังชั่นในการเปลี่ยนภาษา
const changeLanguage = (param) => {
  language.value = param;
}
const { locales, locale, setLocale } = useI18n();

// เมื่อตัวแปร language เปลี่ยน จะทำกา set ภาษา
const language = computed({
  get: () => locale.value,
  set: (value) => {
    // เก็บลงLocal เพื่อใช้ในการเปิดเว็บครั้งต่อไป
    localStorage.setItem("defaultlangguage", value);
    setLocale(value);
  },
});
</script>
<template>
  <!-- <span class="p-buttonset">
        <TmmButton @click="changeLanguage('th-TH')" severity="danger" class="h-auto h-[25px] w-[20px]" :outlined="language != 'th-TH'">
            <img src="/image/flag/flag-thailand.png" class="w-[1.5rem]" />
        </TmmButton>
        <TmmButton @click="changeLanguage('en-US')" severity="danger" class="h-auto h-[25px] w-[20px]" :outlined="language != 'en-US'">
            <img src="/image/flag/flag-us.png" class="w-[1.5rem]" />
        </TmmButton>
    </span> -->
  <div class="flex gap-1">
    <span @click="changeLanguage('th-TH')" :class="['fi', 'fi-th', { 'grayscale': language !== 'th-TH' }]"></span>
    <span @click="changeLanguage('en-US')" :class="['fi', 'fi-gb', { 'grayscale': language !== 'en-US' }]"></span>
  </div>
</template>