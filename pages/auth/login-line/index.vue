<template>
    <div>
        <!-- loading... -->
    </div>
</template>

<script setup>
definePageMeta({
    layout: false,
    // or middleware: 'auth'
});
import { ref } from 'vue'
import * as dataApi from '../api/data.js'

import liff from "@line/liff";
const route = useRoute();

const isLineConnected = ref(false);

const liftId = useRuntimeConfig().public.LIFFID;
const liftUrl = useRuntimeConfig().public.LIFFURL;

liff.init({ liffId: liftId, })
const connectLine = async () => {
    isLineConnected.value = false;
    try {
        // alert('call')
        // console.log(liff.isLoggedIn())
        // liff.init({ liffId: liftId, })
        liff.ready.then(() => {

            // if (liff.isLoggedIn()) {
            //     return loadProfile();
            // } else {
            //     return logIn();
            // }

            // if (liff.isInClient()) {
            //     // console.log("LIFF app is running in LIFF browser.");
            //     loadProfile();
            // } else {
            // console.log('LIFF app is not running in LIFF browser.');
            // alert('LIFF app is not running in LIFF browser.');
            if (liff.isLoggedIn()) {
                console.log("User is logged in");
                loadProfile();
            } else {
                logIn();
            }
            //}
        });


    } catch (error) {
        isLineConnected.value = true;
        console.error(error);
    }
};

const logIn = () => {
    liff.login({
        redirectUri: window.location.replace(liftUrl),
    });
};

const loadProfile = async () => {
    try {
        const conText = await liff.getContext();
        const userId = conText.userId;
        await localStorage.setItem("userId", userId);
        const token = await liff.getIDToken();
        console.log('token line', token);
        await localStorage.setItem("tokenline", token);
        const payload = {
            line_get_id_token: token
        };
        const res = await dataApi.lineLogin(payload);
        console.log("token lineLogin", res.data.data.token);
        await localStorage.setItem("token", res.data.data.token);

        if (route?.query?.page) {
            return navigateTo(`/${route?.query?.page}`);
        }
        else {
            return navigateTo('/')
        }

    } catch (error) {
        if (error.response.data.message === "ยังไม่ได้ลงทะเบียน") {
            // alert("ยังไม่ได้ลงทะเบียน");
            return navigateTo('/auth/register');
        }
        isLineConnected.value = true;
        console.error(error);
    }
};

onMounted(async () => {
    connectLine();
});
</script>