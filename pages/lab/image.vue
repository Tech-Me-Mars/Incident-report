<template>
    <div class="overflow-x-auto overflow-y-auto  whitespace-nowrap ">
        <a-image-preview-group class="">
            <a-image v-for="(item, index) in listImage" :key="index" :width="110" :height="100" class="rounded-lg p-1"
                :src="item" />
        </a-image-preview-group>
    </div>
</template>

<script setup>
const listImage = [
    'https://www.tcc.or.th/wp-content/uploads/2022/04/19042022_TCCNews_Accident_website-1200x675.png',
    'https://image.posttoday.com/uploads/images/md/2023/09/K6LgsMkOwMLyKVbF1kIu.webp?x-image-process=style/lg',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg/1200px-September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg'
]
</script>
