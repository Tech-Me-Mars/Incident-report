<template>
    <div class="flex justify-between items-center mb-1">
        <TmmLabelTitle label="เป้าหมายวันนี้" />
        <TmmLabelViewall />
    </div>
    <div class="card p-2 mb-2" v-for="(item, index) in 2" :key="index">
        <div class="flex w-full items-center gap-1 mb-2">
            <ClockCircleTwoTone style="font-size: 22px;" />
            <div class="w-full px-2">
                <div class="flex justify-between flex-wrap items-center">
                    <NuxtLink to="/jobs/mission">
                        <TmmLabelSubtitle class="line-clamp-1 max-w-[14rem]  overflow-hidden"
                            label="โครงการสายตรววจเพื่อประชาชนคนไทย" />
                    </NuxtLink>
                    <TmmAvatarGroup max-count="2" size="small">
                        <TmmAvatar size="small" label="สุเทพ"
                            src="https://f.ptcdn.info/253/012/000/1384709068-suteppp2-o.jpg" />
                        <TmmAvatar size="small" label="สุเทพ"
                            src="https://f.ptcdn.info/253/012/000/1384709068-suteppp2-o.jpg" />
                        <TmmAvatar size="small" label="ลุงตู่"
                            src="https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp" />
                    </TmmAvatarGroup>
                </div>
                <div class="flex justify-between">
                    <TmmLabelSmall label="เหลือเวลาอีก 13 ชั่วโมง" />
                    <TmmLabelSmall label="เพื่อน 2 คนเข้าร่วม" />
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between leading-3">
                <small class="text-gray-400 text-xs">อัตราความสำเร็จ</small>
                <small class="text-blue-500 font-semibold">68%</small>
            </div>
            <TmmFeedbackProgress :value=68 />
        </div>
    </div>

    <div class="flex justify-between items-center">
        <TmmLabelTitle label="เป้าหมายอื่น ๆ" />
        <TmmLabelViewall />
    </div>


    <div class="card p-2 mb-1" v-for="(item, index) in 2" :key="index">
        <div class="flex gap-2 w-full items-center">
            <div class="bg-gray-200 rounded-full p-2 flex justify-center w-8 items-center">
                <!-- <TmmIcon icon="mdi mdi-police-station text-blue-500" /> -->
                <AlertTwoTone />
            </div>
            <div class="flex flex-col w-[12rem]">
                <TmmLabelSubtitle class="line-clamp-1  overflow-hidden" label="นัดประชุมโครงการตำรวจการดูแลโครงการ" />
                <TmmLabelSmall label="เหลือเวลาอีก 2 วัน 13ชั่วโมง" />
            </div>
            <div>
                <TmmAvatarGroup max-count="2">
                    <TmmAvatar label="สุเทพ" src="https://f.ptcdn.info/253/012/000/1384709068-suteppp2-o.jpg" />
                    <TmmAvatar label="ลุงตู่"
                        src="https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp" />
                    <TmmAvatar label="ลุงตู่"
                        src="https://image.springnews.co.th/uploads/images/md/2023/07/NNeVIjbsPLYUbycg9rRo.webp?x-image-process=style/LG-webp" />
                </TmmAvatarGroup>
            </div>
            <TmmButton icon="mdi mdi-plus" className="w-[2rem] h-[2rem] !flex justify-center items-center" />
        </div>
    </div>

</template>