<template>
    <divv>
        <div>MQTT Status: {{ $mqtt.status() }}</div>
        <button @click="mqttPub">publish</button>
    </divv>
</template>
<script setup>
import { onMounted, ref } from 'vue';  // เพิ่มการ import onMounted และ ref จาก Vue
import { $mqtt } from 'vue-paho-mqtt';

// สร้างตัวแปร ref เพื่อใช้เก็บข้อมูลที่ได้รับจาก MQTT
const mqttData = ref('');

// เมื่อ component ถูก mount เสร็จ ให้ subscribe ไปยัง topic ที่ต้องการ
onMounted(() => {
    mqttSub()
});

const mqttSub = async () => {
    $mqtt.subscribe('eop/notification/', (message) => {
        // ทำอะไรก็ได้ที่ต้องการเมื่อได้รับข้อมูล MQTT จาก server
        mqttData.value = message;  // ตัวอย่างการเก็บข้อมูลลงในตัวแปร ref
        console.log(message, 'received');  // ตัวอย่างการ log ข้อมูลที่ได้รับ
        // สามารถเรียก function อื่นๆ หรืออัปเดต state ของ Vue ตามต้องการได้ที่นี่
    });
}


const mqttPub = () => {
    $mqtt.publish('eop/notification/', 'Hello, from subsciber!', 'Fnr');
}
</script>