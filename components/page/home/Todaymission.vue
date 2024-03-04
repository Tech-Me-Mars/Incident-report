<template>
    <div class="flex justify-between items-center">
        <TmmLabelTitle label="เป้าหมายวันนี้" />
        <TmmLabelViewall />
    </div>
    <div class="card p-2">
        <div class="flex w-full items-center">
            <span class="mdi mdi-clock-time-four text-4xl text-blue-500"></span>
            <div class="w-full px-2">
                <div class="flex justify-between flex-wrap items-center">
                    <NuxtLink to="/mission">
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
            <div class="flex justify-between">
                <small>อัตราความสำเร็จ</small>
                <small class="text-blue-500 font-semibold">68%</small>
            </div>
            <TmmFeedbackProgress value=25 />
        </div>
    </div>


    <div class="flex justify-between items-center">
        <TmmLabelTitle label="นัดหมายวันนี้" />
        <TmmLabelViewall />
    </div>
    <div class="card p-2">
        <div class="flex w-full items-center">
            <span class="mdi mdi-clock-time-four text-4xl text-blue-500"></span>
            <div class="w-full px-2">
                <div class="flex justify-between flex-wrap items-center">
                    <NuxtLink to="/mission">
                        <TmmLabelSubtitle class="line-clamp-1 max-w-[14rem]  overflow-hidden"
                            label="นัดประชุมโครงการตำรวจ" />
                    </NuxtLink>
                    <TmmAvatarGroup max-count="2" size="small">
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
            <div class="flex justify-between">
                <small>อัตราความสำเร็จ</small>
                <small class="text-blue-500 font-semibold">68%</small>
            </div>
            <TmmFeedbackProgress value=25 />
        </div>
    </div>

    <div class="flex justify-between items-center">
        <TmmLabelTitle label="เป้าหมายอื่น ๆ" />
        <TmmLabelViewall />
    </div>
    <div class="card p-2 mb-1">
        <div class="flex gap-2 w-full items-center">
            <span class="mdi mdi-police-station text-2xl text-blue-500 rounded-full bg-gray-200 p-1"></span>
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
            <TmmButton icon="mdi mdi-plus" className="w-[2rem] h-[2rem] flex justify-center items-center" />
        </div>
    </div>

    <div class="card p-2 mb-1">
        <div class="flex gap-2 w-full items-center">
            <span class="mdi mdi-account-group-outline text-2xl text-blue-500 rounded-full bg-gray-200 p-1"></span>
            <div class="flex flex-col w-[12rem]">
                <TmmLabelSubtitle class="line-clamp-1  overflow-hidden" label="นัดประชุมเกี่ยวกับ" />
                <TmmLabelSmall label="เหลือเวลาอีก 2 วัน 4ชั่วโมง" />
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
            <TmmButton icon="mdi mdi-plus" className="w-[2rem] h-[2rem] flex justify-center items-center" />
        </div>
    </div>
</template>