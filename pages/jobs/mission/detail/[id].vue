<template>
    <HeaderMainProfile />
    <section class="p-3">
        <HeaderMenu class="flex">
            <TmmButtonBackPage @click="router.go(-1)" />
        </HeaderMenu>
        <van-back-top bottom="10vh" />

        <TmmCard class="!bg-blue-600 mb-2 card">
            <template #header>
                <div class="py-1">
                    <div class="flex gap-3 items-center">
                        <TmmLabelSubtitle class="text-white" :label="resJobProcessNote?.jobs?.name || ''" />
                    </div>
                </div>
            </template>
            <template #body>
                <div class="flex justify-between text-blue-100 mb-2">
                    <p class="font-medium text-xs">ผู้วางแผนงาน</p>
                    <span class="ml-auto font-light text-xs">{{ resJobProcessNote?.jobs?.plan_job_employee_fullname
                        }}</span>
                </div>
                <div class="flex justify-between text-blue-100">
                    <p class="font-medium text-xs">ผู้อนุมัติแผนงาน</p>
                    <span class="ml-auto font-light text-xs">{{ resJobProcessNote?.jobs?.approve_plan_employee_fullname
                        }}</span>
                </div>
            </template>
        </TmmCard>

        <TmmCard class="mb-2 bg-white card">
            <!-- <template #header>
                <TmmLabelSubtitle class="text-blue-500"
                    :label="`ลำดับงานที่ ${resJobProcessNote?.jobs_process?.sort_no || ''}`" />
            </template> -->
            <template #header>
            <div class="flex justify-between">
            <div>
              <TmmTag class="!px-4 !py-1"
                :style="{ color: resJobProcessNote?.status?.color, backgroundColor: resJobProcessNote?.status?.bg_color }">
                {{resJobProcessNote?.status?.name}}
              </TmmTag>
            </div>
            <div>
              <TmmTag color="#f0c424" class="!px-4 !py-1">ลำดับงานที่ {{resJobProcessNote?.jobs_process?.sort_no}}</TmmTag>
            </div>
          </div>
        </template>
            <template #body>
                <div class="py-3">
                    <div class="flex justify-between">
                        <p class="font-normal text-sm mb-2">ผู้รับผิดชอบ</p>
                        <span class="ml-auto font-light text-sm">{{
                            resJobProcessNote?.jobs_process?.responsible_employee_fullname }}</span>
                    </div>
                    <div class="flex justify-between">
                        <p class="font-normal text-sm mb-2">ระยะเวลาดำเนินงาน</p>
                        <span class="ml-auto font-light text-sm">{{ resJobProcessNote?.jobs_process?.date_start }} - {{ resJobProcessNote?.jobs_process?.date_end }}</span>
                    </div>
                    <div class="flex flex-warp">
            <span class="font-medium text-xs">
              รายละเอียดงาน:
              <span class="ml-auto font-light text-sm">{{ resJobProcessNote?.jobs_process?.text_jobs_process_detail }} </span>
            </span>
          </div>
                </div>
                <hr>
            </template>
            <template #footer>
                <div class="flex flex-warp">
            <span class="font-medium text-xs">
              ผลการดำเนินการ:
              <span class="ml-auto font-light text-sm">{{ resJobProcessNote?.jobs_process?.text_process }} </span>
            </span>
          </div>
                <div class="py-1 flex items-center gap-2">
                    <span class="mdi mdi-comment-text-outline"></span>
                    <TmmLabelSmall :label="`${resNote?.length || 0} ความคิดเห็น`" />
                </div>
            </template>
        </TmmCard>


        <div class="p-1">
            <div class="mb-3">
                <span @click="showPopup" class="text underline font-light text-md mb-5">
                    รายงานผลการปฏิบัติงานเพิ่มเติม
                    <!-- <van-icon name="chat-o" size="20" dot /> -->
                    <van-icon name="comment-o" />
                </span>

            </div>
            <van-popup v-model:show="showPopupAddnote" position="bottom" :style="{ height: '40%' }">
                <Form @submit="onSubmit" class="!bg-gray-100">
                    <TmmDisplayUploadImage v-if="image_detail.length > 0" v-model="image_detail" />
                    <div class=" bg-gray-50 py-2 gap-2">
                        <div class="flex justify-center mb-2">
                            <TmmInputRadio v-for="(item, index) in resCatagoryNot" :key="index" :label="item.name"
                                :value="item.id" v-model="jobs_process_note_category_id" />
                        </div>
                        <div class="flex gap-2 px-2">
                            <TmmInputUploadImage multiple v-model="image_detail" />
                            <TmmInputTextarea allow-clear className="rounded-xl" :autoSize="{ minRows: 1, maxRows: 5 }"
                                placeholder="แสดงความคิดเห็น..." v-model="note_text" :rows="1" />
                            <TmmIcon type="button" @click="onSubmit"
                                icon="mdi mdi-send text-blue-700 flex  cursor-pointer" style="font-size: 20px;" />
                        </div>
                    </div>
                </Form>
            </van-popup>




            <a-list v-if="resNote.length > 0" :data-source="resNote" item-layout="horizontal">
                <template #renderItem="{ item }">
                    <a-list-item class="mb-2 !p-0">
                        <a-comment class=" card px-1 bg-gray-100 w-full">
                            <template #author><a class="!text-gray-600 text-sm">{{ item.by_employee?.fullname }}</a></template>
                            <template #avatar>
                                <TmmAvatar :label="item.by_employee?.fullname" :src="item.by_employee?.upload_avatar" />
                            </template>
                            <template #content>
                                <p class="text-gray-500 text-xs">
                                    {{ item.note_text }}
                                </p>
                                <div class="overflow-x-auto overflow-y-auto  whitespace-nowrap ">
                                    <a-image-preview-group class="">
                                        <a-image v-for="(item_image, index_image) in item?.jobs_process_note_image"
                                            :key="index_image" :width="70" :height="70" class="rounded-lg p-1"
                                            :src="item_image.image_path" />
                                    </a-image-preview-group>
                                </div>
                            </template>
                            <template #datetime>
                                <span class="text-gray-600">{{ formatDateTime(item.created_at) }}
                                    <span v-if="resProfile?.police_employee_id == item.by_employee_id" class="mdi mdi-dots-vertical"
                                        @click="toggleDotEvent(item)"></span>
                                </span>
                            </template>
                        </a-comment>
                    </a-list-item>
                </template>
            </a-list>
        </div>
        <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />


        <!-- <van-popup v-model:show="showPopupAddnote"  > -->
        <van-popup title="แก้ไข Note" position="bottom" :style="{ height: '40%' }" v-model:show="isEditMode"
            @close="onCloseEdit">
            <!-- <TmmDisplayUploadImage v-model="fileArrayEdit" /> -->
            <div class="bg-gray-100">
                <a-upload v-model:file-list="fileArrayEdit" multiple list-type="picture-card" @preview="handlePreview"
                    @remove="handleRemove" :custom-request="customRequest">
                    <plus-outlined />
                    <!-- <div v-if="fileArrayEdit.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
            </div> -->
                </a-upload>
                <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>

                <div class=" bg-gray-50 py-2 gap-2">
                    <div class="flex justify-center mb-2">
                        <TmmInputRadio v-for="(item, index) in resCatagoryNot" :key="index" :label="item.name"
                            :value="item.id" v-model="jobs_process_note_category_id_edit" />
                    </div>
                    <div class="flex gap-2 px-2">
                        <!-- <a-upload accept="image/*" v-model:file-list="fileArrayEdit" multiple name="file" @change="handleChange"
                    :custom-request="customRequest">
                    <TmmIcon icon="mdi mdi-image-outline text-gray-500 flex items-center cursor-pointer"
                        style="font-size: 20px;" />
                    <template #itemRender="{ file, actions }">
                    </template>
                </a-upload> -->
                        <TmmInputTextarea allow-clear className="rounded-xl bg-gray-100"
                            :autoSize="{ minRows: 1, maxRows: 2 }" placeholder="แสดงความคิดเห็น..."
                            v-model="note_text_edit" :rows="1" />
                        <TmmIcon @click="handleSubmitEdit"
                            icon="mdi mdi-send text-blue-700 flex items-center cursor-pointer"
                            style="font-size: 20px;" />
                    </div>
                </div>
            </div>
        </van-popup>

        <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />

        <!-- </section> -->
        <!-- <PageMissionDetailComment /> -->
    </section>
</template>

<script setup>
definePageMeta({
   middleware: 'auth'
});
useHead({ title: 'รายละเอียด' });

import { formatDateTime, formatDate, customDateFormat, formatCurrency, formatNumber, roundToTwoDecimalPlaces } from '@/helpers/utility';
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";

const route = useRoute()
const router = useRouter()
const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});


const resCatagoryNot = ref()
const loadcatagoryNot = async () => {
    try {
        const res = await dataApi.getCatagortNote()
        resCatagoryNot.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resProfile = ref()
const loadProfile = async () => {
    try {
        // alert('loadProfile')
        const res = await dataApi.getMyProfile()
        resProfile.value = res.data.data;
        resProfile.value.fullname = `${res.data.data?.rank_name_th_abb} ${res.data.data?.first_name} ${res.data.data?.last_name}`
    } catch (error) {
        console.error(error);
    }
}
onMounted(async () => {
    await loadProfile();
    loadcatagoryNot()
    loadJobProcessNote();
});


const resJobProcessNote = ref();
const resNote = ref([]);
const loadJobProcessNote = async () => {
    try {
        const res = await dataApi.getJobProcessNoteById(route.params.id)

        resJobProcessNote.value = res.data.data;
        resNote.value = res.data.data?.jobs_process_note;
        console.log('resNote', resNote.value)
        // resNote.value = resNote.value.map((e, i) => ({
        //     ...e,
        //     indexkey: i + 1,
        //     author:,
        //     content
        //     datetime
        //     avatar: item.
        //     statusname: e.status === 1 ? "เปิด" : "ปิด"
        // }));
        console.log(res.data.data)
    } catch (error) {
        console.error(error);
    }
}

const showPopupAddnote = ref(false);
const showPopup = () => {
    showPopupAddnote.value = true;
};

// ************************** [[ COMMENT ]] *********************
const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        note_text: zod.string().nonempty(requireValue).default(""),
    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})
const { value: note_text } = useField("note_text");
const { value: jobs_process_note_category_id } = useField("jobs_process_note_category_id", null, {
    initialValue: 1 // กำหนดค่าเริ่มต้นที่นี่
});
const { value: expenses } = useField("expenses");
const { value: image_detail } = useField("image_detail", null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
});


const onSubmit = handleSubmit((values) => {
    saveReport(values);
});
const checkType = ref(1);
const saveReport = async () => {
    try {
        const formData = new FormData();
        formData.append('jobs_process_id', route.params.id);
        formData.append('jobs_process_note_category_id', jobs_process_note_category_id.value);
        formData.append('note_text', note_text.value);
        image_detail.value.forEach(file => {
            console.log(file)
            formData.append("image_detail[]", file.originFileObj);
        });
        const res = await dataApi.saveComment(formData);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        showPopupAddnote.value = false
        // handleReset();
        loadJobProcessNote();
    } catch (error) {
        showPopupAddnote.value = false
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};


const show = ref(false);
const resObjForEdit = ref();
const toggleDotEvent = async (obj) => {
    resObjForEdit.value = await obj;
    show.value = true;
}
const actions = [
    { name: 'แก้ไข', id: 1 },
    { name: 'ลบ', id: 2 },
];
const onSelect = (item) => {
    try {
        show.value = false;
        if (item.id == 1) {
            editMode()
        } else {
            deleteComment()
        }
    } catch (error) {
        console.error(error)
    }

};

const deleteComment = async () => {
    try {
        const res = await dataApi.delJobNote(resObjForEdit.value.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        loadJobProcessNote()
    } catch (error) {
        isEditMode.value = false;
        console.error(error);
    }
}

const fileArrayEdit = ref([])
const isEditMode = ref(false);
const idForEdit = ref();

const note_text_edit = ref();
const jobs_process_note_category_id_edit = ref(1);
const editMode = async (obj, id) => {
    isEditMode.value = true;
    console.log(obj)
    try {
        if (resObjForEdit.value.jobs_process_note_image.length > 0) {
            fileArrayEdit.value = resObjForEdit.value?.jobs_process_note_image.map((e, i) => ({
                ...e,
                uid: i + 1,
                url: e?.image_path,
            }));
        }

        idForEdit.value = resObjForEdit.value.id;
        note_text_edit.value = resObjForEdit.value.note_text;
        jobs_process_note_category_id_edit.value = resObjForEdit.value.jobs_process_note_category_id
    } catch (error) {
        isEditMode.value = false;
        console.error(error);
    }
}

const handleSubmitEdit = async () => {
    if (!note_text_edit.value) {
        return;
    }
    try {
        const payload = {
            jobs_process_note_category_id: jobs_process_note_category_id_edit.value, // {{url_api}}/api/v1/jobs_process_note_category
            note_text: note_text_edit.value
        }
        console.log('payload', payload)
        const res = await dataApi.updateTextComment(payload, idForEdit.value);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        loadCommentAll();
        isEditMode.value = false;
    } catch (error) {
        isEditMode.value = false;
        console.error(error);
    }
    isEditMode.value = false;
}

const onCloseEdit = () => {
    console.log('close')
    isEditMode.value = false;
    fileArrayEdit.value = [];
};


// ********************* ฟังชั่นสำหรับอัพโหลดและลบรูปภาพ
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const handleCancel = () => {
    console.log('ซ่อน')
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
const handleRemove = async (e) => {
    try {
        const res = await dataApi.delJobProcessImage(e.id);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };

        loadJobProcessNote();
        // editMode();
        // handleReset();
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}

const loadCommentAll = async () => {
    try {
        const res = await dataApi.getJobProcessNoteById(route.params.id)
        resJobProcessNote.value = res.data.data;
        resNote.value = res.data.data?.jobs_process_note;
        const found = resNote.value.find((e) => {
            return e.id == idForEdit.value;
        });
        console.log('found', found)
        if (found?.jobs_process_note_image.length > 0) {
            fileArrayEdit.value = found?.jobs_process_note_image.map((e, i) => ({
                ...e,
                uid: i + 1,
                url: e?.image_path,
            }));
        }
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
}
const customRequest = async ({ action, file, headers, onSuccess, onError }) => {
    try {
        const formData = new FormData();
        formData.append('jobs_process_note_id', idForEdit.value);
        formData.append('image_detail[]', file);
        const res = await dataApi.addJobProcessImage(formData);
        onSuccess()
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        // handleReset();
        loadCommentAll()
    } catch (error) {
        onError()
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
};

</script>
