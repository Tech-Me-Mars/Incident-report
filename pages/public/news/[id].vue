<template>

    <section class="p-3">
        <HeaderMenu class="flex justify-between">
            <div class="flex items-center gap-3">
                <NuxtLink to="/public/news/">
                    <TmmButtonBackPage />
                </NuxtLink>
                <p class="font-bold text-lg">NEWS</p>
            </div>
        </HeaderMenu>

        <!-- <PageNewsDetailContent /> -->
        <!-- <PageNewsDetailComment /> -->
        <TmmCard class="card">
            <template #header>
                <!-- <div class="flex flex-wrap items-center gap-2">
                <TmmAvatar label="ประยุท" :size="40" src="https://mpics.mgronline.com/pics/Images/565000005465502.JPEG">
                </TmmAvatar>
                <div class="flex flex-col">
                    <p class="font-semibold text-sm">พล.ต.ท ยิ่งยศ ใจดี</p>
                    <TmmLabelSmall class="text-gray-400 text-xs" label="12 ชั่วโมงที่แล้ว" />
                </div>
            </div> -->
            </template>
            <template #body>
                <!-- <p class="leading-normal text-gray-700 py-3 text-xs " v-html="fullText">
            </p> -->
                <div class="flex flex-col">
                    <p class="font-semibold text-sm">{{ resPost?.name }}</p>
                    <TmmLabelSmall class="text-gray-400 text-xs"
                        :label="`${formattedDateBuddha(resPost?.created_at)}`" />
                </div>
                <p class="leading-normal text-gray-700 py-3 text-xs">
                    {{ resPost?.incident_detail }}
                </p>
                <div>
                    <div class="overflow-x-auto overflow-y-auto  whitespace-nowrap ">
                        <a-image-preview-group class="">
                            <a-image v-for="(item, index) in resPost?.report_image" :key="index" :width="110"
                                :height="100" class="rounded-lg p-1" :src="item.image_path" />
                        </a-image-preview-group>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="py-1 flex items-center gap-1 text-gray-400">
                    <span @click="showShareModal = true" class="text-xs"><van-icon name="share-o" />แชร์</span>
                    <!-- <HeartFilled @click="toggleLike(resPost?.id)"
                        :class="{ '!text-pink-600': resPost?.me_like, 'animate-like': resPost?.me_like }" />
                    <TmmLabelSmall :label="`${resPost?.news_like_sum} คน`" /> -->
                </div>
            </template>
        </TmmCard>

        <van-action-sheet v-model:show="showShareModal" title="แชร์ไปยัง">
            <div class="content px-5 py-10">
                <div class="flex flex-row gap-2">
                    <SocialShare network="facebook" :styled="true" :label="false" />
                    <SocialShare network="line" :styled="true" :label="false" />
                    <SocialShare network="twitter" :styled="true" :label="false" />
                    <div class="bg-red-600 text-white px-2 cursor-pointer rounded-md" @click="copyToClipboard">copy url
                    </div>
                </div>
            </div>
        </van-action-sheet>


    </section>
</template>

<script setup>
definePageMeta({
    layout: 'public'
    // or middleware: 'auth'
})

// [MODAL VARIABLE AND FUCTION]
const open = ref(false);
const showDrawer = () => {
    console.log('open')
    open.value = true;
};
const onClose = () => {
    open.value = false;
};
// [END MODAL VARIABLE AND FUCTION]

//! /////// [Api Variable] /////////
import { format } from "date-fns";
import * as dataApi from './api/data.js'
import { useRouter, useRoute } from "vue-router";
import autoAnimate from "@formkit/auto-animate"

const route = useRoute();
const router = useRouter();


const showShareModal = ref(false);
const formattedDateBuddha = (dataDate) => {
    if (!dataDate) {
        return '';
    }
    const date = new Date(dataDate);
    date.setFullYear(date.getFullYear() + 543);
    const formatted = format(date, "d-M-yyyy H:mm:ss");
    return formatted;
};


const toggleLike = async (postId) => {
    try {
        const res = await dataApi.likeOrDislike({ report_id: postId });
        const { event_like, news_like_sum } = res.data.data;
        if (event_like == "like") {
            resPost.value.me_like = true;
        } else {
            resPost.value.me_like = false;
        }
        resPost.value.news_like_sum = news_like_sum


    } catch (error) {
        console.error(error);
    }
}
const currentUrl = window.location.href;
import { message } from 'ant-design-vue';
const copyToClipboard = () => {
    showShareModal.value = false;
    navigator.clipboard.writeText(currentUrl).then(() => {
        message.success('copy url success');
    }).catch(err => {
        message.error('copy url error');
        console.error('Failed to copy: ', err)
    })
}

onMounted(() => {
    loadPost();
})
const resPost = ref()
const loadPost = async () => {
    try {
        const res = await dataApi.getPublicNewsById(route.params.id)
        resPost.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
.animate-like {
    animation: likeAnimation 0.5s ease-in-out;
}

@keyframes likeAnimation {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>