<template>
    <HeaderMenu class="flex justify-start items-center gap-5 sticky top-0 z-50">
        <p class="font-bold text-lg">ลงทะเบียน</p>
    </HeaderMenu>
    <section class="p-3">
        <div class="card p-3">
            <Form @submit="onSubmit">

                <div class="mb-5">
                    {{ errors }}
                    <TmmAvatarUpload class="flex justify-center" v-model="upload_avatar" />
                    <!-- <span v-if="upload_avatar">{{ JSON.stringify(upload_avatar[0]) }}</span> -->
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="รหัสบัตรประชาชน" />
                        <TmmInput v-model="cid" />


                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="สำนักงาน" />
                        <TmmInputDropDown v-model="headquarters_id" placeholder="สำนักงาน" className=""
                            :options="resHeadquarters" class="w-full" value="id" label="fullname"
                            @change="handleHeadquartersChange" />

                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="หน่วยงาน" />
                        <TmmInputDropDown v-model="division_id" placeholder="หน่วยงาน" className=""
                            :options="resDivision" class="w-full" value="id" label="fullname"
                            @change="handleDivisionChange" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="สถานี" />
                        <TmmInputDropDown v-model="station_id" placeholder="สถานี" className="" :options="resStation"
                            class="w-full" value="id" label="station_name" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ตำแหน่ง" />
                        <TmmInput v-model="police_position_id" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ยศ" />
                        <TmmInputDropDown v-model="police_rank_id" placeholder="ยศ" className=""
                            :options="resPoliceRank" class="w-full" value="rank_id" label="rank_name_th" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="ชื่อ" />
                        <TmmInput v-model="first_name" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="นามสกุล" />
                        <TmmInput v-model="last_name" />
                    </div>
                    <div class="mb-2">
                        <TmmTypographyLabelForm label="เบอร์โทร" />
                        <TmmInputPhon v-model="phone" />
                    </div>

                    <div class="mb-2">
                        <TmmTypographyLabelForm label="วัน เดือน ปี เกิด" />
                        <TmmInputCalendar v-model="birthday_date" />
                        <!-- <input type="date" id="birthday" name="birthday" v-model="birthday_date"> -->
                        {{ birthday_date }}



                    </div>


                </div>

                <div class="flex gap-5 justify-center max-w-[20rem] mx-auto">
                    <TmmButton type="primary" severity="secondary" className="w-full h-[2.5rem]" label="ยกเลิก" />
                    <TmmButton type="primary" severity="primary" className="w-full h-[2.5rem]" htmlType="submit"
                        label="บันทึก" />
                </div>
            </Form>
        </div>
    </section>


    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>

<script setup>
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";
const isloadingAxi = useState('isloadingAxi')
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({})

onMounted(() => {
    loadPoliceRank();
    loadHeadquarters();
})

const resPoliceRank = ref();
const loadPoliceRank = async () => {
    try {
        const res = await dataApi.getPoliceRank();
        resPoliceRank.value = res.data.data;
        resPoliceRank.value = resPoliceRank.value.map((e, i) => ({
            ...e,
            indexkey: i + 1,
        }));
    } catch (error) {
        console.error(error)
    }
};


const changeImg = (event) => {
    console.log('changeImg' + upload_avatar.value[0])
    console.log(event)
}

const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        cid: zod.string().nonempty(requireValue).default(""),
        police_rank_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        first_name: zod.string().nonempty(requireValue).default(""),
        last_name: zod.string().nonempty(requireValue).default(""),
        phone: zod.string().nonempty(requireValue).default(""),
        birthday_date: zod.date({
            required_error: 'required_error',
            invalid_type_error: 'invalid_type_error',
        }),
        // police_position_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
        headquarters_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        division_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        station_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        upload_avatar: zod.custom((value) => {
            if (value != null && (Array.isArray(value) ? value.length > 0 : true)) {
                return value;
            }
        }),
        // phone_no: zod.string().nonempty(requireValue).default(""),
        // position_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
        // title_name: zod
        //     .string({
        //         required_error: requireValue,
        //         invalid_type_error: requireValue,
        //     })
        //     .nonempty(requireValue)
        //     .default(""),
        // status: zod
        //     .number({
        //         required_error: requireValue,
        //         invalid_type_error: requireValue,
        //     })
        //     .nullable(),
        // sex: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
    })
);
const { handleReset, handleSubmit, errors } = useForm({
    validationSchema
})

const { value: line_get_id_token } = useField("line_get_id_token");
const { value: cid } = useField("cid");
const { value: police_rank_id } = useField("police_rank_id");
const { value: first_name } = useField("first_name");
const { value: last_name } = useField("last_name");
const { value: phone } = useField("phone");
const { value: birthday_date } = useField("birthday_date");
const { value: police_position_id } = useField("police_position_id");
const { value: headquarters_id } = useField("headquarters_id");
const { value: division_id } = useField("division_id");
const { value: station_id } = useField("station_id");
const { value: upload_avatar } = useField("upload_avatar");


// ********** [[ ยศตำแหน่ง]] *********************
const resHeadquarters = ref();
const loadHeadquarters = async () => {
    try {
        const res = await dataApi.getHeadquarters();
        resHeadquarters.value = res.data.data;
        console.log(res.data.data)
    } catch (error) {
        console.error(error);
    }
};
const resDivision = ref();
const handleHeadquartersChange = async () => {
    try {
        const res = await dataApi.getDivision(headquarters_id.value);
        resDivision.value = res.data.data;
        division_id.value = null;
        station_id.value = null;
    } catch (error) {
        console.error(error);
    }
};
const resStation = ref();
const handleDivisionChange = async () => {
    // โหลดตำบล
    const res = await dataApi.getStation(division_id.value);
    resStation.value = res.data.data;
    station_id.value = null;
};
// *********************************** [[จบโหลด ยศตำแหน่ง]] ***************************

const onSubmit = handleSubmit(async (values) => {
    saveUsers(values);
});
const saveUsers = async (values) => {
    try {
        const birthday_date_form = format(birthday_date.value, "yyyy-MM-dd"); //แปลงรูปแบบวันเกิด
        phone.value = phone.value.replace(/\D/g, ""); //แปลงให้เหลือแต่ตัวเลข
        // console.log('changeImg' + upload_avatar.value.file)
        const formData = new FormData();
        formData.append('line_get_id_token', line_get_id_token.value);
        formData.append('cid', cid.value);
        formData.append('police_rank_id', police_rank_id.value);
        formData.append('first_name', first_name.value);
        formData.append('last_name', last_name.value);
        formData.append('phone', phone.value);
        formData.append('birthday_date', birthday_date_form);
        formData.append('police_position_id', police_position_id.value);
        formData.append('headquarters_id', headquarters_id.value);
        formData.append('division_id', division_id.value);
        formData.append('station_id', station_id.value);
        formData.append('upload_avatar', upload_avatar.value[0].originFileObj);

        console.log('formData', [...formData])
        
        const res = await dataApi.register(formData)
    } catch (error) {
        // errorAlert.value = true;
        // dataError.value = error;
        console.error(error)
    }

    // const dataApi
}

</script>
