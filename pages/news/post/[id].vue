<template>
    <HeaderMainProfile />
    <section class="p-3">
        <HeaderMenu class="flex justify-between">
            <div class="flex items-center gap-3">
                <NuxtLink to="/news">
                    <TmmButtonBackPage />
                </NuxtLink>
                <p class="font-bold text-lg">NEWS</p>
            </div>
            <!-- <TmmButtonExportHeader @click="showDrawer" /> -->
        </HeaderMenu>
        <TmmCard class="card">
            <template #header>
                <div class="flex gap-2">
  <div class="flex items-center gap-2">
    <TmmAvatar :label="resPost?.inquiry_employee_fullname" :size="40" :src="resPost?.inquiry_employee_avatar">
    </TmmAvatar>
  </div>
  <div class="w-10/12 flex flex-col">
    <p class="font-semibold text-sm">{{ resPost?.inquiry_employee_fullname }}</p>
    <TmmLabelSmall class="text-gray-400 text-xs" :label="`${formattedDateBuddha(resPost?.created_at)}`" />
  </div>
</div>
            </template>
            <template #body>
                <!-- <p class="leading-normal text-gray-700 py-3 text-xs " v-html="fullText">
            </p> -->
             <p class="font-bold text-sm line-clamp-1 mt-3">{{ resPost?.title }}</p>
                <p class="leading-normal text-gray-700 pb-2 text-xs" v-html="resPost?.detail"></p>

                <div>
                    <div class="overflow-x-auto overflow-y-auto  whitespace-nowrap ">
                        <a-image-preview-group class="">
                            <a-image v-for="(item, index) in resPost?.report_image_all" :key="index" :width="110"
                                :height="100" class="rounded-lg p-1" :src="item" />
                        </a-image-preview-group>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="py-1 flex items-center justify-between  gap-1 text-gray-400">
                    <div class="flex items-center gap-2">
                        <HeartFilled @click="toggleLike(resPost?.id)"
                            :class="{ '!text-pink-600': resPost?.me_like, 'animate-like': resPost?.me_like }" />
                        <TmmLabelSmall :label="`${resPost?.news_like_sum} คน`" />
                    </div>

                    <span v-if="resPost?.is_share_public" @click="showShareModal = true" class="text-xs"><van-icon
                            name="share-o" />แชร์</span>
                </div>
            </template>
        </TmmCard>

        <van-action-sheet v-model:show="showShareModal" title="แชร์ไปยัง">
            <div class="content px-5 py-10">
                <div class="flex flex-row gap-2">
                    <SocialShare network="facebook" :url="shareUrl" :styled="true" :label="false" />
                    <SocialShare network="line" :url="shareUrl" :styled="true" :label="false" />
                    <SocialShare network="twitter" :url="shareUrl" :styled="true" :label="false" />
                    <div class="bg-red-600 text-white px-2 cursor-pointer rounded-md" @click="copyToClipboard">copy url
                    </div>
                </div>
            </div>
        </van-action-sheet>

        <!-- MODAL -->
        <a-drawer title="Export File" placement="bottom" :closable="false" :open="open" @close="onClose">
            <NuxtLink :to="`/news/post/export/pdf/${$route.params.id}`">
                <div class="flex gap-3 items-center bg-white border-blue-500 border-2 rounded-xl p-1 mb-2">
                    <TmmIcon icon="mdi mdi-file-pdf-box text-blue-600" style="font-size:30px" />
                    <span class="text-xl font-nomal">Export PDF</span>
                </div>
            </NuxtLink>

            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi-file-pdf-box text-4xl text-pink-600" style="font-size:30px" />
                <span class="text-xl font-nomal">Export PPT</span>
            </div>

            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi-file-jpg-box text-4xl text-lime-600" style="font-size:30px" />
                <span class="text-xl font-nomal">Export JPG</span>
            </div>

            <div class="flex gap-3 items-center bg-zinc-100 rounded-xl p-1 mb-2">
                <TmmIcon icon="mdi mdi mdi-drawing-box text-4xl text-orange-600" style="font-size:30px" />
                <span class="text-xl font-nomal">Export DRAWio</span>
            </div>
        </a-drawer>
        <!-- END MODAL -->
    </section>
</template>

<script setup>
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
import * as dataApi from '../api/data.js'
import { useRouter, useRoute } from "vue-router";
import autoAnimate from "@formkit/auto-animate"

const route = useRoute();
const router = useRouter();

const formattedDateBuddha = (dataDate) => {
    if (!dataDate) {
        return '';
    }
    const date = new Date(dataDate);
    date.setFullYear(date.getFullYear() + 543);
    const formatted = format(date, "d-M-yyyy H:mm:ss");
    return formatted;
};

const showShareModal = ref(false);
const currentUrl = window.location.href;
const shareUrl = computed(() => {
    return `${window.location.origin}/public/news/${route.params.id}`
})
import { message } from 'ant-design-vue';
const copyToClipboard = () => {
    showShareModal.value = false;
    navigator.clipboard.writeText(shareUrl.value).then(() => {
        message.success('copy url success');
    }).catch(err => {
        message.error('copy url error');
        console.error('Failed to copy: ', err)
    })
}

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


onMounted(() => {
    loadPost();
})
const resPost = ref()
const loadPost = async () => {
    try {
        const res = await dataApi.loadPostById(route.params.id)
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