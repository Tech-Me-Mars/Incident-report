<script setup>
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";
import { onMounted } from 'vue';
const isloadingAxi = useState('isloadingAxi')

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

const open = ref(false);
const showModal = () => {
    handleUpload()
    open.value = true;
};




const plan_name = ref('โครงการสายตรวจเพื่อนประชาชน')
const planer = ref('พบ.ต.ท ยิ่งยศ ใจดี')
const approveper = ref('พล.ต.ล สมหวัง ใจแข็งแกร่ง')


const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        police_province_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        station_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        name: zod.string().nonempty(requireValue).default(""),
        date_incident: zod.string().nonempty(requireValue).default(""),
        time_incident: zod.string().nonempty(requireValue).default(""),
        locale_text: zod.string().nonempty(requireValue).default(""),
        sufferer_text: zod.string().nonempty(requireValue).default(""),
        accuser_name: zod.string().nonempty(requireValue).default(""),
        text_details: zod.string().nonempty(requireValue).default(""),
        police_head_station_employee_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        police_head_station_employee_fullname: zod.string().nonempty(requireValue).default(""),
        police_head_station_employee_phone: zod.string().nonempty(requireValue).default(""),
        note: zod.string().nonempty(requireValue).default(""),
        inquiry_employee_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),

        image_detail: zod.custom((value) => {
            return Array.isArray(value) && value.length > 0 ? value : null;
        }),
        // image_detail_expenses: zod.custom((value) => {
        //     if (isEdit.value === true) {
        //         return value;
        //     }
        //     return Array.isArray(value) && value.length > 0 ? value : null;
        // }),

    })
);

const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})


const { value: police_province_id } = useField("police_province_id");
const { value: station_id } = useField("station_id");
const { value: station_name } = useField("station_name");
const { value: name } = useField("name");
const { value: date_incident } = useField("date_incident");
const { value: time_incident } = useField("time_incident");
const { value: locale_text } = useField("locale_text");
const { value: sufferer_text } = useField("sufferer_text");
const { value: accuser_name } = useField("accuser_name");
const { value: property } = useField("property");
const { value: text_details } = useField("text_details");
const { value: police_head_station_employee_id } = useField("police_head_station_employee_id");
const { value: police_head_station_employee_fullname } = useField("police_head_station_employee_fullname");
const { value: police_head_station_employee_phone } = useField("police_head_station_employee_phone");
const { value: note } = useField("note");
const { value: inquiry_employee_id } = useField("inquiry_employee_id");
const { value: inquiry_employee_fullname } = useField("inquiry_employee_fullname");
const { value: inquiry_employee_phone } = useField("inquiry_employee_phone");
const { value: report_by_employee_id } = useField("report_by_employee_id");
const { value: report_by_employee_fullname } = useField("report_by_employee_fullname");
const { value: report_by_employee_phone } = useField("report_by_employee_phone");
const { value: report_by_police_province_name } = useField("report_by_police_province_name");
const { value: expenses } = useField("expenses");
const { value: image_detail } = useField("image_detail", null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
});
const { value: image_detail_expenses } = useField("image_detail_expenses", null, {
    initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
});

const onSubmit = handleSubmit((values) => {
    saveReport(values);
});

const saveReport = async () => {
    const police_head_station_employee_phone_new = police_head_station_employee_phone.value.replace(/\D/g, "");
    const inquiry_employee_phone_new = inquiry_employee_phone.value.replace(/\D/g, "");


    const formData = new FormData();
    formData.append('police_province_id', police_province_id.value);
    formData.append('station_id', station_id.value);
    formData.append('name', name.value);
    formData.append('date_incident', date_incident.value);
    formData.append('time_incident', time_incident.value);
    formData.append('locale_text', locale_text.value);
    formData.append('sufferer_text', sufferer_text.value);
    formData.append('accuser_name', accuser_name.value);
    formData.append('property', property.value);
    formData.append('text_details', text_details.value);
    formData.append('police_head_station_employee_id', police_head_station_employee_id.value);
    formData.append('police_head_station_employee_fullname', police_head_station_employee_fullname.value);
    formData.append('police_head_station_employee_phone', police_head_station_employee_phone_new);
    formData.append('note', note.value);
    formData.append('inquiry_employee_id', inquiry_employee_id.value);
    formData.append('inquiry_employee_fullname', inquiry_employee_fullname.value);
    formData.append('inquiry_employee_phone', inquiry_employee_phone_new);
    formData.append('expenses', expenses.value);
    image_detail.value.forEach(file => {
        formData.append("image_detail[]", file);
    });
    image_detail_expenses.value.forEach(file => {
        formData.append("image_detail_expenses[]", file);
    });

    console.log([...formData])
    console.log(formData)

    try {
        const res = await dataApi.saveReport(formData);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        handleReset();
    } catch (error) {
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }

}

const handleUpload = () => {
    console.log('image_detail', image_detail.value);
    const formData = new FormData();
    image_detail.value.forEach(file => {
        formData.append("image_detail[]", file);
    });
    image_detail_expenses.value.forEach(file => {
        formData.append("image_detail_expenses[]", file);
    });
    formData.append("name", 'amm');
    console.log([...formData])
    console.log(formData)
};

const handleChange = async () => {
    console.log('image_detail', image_detail.value)
}

onMounted(() => {
    loadPoliceProvince();
    loadMyStation();
    loadPoliceHeadStation();
    loadInquiryEmp();
    //loadMyProfile();
})
const resPoliceProvince = ref()
const loadPoliceProvince = async () => {
    try {
        const res = await dataApi.getPoliceProvince()
        resPoliceProvince.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resMyStation = ref()
const loadMyStation = async () => {
    try {
        const res = await dataApi.getMyStation()
        resMyStation.value = res.data.data;
        station_id.value = res.data.data.id
        station_name.value = res.data.data.station_name;
    } catch (error) {
        console.error(error);
    }
}

const resPoliceHeadStation = ref();
const loadPoliceHeadStation = async () => {
    try {
        const res = await dataApi.getPoliceHeadStation()
        console.log('res', res)
        resPoliceHeadStation.value = res.data.data;
        resPoliceHeadStation.value = resPoliceHeadStation.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
}
const headerStationChange = async () => {
    console.log('police_head_station_employee_id', police_head_station_employee_id.value)
    resPoliceHeadStation.value.forEach(item => {

        // Compare id with val
        if (item.id == police_head_station_employee_id.value) {
            console.log('item.id', item.id)
            // Assign fullname to name
            police_head_station_employee_fullname.value = item.fullname;
            police_head_station_employee_phone.value = item.employee_phone
        }
    });
    console.log('change')
}
const resInquiryEmp = ref();
const loadInquiryEmp = async () => {
    try {
        const res = await dataApi.getInquiryEmp()
        console.log('res', res)
        resInquiryEmp.value = res.data.data;
        resInquiryEmp.value = resInquiryEmp.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
        }));
    } catch (error) {
        console.error(error);
    }
}
const inquiryEmpChange = async () => {
    console.log('inquiry_employee_id', inquiry_employee_id.value)
    resInquiryEmp.value.forEach(item => {
        if (item.employee_id == inquiry_employee_id.value) {
            console.log('item.id', item.employee_id)
            // Assign fullname to name
            inquiry_employee_fullname.value = item.fullname;
            inquiry_employee_phone.value = item.employee_phone
        }
    });
    console.log('change')
}

// const resMyProfile = ref();
// const loadMyProfile = async () => {
//     try {
//         const res = await dataApi.getMyProfile();
//         resMyProfile.value = res.data.data;
//         resMyProfile.value = resMyProfile.value.map((e, i) => ({
//             ...e,
//             fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name} ${e.position_name_th_abb}`,
//         }));
//     } catch (error) {
//         console.error(error);
//     }
// }



</script>
<template>
    <Form @submit="onSubmit">
        <TmmLabelSubtitle class="text-gray-500" label="รายงานเหตุ" />
        <div class="card p-3 mb-3">
            <div class="mb-2">
                <TmmTypographyLabelForm label="ภ.จว" />
                <TmmInputDropDown v-model="police_province_id" placeholder="" className="" :options="resPoliceProvince"
                    class="w-full" value="id" label="province_name" :error="errors.police_province_id" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="รายงานเหตุ" />
                <TmmInput v-model="name" :error="errors.name" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="พื้นที่ สน./สภ" />
                <TmmInput v-model="station_name" readonly placeholder="" className="" class="w-full" />
            </div>
        </div>

        <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลเหตุ" />
        <div class="card p-3 mb-3">
            <div class="mb-2">
                <TmmTypographyLabelForm label="วันที่เกิดเหตุ" />
                <TmmInputCalendar v-model="date_incident" class="w-full" placeholder="เลือกวันที่"
                    :error="errors.date_incident" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="เวลาเกิดเหตุ" />
                <TmmInputTimePicker v-model=time_incident class="w-full" :error="errors.time_incident" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="สถานที่เกิดเหตุ" />
                <TmmInputTextarea v-model="locale_text" :error="errors.locale_text" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ผู้เสียหาย" />
                <TmmInputTextarea v-model="sufferer_text" :error="errors.sufferer_text" />
            </div>

            <div class="mb-2">
                <TmmTypographyLabelForm label="ผู้ต้องหา" />
                <TmmInput v-model="accuser_name" :error="errors.accuser_name" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ทรัพย์สินถูกประทุร้าย (ถ้ามี)" />
                <TmmInput v-model="property" :error="errors.property" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="พฤติการณ์แห่งคดีโดยย่อ" />
                <TmmInputTextarea v-model="text_details" :error="errors.text_details" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="ชื่อหัวหน้าสถานี" />
                <TmmInputDropDown v-model="police_head_station_employee_id" placeholder="" className=""
                    @change="headerStationChange()" :options="resPoliceHeadStation" class="w-full" value="id"
                    label="fullname" :error="errors.police_head_station_employee_id" />

            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="เบอร์โทรหัวหน้าสถานี" />
                <TmmInputPhon readonly v-model="police_head_station_employee_phone"
                    :error="errors.police_head_station_employee_phone" />
            </div>
            <div class="mb-2">

                <TmmTypographyLabelForm label="พนักงานสอบสวนผู้รับผิดชอบ" />
                <TmmInputDropDown v-model="inquiry_employee_id" placeholder="" className="" @change="inquiryEmpChange()"
                    :options="resInquiryEmp" class="w-full" value="employee_id" label="fullname"
                    :error="errors.inquiry_employee_id" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="เบอร์โทรพนักงานสอบสวนผู้รับผิดชอบ" />
                <TmmInputPhon v-model="inquiry_employee_phone" :error="errors.inquiry_employee_phone" />

            </div>
        </div>

        <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลผู้รายงานเหตุ" />
        <div class="card p-3 mb-3">
            <!-- <div class="mb-2">
                <TmmTypographyLabelForm  label="ผู้รายงาน" />
                <TmmInputDropDown v-model="report_by_employee_id" placeholder="" className="" @change="Change()"
                    :options="resMyProfile" class="w-full" value="employee_id" label="fullname" />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="พนง.วิทยุ บก./ภ.จว" />
                <TmmInput />
            </div>
            <div class="mb-2">
                <TmmTypographyLabelForm label="เบอร์โทร" />
                <TmmInput />
            </div> -->
            <div class="mb-2">
                <TmmTypographyLabelForm label="หมายเหตุ" />
                <TmmInput v-model="note" :error="errors.note" />
            </div>
        </div>

        <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลค่าใช้จ่าย" />
        <div class="card p-3 mb-3">
            <div class="mb-2">
                <TmmTypographyLabelForm label="ค่าใช้จ่าย" />
                <TmmInput v-model="expenses" class="w-full" :error="errors.expenses" />
            </div>

            <div class="flex flex-col">
                <TmmTypographyLabelForm label="เอกสารค่าใช้จ่าย" />
                <TmmInputUploadFile :maxCount="10" :multiple="true" v-model="image_detail" :error="errors.image_detail" />
                <TmmTypographyTextValidator v-if="errors.image_detail" errors="กรุณาอัพโหลดไฟล์" />
            </div>
        </div>


        <div class="flex flex-col card p-3 mb-7">
            <TmmTypographyLabelForm label="เอกสารที่เกี่ยวข้อง (ถ้ามี)" />
            <TmmInputUploadFile v-model="image_detail_expenses" :multiple="true" :maxCount="10"
                :error="errors.image_detail_expenses" />
            <!-- accept="image/*" -->
        </div>

        <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
            <TmmButton type="primary" severity="secondary" className="w-full rounded-xl" label="ยกเลิก" />
            <TmmButton type="primary" severity="primary" className="w-full rounded-xl" htmlType="submit"
                label="บันทึก" />
        </div>
    </Form>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>