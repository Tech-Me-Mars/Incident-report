<template>
    <TmmCard class="">
        <template #header>
            <div class="flex flex-wrap items-center gap-2">
                <TmmAvatar label="ประยุท" :size="40" src="https://mpics.mgronline.com/pics/Images/565000005465502.JPEG">
                </TmmAvatar>
                <div class="flex flex-col">
                    <p class="font-semibold text-sm">พล.ต.ท ยิ่งยศ ใจดี</p>
                    <TmmLabelSmall class="text-gray-400 text-xs" label="12 ชั่วโมงที่แล้ว" />
                </div>
            </div>
        </template>
        <template #body>
            <p class="leading-normal text-gray-700 py-3 text-xs " v-html="fullText">
            </p>
            <div>
                <swiper :slidesPerView="3" :spaceBetween="0" :freeMode="true" :pagination="{
                    clickable: true,
                }" class="mySwiper">
                    <swiper-slide v-for="(item, index) in listImage" :key="index" class="">
                        <a-image :width="110" :height="100" class="rounded-lg" :src="item" />
                    </swiper-slide>
                </swiper>
            </div>
        </template>
        <template #footer>
            <div class="py-1 flex items-center gap-1 text-gray-400">
                <HeartFilled style="font-size: 16px;color: rgb(216, 51, 78);" />
                <TmmLabelSmall class="" label="20 คน" />
            </div>
        </template>
    </TmmCard>
</template>
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
ไม่รู้เป็นเหตุให้สายด่วน 191 หนาแน่น ถูกต่อว่าต่อขานเรื่องการรับสายล่าช้าหรือเปล่า?
			<br/>
ทั้งที่ภารกิจหลักคือ แจ้งเหตุด่วนเหตุร้ายจริงๆ แต่ว่าไม่ได้ เพราะชาวบ้านเองไม่รู้หรอกว่า อันไหนเป็นเหตุอะไร จะด่วนจะร้ายขนาดไหน คิดไม่ออกก็พึ่งตำรวจไว้ก่อน พอผิดหวังเพราะไม่มีสัญญาณตอบรับ หรือไม่ทันใจ เลยกลายเป็นถูกตำหนิมาทุกยุคทุกสมัย
			<br/>
ล่าสุดเห็น ร.อ.นพ.อัจฉริยะ แพงมา เลขาธิการสถาบันการแพทย์ฉุกเฉินแห่งชาติ เผยกรณีแนวคิดการยุบรวมหมายเลขฉุกเฉิน 1669 ไปใช้หมายเลขฉุกเฉิน 191
			<br/>
แต่ชาวบ้านแสดงความกังวลว่า ปกติโทร.เข้าสายด่วน 191 ก็ตอบรับช้าอยู่แล้ว!
			<br/>
ยิ่งเป็นกรณีเจ็บป่วยฉุกเฉินนาทีชีวิต หากล่าช้าอาจเกิดความสูญเสีย เบื้องต้นประสานกันแล้ว อยู่ระหว่างดำเนินการเรื่องระบบ ยังไม่เสร็จ
			<br/>
ตามหลักการจะให้หมายเลข 191 เป็นตัวตั้ง ถ้าคนโทร.มาต้องการความช่วยเหลือทางการแพทย์ 191 จะโอนสายไปที่สถาบันการแพทย์ฉุกเฉินภายใน 30 วินาที เพื่อส่งทีมแพทย์ฉุกเฉินไปช่วยเหลือ
			<br/>
สรุปคือ ให้สายด่วน 191 รับหน้าเสื่อก่อน แล้วส่งต่อไปตามหน่วยงานอื่น
			<br/>
เป็นห่วงแค่ว่า ศูนย์รับแจ้งเหตุ 191 จะพร้อมหรือเปล่า เพราะตอนนี้อยู่ในความดูแลของแค่ระดับกองบังคับการคือ บก.สปพ.
		</p>`;
const listImage = [
    'https://www.tcc.or.th/wp-content/uploads/2022/04/19042022_TCCNews_Accident_website-1200x675.png',
    'https://image.posttoday.com/uploads/images/md/2023/09/K6LgsMkOwMLyKVbF1kIu.webp?x-image-process=style/lg',
    'https://mpics.mgronline.com/pics/Images/566000003905501.JPEG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg/1200px-September_26%2C_2007_accident%2C_highway_9%2C_CT%2C_flipped_truck.jpg'
]
</script>