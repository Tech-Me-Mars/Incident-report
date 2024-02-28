<script setup>
const fullText = `<p>โครงการสายตรวจเพื่อประชาชน
			<br/>
เรียน ผู้บังคับบัญชา
			<br/>
-ส.ทท.1 กก.2 บก.ทท.3 (ภูเก็ต)
			<br/>
ขอรายงานเหตุนักท่องเที่ยวชาวต่างชาติกระโดดตึกเสียชีวิต
			<br/>
วันนี้(22 ก.ย.66) เวลา19.35 น สายตรวจเขต1 สนามบินภูเก็ต
			<br/>
ได้รับทราบข้อมูลว่าเกิดเหตุ ชาวต่างชาติกระโดดอาคารผู้โดยสารระหว่างประเภศท่าอากาศยสนภูเก็ต
			<br/>
ตกลงมาได้รับบาดเจ็บสาหัส และเสียชีวิตในวันต่อมา
		</p>`;

const showMore = ref(false);
// const trimmedText = computed(() => {
//     return showMore.value ? fullText : fullText.substring(0, 200);
// });
const toggleText = () => {
    showMore.value = !showMore.value;
};

const listImage = [
    'https://www.tcc.or.th/wp-content/uploads/2022/04/19042022_TCCNews_Accident_website-1200x675.png',
    'https://image.posttoday.com/uploads/images/md/2023/09/K6LgsMkOwMLyKVbF1kIu.webp?x-image-process=style/lg',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg/1200px-September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg'
]

const newsPost = ref([])
const appendDataPost = async () => {
    newsPost.value.push({
        id: 1,
        fullText: `<p>โครงการสายตรวจเพื่อประชาชน
			<br/>
เรียน ผู้บังคับบัญชา
			<br/>
-ส.ทท.1 กก.2 บก.ทท.3 (ภูเก็ต)
			<br/>
ขอรายงานเหตุนักท่องเที่ยวชาวต่างชาติกระโดดตึกเสียชีวิต
			<br/>
วันนี้(22 ก.ย.66) เวลา19.35 น สายตรวจเขต1 สนามบินภูเก็ต
			<br/>
ได้รับทราบข้อมูลว่าเกิดเหตุ ชาวต่างชาติกระโดดอาคารผู้โดยสารระหว่างประเภศท่าอากาศยสนภูเก็ต
			<br/>
ตกลงมาได้รับบาดเจ็บสาหัส และเสียชีวิตในวันต่อมา
		</p>`,
        images: [
            { url: 'https://www.tcc.or.th/wp-content/uploads/2022/04/19042022_TCCNews_Accident_website-1200x675.png' },
            { url: 'https://image.posttoday.com/uploads/images/md/2023/09/K6LgsMkOwMLyKVbF1kIu.webp?x-image-process=style/lg' },
            { url: 'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG' },
            { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg/1200px-September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg' }
        ],
        showMore: false,
        like: 25,
        lastTime: "12 ชั่วโมงที่แล้ว",
        author: {
            name: "พล.ต.ท ยิ่งยศ ใจดี",
            avatar_image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Prayuth_2018_cropped.jpg"
        }
    })
}
onMounted(() => {
    appendDataPost()
})


</script>
<template>
    {{ newsPost.length }}
    <TmmCard class="mb-2 card" v-for="(item, index) in newsPost" :key="index">
      
        <template #header>
            <DeferredContent class="" @load="appendDataPost()">
            <NuxtLink :to="`/news/post/${index}`">
                <div class="flex flex-wrap items-center gap-2">
                    <TmmAvatar label="ประยุท" :size="40" :src="item.author.avatar_image">
                    </TmmAvatar>
                    <div class="flex flex-col">
                        <p class="font-semibold text-sm">{{ item.author.name }}</p>
                        <TmmLabelSmall class="text-gray-400 text-xs" :label="`${item.lastTime}`" />
                    </div>
                </div>
            </NuxtLink>
        </DeferredContent>
        </template>
        <template #body>
            <p class="leading-normal text-gray-700 py-3 text-xs">
                <span v-html="fullText" :class="{ 'line-clamp-3': !item.showMore }"></span>
                <span @click="item.showMore = !item.showMore" v-show="!item.showMore"
                    class="mt-4 text-gray-400 focus:outline-none cursor-pointer">...ดูเพิ่มเติม</span>
            </p>
            <div>
                <swiper :slidesPerView="3" :spaceBetween="0" :freeMode="true" :pagination="{
                    clickable: true,
                }" class="">
                    <swiper-slide v-for="(item_img, index) in item.images" :key="index" class="">
                        <a-image :width="110" :height="100" class="rounded-lg" :src="item_img.url" />
                    </swiper-slide>

                </swiper>
            </div>
        </template>
        <template #footer>
            <div class="flex gap-5">
                <div class="py-1 flex items-center gap-1 text-gray-400">
                    <HeartFilled style="font-size: 16px;color: rgb(216, 51, 78);" />
                    <TmmLabelSmall class="" :label="`${item.like} คน`" />
                </div>
                <div class="py-1 flex items-center gap-1 text-gray-400">
                    <TmmIcon icon="mdi mdi-comment-text-outline" />
                </div>
            </div>

        </template>

    </TmmCard>
</template>
<style scoped>
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
</style>