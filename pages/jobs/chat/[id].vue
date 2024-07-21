<template>
    <HeaderMainChat />
    <div class="bg-blue-500 px-4 py-3 text-white flex justify-between items-center fixed top-20 left-0 w-full z-10">
        <HomeOutlined @click="navigateTo('/')" style="font-size: 20px" />
        <span>{{ resJob?.jobs?.name }}</span>

        <button id="login" class="hover:bg-blue-400 rounded-md p-1" @click="(()=>{showParticipants = true,notiNewMessage = false})">
            <van-badge :content="resParticipantc?.length || null">
                <UserOutlined style="font-size: 20px" />
            </van-badge>
        </button>

    </div>
    <div class="flex-1  justify-between flex flex-col h-full pt-[8.5rem]">


        <van-popup v-model:show="showParticipants" position="bottom" closeable :style="{ height: '70%' }">
            <div class="py-10">
                <strong class="pl-4 text-center">ผู้เกี่ยวข้อง</strong>
                <a-list item-layout="horizontal" :data-source="resParticipantc">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-list-item-meta description="">
                                <template #title>
                                    <span>{{ item?.fullname }}</span>
                                </template>
                                <template #avatar>
                                    <a-avatar :src="item.upload_avatar || '/image/defaultpic.webp'" />
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </van-popup>

        <!-- กล่องแชท -->
        <InfiniteLoading :firstload="false" :top="true" @infinite="loadMessageAppend">
            <template #spinner>
                <span></span>
            </template>
            <template #complete>
                <div class="flex justify-center">
                    <span class="tex-center text-xs text-gray-600">ไม่มีข้อความอีกแล้ว!</span>
                </div>
            </template>
        </InfiniteLoading>
        <div id="messages"
            class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <div class="chat-message" v-for="(item, index) in resMessage" :key="index">
                <span class="text-center flex justify-center"
                    v-if="index === 0 || formattedDateOnly(item.created_at) !== formattedDateOnly(resMessage[index - 1].created_at)">
                    <van-tag round plain type="success" class="!p-1 !px-5">
                        {{ formattedDateOnly(item.created_at) }}
                    </van-tag>
                </span>
                <a-divider v-if="lastRead === index && item?.sender_employee_id !== resProfile?.police_employee_id">
                    ยังไม่ได้อ่าน
                </a-divider>

                <div v-if="notiNewMessage" class="notification p-2" @click="scrollToBottom">
    มีข้อความใหม่
  </div>
                <!--กล่องส่ง(ขวา) -->
                <!-- @mousedown="startPressEdit(item)" -->
                <div :id="`message-${index}`" class="flex flex-col items-end gap-1" @click="startPressEdit(item)"
                    @mouseup="cancelPressEdit" @mouseleave="cancelPressEdit" v-if="
                        item?.sender_employee_id == resProfile?.police_employee_id
                    ">
                    <span class="text-xs text-gray-600">{{ item?.rank_name_th_abb }} {{ item?.first_name }}
                        {{ item?.last_name
                        }}</span>
                    <div class="flex items-end justify-end">
                        <div class="flex flex-col space-y-2 max-w-xs mx-2 items-end">
                            <div>
                                <span
                                    class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white text-sm"
                                    v-html="highlightMentions(item.message)"></span>
                            </div>
                        </div>
                        <TmmAvatar :src="item?.upload_avatar"
                            :label="`${item?.rank_name_th_abb} ${item?.first_name} ${item?.last_name}`" />
                    </div>
                    <span class="font antialiased text-gray-600" style="font-size: 12px;">{{
                        formattedTimeOnly(item?.created_at) }}</span>
                </div>

                <!-- กล่องรับ (ซ้าย) -->
                <div :id="`message-${index}`" class="flex flex-col items-start gap-1" v-else>
                 
                    <DeferredContent v-if="index === resMessage.length - 1" @load="notiNewMessage = false">
                    </DeferredContent>
                    <span class="text-xs text-gray-600">{{ item?.rank_name_th_abb }} {{ item?.first_name }} {{
                        item?.last_name
                        }}
                    </span>
                    <div class="flex items-end">
                        <div class="flex flex-col space-y-2 max-w-xs mx-2 order-2 items-start">
                            <div>
                                <span
                                    class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 text-sm"
                                    v-html="highlightMentions(item.message)"></span>
                            </div>
                        </div>
                        <TmmAvatar :src="item?.upload_avatar"
                            :label="`${item?.rank_name_th_abb} ${item?.first_name} ${item?.last_name}`" />
                    </div>
                    <span class="font antialiased text-gray-600" style="font-size: 12px;">{{
                        formattedTimeOnly(item?.created_at) }}</span>
                </div>
            </div>
        </div>
       

        <!-- จบกล่องแชท -->
        <div class="fixed  bottom-0 left-0 w-full bg-white shadow-lg">
            <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div id="users-mention" v-if="filteredMentions?.length > 0">
                    <div v-if="showDropdown && !editMode" class="ant-mentions-dropdown">
                        <ul>
                            <li v-for="(mention, index) in filteredMentions" :key="index"
                                @click="selectMention(mention)">
                                <TmmAvatar :src="mention.upload_avatar" /> {{ mention.fullname }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex items-center">
                    <input ref="mentionInput" type="text" @input="checkTagName" v-model="message"
                        placeholder="Type your message..."
                        class="flex-1 border rounded-full px-4 py-2 focus:outline-none" />

                    <button class="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
                        @click="sendMessage()">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <van-action-sheet v-model:show="showEditMessage" :actions="actions" @select="onSelectEdit" cancel-text="Cancel"
            close-on-click-action @cancel="onCancel" />

        <van-action-sheet v-model:show="editMode" title="แก้ไขข้อความ">
            <div class="p-3 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 pt-[15rem]">
                <div id="users-mention" v-if="filteredMentions?.length > 0">
                    <div v-if="showDropdown && editMode" class="ant-mentions-dropdown">
                        <ul>
                            <li v-for="(mention, index) in filteredMentions" :key="index"
                                @click="selectMention(mention)">
                                <TmmAvatar :src="mention.upload_avatar" /> {{ mention.fullname }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex items-center">
                    <input ref="mentionInputEdit" type="text" @input="checkTagName" v-model="messageEdit"
                        placeholder="Type your message..."
                        class="flex-1 border rounded-full px-4 py-2 focus:outline-none" />
                    <!-- <a-mentions id="mentionEdit" class="!border !rounded-full !px-4 !py-2 !focus:outline-none" autofocus
                        v-model:value="messageEdit" :options="resParticipantcMentions"></a-mentions> -->
                    <button class="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
                        @click="sendMessageEdit()">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </van-action-sheet>
    </div>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>
<script setup>
definePageMeta({
    layout: "chat",
    // or middleware: 'auth'
});
import DeferredContent from 'primevue/deferredcontent';
import { format, parseISO } from "date-fns";
import { th } from "date-fns/locale";
function formattedDateBuddha(dateString) {
    const date = dateString ? parseISO(dateString) : new Date();
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = format(date, "d/MM/yyyy HH:mm", { locale: th });

    // Replace the Gregorian year with the Buddhist year
    return formattedDate.replace(
        date.getFullYear().toString(),
        buddhistYear.toString()
    );
}
function formattedTimeOnly(dateString) {
    const date = dateString ? parseISO(dateString) : new Date();
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = format(date, "HH:mm", { locale: th });

    // Replace the Gregorian year with the Buddhist year
    return formattedDate.replace(
        date.getFullYear().toString(),
        buddhistYear.toString()
    );
}
function formattedDateOnly(dateString) {
    const date = dateString ? parseISO(dateString) : new Date();
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = format(date, "d/MM/yyyy", { locale: th });

    // Replace the Gregorian year with the Buddhist year
    return formattedDate.replace(
        date.getFullYear().toString(),
        buddhistYear.toString()
    );
}

//! /////// [Api Variable] /////////
import * as dataApi from "./api/data.js";
import { useFieldArray, useForm, Form, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
const route = useRoute();

const isloadingAxi = useState("isloadingAxi");
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

const popUpTag = ref(false);
const hide = () => {
    popUpTag.value = false;
};

const checkAddTag = async (e) => {
    console.log(e)
}

const resProfile = ref();
const loadProfile = async () => {
    try {
        const res = await dataApi.getMyProfile();
        resProfile.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
};
const resJob = ref();
const loadJob = async () => {
    try {
        const res = await dataApi.getJobProccessById(route.params.id);
        resJob.value = res.data.data;
        console.log("resJob", resJob.value);
    } catch (error) {
        console.error(error);
    }
};

onMounted(async () => {
    await loadProfile();
    await loadParticipants();
    loadJob();

    mqttSub();

    await loadMessage();
    // await scrollToMessage()
});
const showParticipants = ref(false);
const resParticipantc = ref([]);
const resParticipantcMentions = ref([]);

const loadParticipants = async () => {
    try {
        const res = await dataApi.getParticipant(route.params.id);
        resParticipantc.value = res.data.data.map((e, i) => ({
            ...e,
            indexkey: i + 1,
            fullname: `${e?.rank_name_th_abb} ${e?.first_name} ${e?.last_name}`,
            value: `${e?.rank_name_th_abb} ${e?.first_name} ${e?.last_name}`,
            label: `${e?.rank_name_th_abb} ${e?.first_name} ${e?.last_name}`,
        }));
        resParticipantcMentions.value = [...resParticipantc.value];
        resParticipantcMentions.value.unshift({
            fullname: "all",
            value: "all",
            label: "all",
            upload_avatar: ""
        });
    } catch (error) {
        console.error(error);
    }
};

const scrollToMessage = async (id) => {
    const waitForElement = (id) => {
        return new Promise((resolve) => {
            try {
                const element = document.getElementById(id);
                if (element) {
                    resolve(element);
                    return;
                }

                const observer = new MutationObserver((mutations) => {
                    const element = document.getElementById(id);
                    if (element) {
                        resolve(element);
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            } catch (error) {
                console.error(error);
            }
        });
    };
    try {
        const element = await waitForElement(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                showLazy.value = true;
            }, 5000);
        }
    } catch (error) {
        console.error("An error occurred while scrolling to the message:", error);
    }
};

const resMessage = ref([]);
const lastActive = ref();
const lastRead = ref();
const showLazy = ref(false);
const loadMessageAppend = async ($state) => {
    console.log("load append");
    try {
        const payload = {
            id: resMessage.value.map((post) => post.id),
            per_page: 20,
        };
        const res = await dataApi.getMessage(payload, route.params.id);
        // resMessage.value = [...res.data.data, ...resMessage.value];
        // resMessage.value = resMessage.value.map((e, i) => ({ ...e, lazy: false }));
        // resMessage.value[0].lazy = true;
        if (res.data.data.length == 0) {
            $state.complete();
        } else {
            // comments.value.unshift(...json.reverse());
            resMessage.value.unshift(...res.data.data);
            resMessage.value = resMessage.value.map((e, i) => ({
                ...e,
                indexkey: i + 1,
                fullname: `${e?.rank_name_th_abb} ${e?.first_name} ${e?.last_name}`,
            }));
            $state.loaded();
        }
    } catch (error) {
        console.error(error);
    }
};
const loadMessage = async () => {
    console.log("เข้า scroll up load...");
    const no_read = route?.query?.no_read;
    let per_page = 20;
    if (
        no_read &&
        !null &&
        (per_page != undefined) & (per_page != "") &&
        per_page != "undefined"
    ) {
        per_page = no_read;
    }
    try {
        const payload = {
            id: resMessage.value.map((post) => post.id),
            per_page: per_page,
        };
        const res = await dataApi.getMessage(payload, route.params.id);
        resMessage.value.unshift(...res.data.data);
        resMessage.value = resMessage.value.map((e, i) => ({
            ...e,
            indexkey: i + 1,
            fullname: `${e?.rank_name_th_abb} ${e?.first_name} ${e?.last_name}`,
        }));
        // resMessage.value = [...resMessage.value, ...res.data.data];
        // resMessage.value[0].lazy = true;
        console.log("resMessage", resMessage.value);
        // หาจำนวน  read_messages_status === false
        const not_read_count = await resMessage.value.filter(
            (item) => item.read_messages_status == false
        ).length;
        resMessage.value.forEach((e, i) => {
            // เช็คว่ามีอันไหนบ้างที่ยังไม่อ่านและไม่ใช่ของตัวเอง
            if (
                e.read_messages_status == false &&
                e?.sender_employee_id != resProfile.value?.police_employee_id
            ) {
                lastActive.value = i;
                return (lastRead.value = i);
            }
        });
        console.log("lastActive after for ", lastActive.value);

        // กรณี มีแชทและมีข้อความยังไม่อ่าน
        if (resMessage.value.length > 0 && lastActive.value) {
            // ให้ไปยังแชทที่ยังไม่อ่าน
            await scrollToMessage(`message-${lastActive.value}`);
            // กรณี มีแชทและไม่มีข้อความที่ยังไม่ได้อ่าน (อ่านหมดแล้ว)
        } else if (resMessage.value.length > 0 && lastActive.value == undefined) {
            console.log("เข้า else");
            // ให้ไปล่างสุดของแชท
            await scrollToMessage(`message-${resMessage.value.length - 1}`);
        }
    } catch (error) {
        console.error(error);
    }
};

// const formatMessage = (message) => {
//     // Replace mentions with underlined versions
//     resParticipantc.value?.forEach(person => {
//         const regex = new RegExp(`@${person.fullname}\\b`, 'g');
//         message = message.replace(regex, `<u>@${person.fullname}</u>`);
//     });
//     console.log()
//     return message;
// };
const formatMessage = (message) => {
    // Replace mentions with underlined versions
    resParticipantc.value.forEach(person => {
        const regex = new RegExp(`@${person.name}\\b`, 'g');
        const match = message.match(regex);
        if (match && match[0] === `@${person.name}`) {
            const fullName = person.fullname || person.name;
            const regexFullname = new RegExp(`@${fullName}\\b`, 'g');
            message = message.replace(regexFullname, `<u>@${fullName}</u>`);
        }
    });
    return message;
};
const message = ref("");
const sendMessage = async () => {
    try {
        showDropdown.value = false;
        if (!message.value) {
            return;
        }
        const payload = {
            jobs_id: route.params.id,
            type_message: "text", // text|image|vdo
            message: message.value,
        };
        const res = await dataApi.sendMessage(payload, route.params.id);
        const objForAppend = {
            id: res.data?.message?.id,
            sender_employee_id: res.data?.message?.sender_employee_id,
            message: res.data?.message?.message,
            rank_name_th_abb: res.data?.message?.rank_name_th_abb,
            first_name: res.data?.message?.first_name,
            last_name: res.data?.message?.last_name,
            upload_avatar: res.data?.message?.upload_avatar || "",
            read_messages_status: true,
            is_cancel: false,
        };
        console.log("objForAppend", objForAppend);
        resMessage.value = await [...resMessage.value, objForAppend];
        // const messagesElement = document.getElementById('messages');
        // // เลื่อน scroll ลงไปที่ส่วนล่างของกล่อง
        // messagesElement.scrollTop = messagesElement.scrollHeight;
        message.value = "";
        await scrollToMessage(`message-${resMessage.value.length - 1}`);
        // const element = await waitForElement(`message-${resMessage.value.length}`);
        // if (element) {
        //     element.scrollIntoView({ behavior: 'smooth' });
        // }
        // loadMessage()
    } catch (error) {
        console.error(error);
    }
};
import { $mqtt } from "vue-paho-mqtt";

const mqtt_pre = useRuntimeConfig().public.MQTT_PRE;
const mqttSub = async () => {
    try {
        $mqtt.subscribe(`${mqtt_pre}/jobs/chat/${route.params.id}/messages`, (message) => {
            // เมื่อมีการรับข้อมูลจาก mqtt
            const parsedMessage = JSON.parse(message);
            console.log("parsedMessage", parsedMessage);

            if (parsedMessage.type == "append_data") {
                if (
                    resProfile.value?.police_employee_id ==
                    parsedMessage.data.sender_employee_id
                ) {
                    return;
                }
                
                const objForAppend = {
                    id: parsedMessage?.data?.id,
                    sender_employee_id: parsedMessage?.data?.sender_employee_id,
                    message: parsedMessage?.data?.message,
                    upload_avatar: parsedMessage.data?.upload_avatar
                        ? parsedMessage.data?.upload_avatar
                        : "",
                    rank_name_th_abb: parsedMessage.data?.rank_name_th_abb
                        ? parsedMessage.data?.rank_name_th_abb
                        : "",
                    first_name: parsedMessage.data?.first_name
                        ? parsedMessage.data?.first_name
                        : "",
                    last_name: parsedMessage.data?.last_name
                        ? parsedMessage.data?.last_name
                        : "",
                    read_messages_status: true,
                    is_cancel: false,
                };
                resMessage.value = [...resMessage.value, objForAppend];
                showNotification()
                // เมื่อมีการรับข้อมูลจาก mqtt
                console.log(parsedMessage);
            }
            if (parsedMessage.type == "edit_data") {
                // เข้าEdit
                const item = resMessage.value.find(
                    (item) => item.id == parsedMessage?.data?.id
                );
                if (item) {
                    item.message = parsedMessage?.data?.message;
                }
            }
            if (parsedMessage.type == "cancel_data") {
                console.log(parsedMessage?.data?.id);
                const item = resMessage.value.find(
                    (item) => item.id == parsedMessage?.data?.id
                );
                if (item) {
                    item.is_cancel = true;
                    item.message = parsedMessage?.data?.message;
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
};

// ############# action sheet
const showEditMessage = ref(false);
const actions = [
    { name: "แก้ไข", id: 1 },
    { name: "ลบ", id: 2 },
];

const onSelectEdit = (item) => {
    try {
        showEditMessage.value = false;
        console.log(item);
        if (item.id == 1) {
            editMessage();
            // แก้ไข
        } else {
            deleteMessage();
            // ลบ
        }
    } catch (error) {
        console.error(error);
    }
};
const editMode = ref(false); // เปิด modal edit message
const messageEdit = ref("");
const editMessage = async () => {
    try {
        editMode.value = true;
        messageEdit.value = resObectMessage.value.message;
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error);
    }
};

const deleteMessage = async () => {
    try {
        if (resObectMessage.value.is_cancel == true) {
            errorAlert.value = false;
            return (alertToast.value = {
                severity: "success",
                summary: "ทำรายการสำเร็จ",
                detail: "คุณลบข้อความนี้ไปแล้ว",
            });
        }
        const res = await dataApi.deleteMessage(resObectMessage.value.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error);
    }
};
const sendMessageEdit = async () => {
    try {
        if (!messageEdit.value) {
            return;
        }
        const payload = {
            message: messageEdit.value,
        };
        const res = await dataApi.updateMessage(payload, resObectMessage.value.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        editMode.value = false; // ปิด modal edit
        messageEdit.value = ""; // reset message edit
        // await scrollToMessage(`message-${resMessage.value.length - 1}`);
    } catch (error) {
        editMode.value = false;
        messageEdit.value = "";
        console.error(error);
    }
};

// ############## [[ คลิกค้าง ]]#####################

const resObectMessage = ref();
const timer = ref(null);
const startPressEdit = (item) => {
    try {
        if (item?.is_cancel==true) {
            return;
        }
        resObectMessage.value = item
        notiNewMessage.value =false
        handleLongPressEdit()
        // resObectMessage.value = item;
        // timer.value = setTimeout(() => {
        //     handleLongPressEdit();
        // }, 650); // 1000 milliseconds = 1 second
        // console.log('resObectMessage', resObectMessage.value)
    } catch (error) {
        console.error(error);
    }
};

const cancelPressEdit = () => {
    if (timer.value !== null) {
        clearTimeout(timer.value);
        timer.value = null;
    }
};

const handleLongPressEdit = () => {
            try {
                showEditMessage.value = true;
                nextTick(() => {
                    mentionInputEdit.value.focus();
                });
            } catch (error) {
                console.error(error);
            }
        };

const visible = ref(false);
const filteredPersons = ref([]);
// ############## ระบบ TAG
const showDropdown = ref(false);
const mentionInput = ref(null); // Reference to the input element
const mentionInputEdit = ref(null); // Reference to the input element
const filteredMentions = computed(() => {
    if (editMode.value == true) {
        const query = messageEdit.value.split('@').pop();
        return resParticipantcMentions.value.filter(mention => mention.fullname.includes(query));
    } else {
        const query = message.value.split('@').pop();
        return resParticipantcMentions.value.filter(mention => mention.fullname.includes(query));
    }


});

const checkTagName = () => {
    if (message.value.includes('@') || messageEdit.value.includes('@')) {
        showDropdown.value = true;
        notiNewMessage.value = false
    } else {
        showDropdown.value = false;
    }
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        showDropdown.value = false;
    }
};

const hideDropdown = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200); // Delay to allow click to register
};

const selectMention = (mention) => {
    if (editMode.value == true) {
        const parts = messageEdit.value.split('@');
        parts.pop(); // Remove the part after @
        messageEdit.value = parts.join('@') + '@' + mention.fullname + ' ';
        showDropdown.value = false;
        mentionInputEdit.value.focus(); // Set focus back to the input field
    } else {
        const parts = message.value.split('@');
        parts.pop(); // Remove the part after @
        message.value = parts.join('@') + '@' + mention.fullname + ' ';
        showDropdown.value = false;
        mentionInput.value.focus(); // Set focus back to the input field
    }

};


const highlightMentions = (message) => {
    let highlightedMessage = message;
    if (resParticipantc.value.length > 0) {
        resParticipantc.value.forEach((p) => {
            const mention = `@${p.fullname}`;
            const mentionRegex = new RegExp(mention, 'g');
            highlightedMessage = highlightedMessage.replace(mentionRegex, `<span class="font-bold underline">${mention}</span>`);
        });
        return highlightedMessage;
    }

};

const notiNewMessage = ref(false)
// function isAtBottom() {
//   const scrollTop = window.scrollY
//   const windowHeight = window.innerHeight
//   const documentHeight = document.documentElement.scrollHeight

//   return scrollTop + windowHeight >= documentHeight - 1
// }
function showNotification() {
    notiNewMessage.value = true
//     if (!isAtBottom()) {
//         notiNewMessage.value = true
//   }
}

function hideNotification() {
    notiNewMessage.value = false
}

function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
  hideNotification()
}
</script>


<style>
/* .mention {
  color: rgb(128, 133, 129);
  text-decoration: underline;
} */
.result {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 300;
    width: 400px;
    padding: 10px;
    text-align: center;
    margin: 0 auto 10px auto;
    background: #eceef0;
    border-radius: 10px;
}

/* html {
    scroll-behavior: smooth;
} */

.scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
}

/* suggesttion @mention */

.ant-mentions-dropdown {
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    bottom: 80px !important;
    width: 100% !important;
    max-height: 10rem !important;
    overflow-y: auto !important;
    padding: 10px !important;
    background-color: white !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    border-radius: 8px !important;
    z-index: 9999 !important;
    border: 1px solid #e0e0e0 !important;
}

.ant-mentions-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.ant-mentions-dropdown li {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #e0e0e0;
}

.ant-mentions-dropdown li:last-child {
    border-bottom: none;
}

.ant-mentions-dropdown li:hover {
    background-color: #f5f5f5;
}

.notification {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
 
  border-radius: 5px;
  cursor: pointer;
  z-index: 9999;
}
</style>