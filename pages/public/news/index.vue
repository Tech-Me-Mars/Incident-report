<template>
    <section class="p-3">
        <HeaderMenu class="flex justify-between">
            <p class="header-title-page">NEWS</p>
        </HeaderMenu>
        <TmmCard class="mb-2 card" v-for="(item, index) in resPosts" :key="index">
            <template #header>
                <DeferredContent v-if="(index + 1) == lastPost" class="" @load="appendDataPost()">
                </DeferredContent>

                <NuxtLink :to="`/public/news/${item.id}`">
                    <div class="flex flex-wrap items-center gap-2">
                        <!-- <TmmAvatar label="ประยุท" :size="40" :src="item.author.avatar_image">
                    </TmmAvatar> -->
                        <div class="flex flex-col">
                            <p class="font-semibold text-sm">{{ item.name }}</p>
                            <TmmLabelSmall class="text-gray-400 text-xs"
                                :label="`${formattedDateBuddha(item?.created_at)}`" />

                        </div>
                    </div>
                </NuxtLink>

            </template>
            <template #body>
                <p class="leading-normal text-gray-700 py-3 text-xs">
                    <span v-html="item.incident_detail" :class="{ 'line-clamp-3': !item.showMore }"></span>
                    <span @click="item.showMore = !item.showMore" v-show="!item.showMore"
                        class="mt-4 text-gray-400 focus:outline-none cursor-pointer">...ดูเพิ่มเติม</span>
                </p>
                <!-- <div class="overflow-x-auto overflow-y-auto whitespace-nowrap scrollbar-none">
                <a-image-preview-group class="">
                    <a-image v-for="(item_image, index_image) in item.report_image" :key="index_image" :width="70"
                        :height="70" class="rounded-lg p-1" :src="item_image.image_path" />
                </a-image-preview-group>
            </div> -->
                <swiper :pagination="{
                    dynamicBullets: true,
                }" :modules="modules" class="mySwiper">
                    <swiper-slide class="!flex !justify-center" v-for="(item_image, index_image) in item.report_image"
                        :key="index_image">
                        <a-image class="rounded-lg p-1 !flex !justify-center" :src="item_image.image_path" />
                        <!-- <img :src="item_image.image_path" style="width: 100%;max-height: 20rem;" /> -->
                    </swiper-slide>
                </swiper>
            </template>
            <template #footer>
                    <div class="py-1 flex items-center justify-between  gap-1 text-gray-400">
                        <div class="flex items-center gap-2">
                            <!-- <HeartFilled @click="toggleLike(item.id)"
                                :class="{ '!text-pink-600': item.me_like, 'animate-like': item.me_like }" />
                            <TmmLabelSmall :label="`${item.news_like_sum} คน`" /> -->
                        </div>
                        <span v-if="item?.is_share_public"  @click="openShareModal(item.id)" class="text-xs"><van-icon
                                name="share-o" />แชร์</span>
                    </div>
                    <!-- <div class="py-1 flex items-center gap-1 text-gray-400">
                    <TmmIcon icon="mdi mdi-comment-text-outline" />
                </div> -->
               

            </template>

        </TmmCard>

        <van-action-sheet v-model:show="showShareModal" title="แชร์ไปยัง">
            <div class="content px-5 py-10">
                <div class="flex flex-row gap-2">
                    <SocialShare network="facebook" :url="shareUrl" :styled="true" :label="false" />
                    <SocialShare network="line" :url="shareUrl" :styled="true" :label="false" />
                    <SocialShare network="twitter" :url="shareUrl" :styled="true" :label="false" />
                    <div class="bg-red-600 text-white px-2 cursor-pointer rounded-md"
                        @click="copyToClipboard(item?.id)">copy
                        url</div>
                </div>
            </div>
        </van-action-sheet>
        <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
    </section>
</template>

<script setup>
definePageMeta({
    layout: 'public'
    // or middleware: 'auth'
})
import DeferredContent from 'primevue/deferredcontent';
// import { format } from "date-fns";
import { format, parseISO } from 'date-fns';
import { th } from 'date-fns/locale';

const showMore = ref(false);

const toggleText = () => {
    showMore.value = !showMore.value;
};

function formattedDateBuddha(dateString) {
    const date = parseISO(dateString);
    const buddhistYear = date.getFullYear() + 543;
    const formattedDate = format(date, `d MMMM yyyy HH:mm:ss`, { locale: th });

    // แทนที่ปี ค.ศ. ด้วยปี พ.ศ.
    return formattedDate.replace(date.getFullYear().toString(), buddhistYear.toString());
}

const slidesPerViewMd = 6;
const slidesPerViewNormal = 3;

const slidesPerView = computed(() => {
    return window.innerWidth >= 768 ? slidesPerViewMd : slidesPerViewNormal;
});


//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'

const isloadingAxi = useState('isloadingAxi')

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});


onMounted(() => {
    appendDataPost()
    // loadPost()
})


const shareUrl = ref('')
const showShareModal = ref(false);
const openShareModal = async (id) => {
    shareUrl.value = `${window.location.origin}/public/news/${id}`
    showShareModal.value = true;
}


import { message } from 'ant-design-vue';
const copyToClipboard = (id) => {
    showShareModal.value = false;
    navigator.clipboard.writeText(shareUrl.value).then(() => {
        message.success('copy url success');
    }).catch(err => {
        message.error('copy url error');
        console.error('Failed to copy: ', err)
    })
}


const lastPost = ref();
const resPosts = ref([])
const appendDataPost = async () => {
    try {
        const payload = await {
            id: resPosts.value.map(post => post.id), // Map newsPost.id to an array
            per_page: 2
        };
        const res = await dataApi.getPublicNewsLazy(payload)
        resPosts.value = [...resPosts.value, ...res.data.data]
        lastPost.value = resPosts.value.length
    } catch (error) {
        console.error(error);
    }
}

const toggleLike = async (postId) => {
    const post = resPosts.value.find(post => post.id === postId);
    if (!post) {
        console.error(`Post with id ${postId} not found.`);
        return;
    }
    try {
        const res = await dataApi.likeOrDislike({ report_id: postId });
        const { event_like, news_like_sum } = res.data.data;

        post.me_like = event_like === "like";
        post.news_like_sum = news_like_sum;
    } catch (error) {
        console.error(error);
    }
}

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const modules = [Pagination]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    display: none;
}

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

.swiper {
    width: 100%;
    height: 100%;
}

.-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* .swiper-pagination-bullet-active {
    opacity: 1;
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background: #cc8084!important;
} */
</style>