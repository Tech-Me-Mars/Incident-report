<template>
    <div>
        This is vnode:
        <CustomVNode />
    </div>
</template>

<script setup>
import { h, defineComponent } from 'vue';

// สร้างคอมโพเนนท์ที่ใช้ `render` ฟังก์ชันเพื่อแสดง vnode
const name = "agalil";
const CustomVNode = defineComponent({
    render() {
        return h(
            'div', // type: element ที่จะสร้าง (ในที่นี้คือ 'div')
            { id: 'foo', class: 'bar' }, // props: properties ที่จะถูกใส่ให้ element
            [
                h('p', {}, 'This is a paragraph inside a vnode.'), // children: element ลูก (ในที่นี้คือ 'p')
            ]
        );
    }
});
</script>

<style>
/* เพิ่ม CSS ตามต้องการ */
#foo {
    padding: 16px;
    background-color: #f0f0f0;
}

.bar {
    color: #333;
}
</style>