<template>
  <ConfirmDialog
    :closable="false"
    :draggable="false"
    contentClass="text-500"
    class="p-2"
    :style="{ width: '22vw', alignItems: 'center', backgroundColor: 'white' }"
  ></ConfirmDialog>
</template>

<script setup>
import { defineProps } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { onMounted } from "vue";
defineProps({
  openDialog: {
    type: Function,
    default: () => {},
  },
});

onMounted;
const confirmData = useConfirm();

const openDialog = ({
  message = "message",
  header = "ยืนยันการลบ",
  acceptLabel = "ยืนยัน",
  rejectLabel = "ยกเลิก",
  accept = () => false,
  reject = () => true,
} = {}) =>
  confirmData.require({
    message: "ยืนยันการลบ " + message,
    header,
    acceptLabel: acceptLabel, // reversed so initial focus is on 'reject'
    rejectLabel: rejectLabel,
    rejectClass: "p-button-outlined",
    acceptClass: "bg-red-600",
    accept,
    reject,
  });

defineExpose({
  openDialog,
});
</script>
