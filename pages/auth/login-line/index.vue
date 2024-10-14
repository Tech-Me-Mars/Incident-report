<template>
    <div>
        <!-- loading... -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as dataApi from '../api/data.js'
import liff from "@line/liff";

// ใช้ useRuntimeConfig() ภายในฟังก์ชัน setup
const config = useRuntimeConfig();
const liffId = config.public.LIFFID;
const liffUrl = config.public.LIFFURL;

const route = useRoute();
const isLineConnected = ref(false);

// ฟังก์ชันเชื่อมต่อ Line
const connectLine = async () => {
    if (!liffId) {
        console.error("liffId ไม่ถูกต้อง");
        return;
    }

    try {
        await liff.init({ liffId });
        liff.ready.then(() => {
            if (liff.isLoggedIn()) {
                loadProfile();
            } else {
                logIn();
            }
        });
    } catch (error) {
        console.error(error);
        isLineConnected.value = true;
    }
};

// ฟังก์ชันสำหรับล็อกอิน
const logIn = () => {
    liff.login({
        redirectUri: window.location.replace(liffUrl),
    });
};

// ฟังก์ชันโหลดโปรไฟล์ผู้ใช้
const loadProfile = async () => {
    try {
        const conText = await liff.getContext();
        const userId = conText.userId;
        await localStorage.setItem("userId", userId);
        const token = await liff.getIDToken();
        await localStorage.setItem("tokenline", token);
        const payload = { line_get_id_token: token };
        const res = await dataApi.lineLogin(payload);
        await localStorage.setItem("token", res.data.data.token);

        if (route?.query?.page) {
            return navigateTo(`/${route?.query?.page}`);
        } else {
            return navigateTo('/');
        }
    } catch (error) {
        if (error.response?.status === 400) {
            // ลบ localStorage ทั้งหมดเมื่อ error 401
            localStorage.clear();
            console.error("Unauthorized: ลบข้อมูลใน localStorage");
            connectLine();
        } else if (error.response?.status === 401) {
            return navigateTo('/auth/register');
        }
        console.error(error);
        isLineConnected.value = true;
    }
};

// เรียกใช้เมื่อคอมโพเนนต์ถูกสร้าง
onMounted(() => {
    connectLine();
});
</script>