<template>
  <div class="flex justify-center">

  </div>
</template>

<script setup>
import { onUpdated, watch } from "vue";
import { message } from 'ant-design-vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      severity: "",
      summary: "",
      detail: "",
    }),
  },
  error: {
    type: Boolean,
    default: false,
  },
  dataError: {
    required: true,
  }
  // objerror:{
  //   type: Object,
  // }
});

// หากต้องการใช้ตัวแปรจากตัวอย่างก็เพิ่มได้ตรงนี้

// เรียกใช้ hook useToast และเก็บ instance ของ Toast
// const toast = useToast();

// เมื่อ component ถูก mount เรียกใช้งาน show()

onUpdated(() => show());

// ฟังก์ชัน show() ที่จะเพิ่ม Toast
const show = () => {

  if (props.error === false) { //กรณีไม่Error (status 200)
    try {
      // toast.add({
      //   severity: props.data.severity,
      //   summary: props.data.summary,
      //   detail: props.data.detail,
      //   life: 3000,
      //   group: 'bc',
      // });
      message.success(props.data.detail);
    }catch (error){
      console.error(error)
    }
  }

  else { // กรณีเข้าError
    try {
      // if (props.dataError.response && props.dataError.response.status == 422 && props.dataError.response.data && props.dataError.response.data.data) {       // หากเข้า 422 
      //   console.log('เข้าarray')
      //   const dataObject = props.dataError.response.data.data;
      //   const allKeys = Object.keys(dataObject);
      //   const keyArrayPairs = [];
      //   allKeys.forEach((key) => {
      //     const currentArray = dataObject[key];
      //     keyArrayPairs.push({ key, array: currentArray });
      //   });
      //   //  [[ SHOW ERROR แบบ ARRAY ]]
      //   toast.add({
      //     severity: "error",
      //     summary: 'error.เกิดข้อผิดพลาด',
      //     detail: keyArrayPairs,
      //     life: 3000,
      //     group: 'bc',
      //   });
      //} else {     // หากเข้า status error ทั่วไปหรือ 404
        //  [[ SHOW ERROR แบบ MESSAGE ]]
        // toast.add({
        //   severity: "error",
        //   summary: 'error.เกิดข้อผิดพลาด',
        //   detail: props.dataError.response.data.message,
        //   life: 3000,
        //   group: 'bc',
        // });
        message.error(props.dataError.response.data.message);
      //}
    } catch (error) {
      console.error(error)
    }
  }
};
</script>
