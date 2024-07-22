<template>
    <HeaderMainProfile />

    <a-modal v-model:open="connectLineModal" :closable="false" :maskClosable="false" centered title="" :footer="null">
        <div style="text-align: center;">
            <p class="mb-5">คุณจะต้องเปิดรับการแจ้งเตือนไลน์ก่อนจึงจะสามารถเขียน REPORT ได้</p>
            <TmmButton @click="connectLineNotify" label="เปิดรับการแจ้งเตือนไลน์" />
        </div>
    </a-modal>



    <a-modal v-model:open="warningModal" title="" :zIndex="1500" :maskClosable="false" :footer="null">
        <p class="text-red-600 text-md">
            {{ messageError }}
        </p>
    </a-modal>



    <section class="p-3">
        <HeaderMenu class="flex justify-start items-center gap-5 mb-5">
            <p class="font-bold text-lg">REPORT</p>
        </HeaderMenu>

        <!-- <a-modal ref="modalRef" :maskClosable="false" v-model:open="connectLineModal" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <template #title>
                <div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
            </template>
<template #modalRender="{ originVNode }">
                <div :style="transformStyle">
                    <component :is="originVNode" />
                </div>
            </template>
</a-modal> -->
        <!-- <a-modal :maskClosable="false" centered v-model:open="connectLineModal" :wrap-style="{ overflow: 'hidden' }" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal> -->

        <!-- <PageReportAddForm /> -->
        <Form @submit="onSubmit">
            <div class="card p-3 mb-3">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div class="">
                        <TmmTypographyLabelForm label="พื้นที่" />
                        <TmmInputDropDown @change="areaChange()" v-model="police_province_id" placeholder=""
                            className="" :options="resPoliceProvince" class="w-full" value="id"
                            label="police_province_name" :error="errors.police_province_id" />
                    </div>
                    <div>
                        <TmmTypographyLabelForm label="วันที่เกิดเหตุ" />
                        <TmmInputCalendar v-model="incident_date" class="w-full" placeholder="วันที่เกิดเหตุ..."
                            :error="errors.incident_date" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="เวลาเกิดเหตุ" />
                        <TmmInputTimePicker v-model=incident_time class="w-full" :error="errors.incident_time" />
                    </div>

                    <div class="">
                        <TmmTypographyLabelForm label="ประเภทรายงานเหตุ" />
                        <TmmInputDropDown v-model="type_report_code" placeholder="ประเภทรายงานเหตุ..." className=""
                            :options="resTypeReport" class="w-full" value="code" label="detail"
                            :error="errors.type_report_code" />
                        <!-- <a-auto-complete class="!w-full" v-model:value="type_report_code" :options="resTypeReport"
                            placeholder="ประเภทรายงานเหตุ" /> -->
                    </div>

                    <div class="">
                        <TmmTypographyLabelForm label="เหตุที่เกิดหรือข้อหา" />
                        <TmmInputTextarea placeholder="คำอธิบาย..." :auto-size="{ minRows: 3, maxRows: 99 }"
                            v-model="incident_cause_text" :error="errors.incident_cause_text" />
                    </div>

                    <div class="">
                        <TmmTypographyLabelForm label="บริเวณที่เกิดเหตุ" />
                        <TmmInputTextarea placeholder="คำอธิบาย..." :auto-size="{ minRows: 3, maxRows: 99 }"
                            v-model="incident_area_text" :error="errors.incident_area_text" />
                    </div>

                    <div class="space-y-1 lg:col-span-2">
                        <TmmTypographyLabelForm label="ระบุตำแหน่งสถานที่เกิดเหตุ" />
                        <!-- incident_area_lat -->
                        <a-select v-model:value="locationValue" show-search placeholder="ตำแหน่งแหน่งสถานที่เกิดเหตุ"
                            :default-active-first-option="false" :show-arrow="false" :filter-option="false"
                            :not-found-content="null" :options="resLocation" class="w-full"
                            :field-names="{ label: 'name', value: 'name' }" @search="locationSearch"
                            @change="LocationChange"></a-select>

                        <!-- :status="errors.incident_area_lat ? 'error' : ''" -->
                        <!-- <client-only>
                            <LongdoMap v-if="showmap == true" class="h-[30rem] w-full" @load="initializeMap"
                                :last-view="false">
                            </LongdoMap>

                            <LongdoMap v-else class="h-[30rem] w-full" @load=initializeMapStart>
                            </LongdoMap>
                        </client-only> -->
                        <div class="relative flex flex-col items-center h-[30rem]">
                            <longdo-map class="h-full w-full" @load="getMap" />
                            <button class="absolute bottom-4 right-4 p-2 px-7 border border-black !text-xs bg-white"
                                @click="confirmLocation">
                                <i class="mdi mdi-map-marker-radius text-red-600"></i>ยืนยันตำแหน่ง
                            </button>
                        </div>

                        <div class="flex gap-2">

                            <div class="w-1/2">
                                <!-- <TmmTypographyLabelForm label="ละติจูด" /> -->
                                <a-input v-model:value="incident_area_lat" placeholder="ละติจูด" readonly
                                    :status="errors.incident_area_lat ? 'error' : ''">
                                    <template #prefix><span class="text-xs">lat</span></template>
                                </a-input>
                            </div>
                            <div class="w-1/2">
                                <!-- <TmmTypographyLabelForm label="ลองจิจูด" /> -->
                                <a-input v-model:value="incident_area_long" placeholder="ลองจิจูด" readonly
                                    :status="errors.incident_area_long ? 'error' : ''">
                                    <template #prefix><span class="text-xs">lon</span></template>
                                </a-input>
                            </div>
                        </div>
                    </div>



                    <div class="lg:col-span-2">
                        <TmmTypographyLabelForm label="ลักษณะที่เกิดเหตุ" />
                        <TmmInputTextarea placeholder="คำอธิบาย..." :auto-size="{ minRows: 3, maxRows: 99 }"
                            v-model="incident_structure_text" :error="errors.incident_structure_text" />
                    </div>
                </div>
            </div>


            <!--  ########################  [[ ข้อมูลผู้เสียหาย ]] ########################-->
            <!--  ########################  [[ ข้อมูลผู้เสียหาย ]] ########################-->
            <!--  ########################  [[ ข้อมูลผู้เสียหาย ]] ########################-->
            <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลผู้เสียหาย" />
            <div class="card p-3 mb-3" v-for="(item, index) in suffererFields" :key="item.key">
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                    <CloseCircleTwoTone v-if="suffererFields.length > 1" @click="confirmRemoveSuffer(item, index)" />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div class="">
                        <TmmTypographyLabelForm label="ชื่อ" />
                        <TmmInput v-model="item.value.suffer_firstname" placeholder="ชื่อ..."
                            :error="errors[`sufferer_array[${index}].suffer_firstname`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="นามสกุล" />
                        <TmmInput v-model="item.value.suffer_lastname" placeholder="นามสกุล..."
                            :error="errors[`sufferer_array[${index}].suffer_lastname`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="อายุ" />
                        <TmmInputNumber v-model="item.value.suffer_age" :max="150" placeholder="อายุ..."
                            :error="errors[`sufferer_array[${index}].suffer_age`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="สัญชาติ" />
                        <TmmInputDropDown v-model="item.value.suffer_nationality" placeholder="สัญชาติ..." className=""
                            :options="resNational" class="w-full" value="nation_name_th" label="nation_name_th"
                            :error="errors[`sufferer_array[${index}].suffer_nationality`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="หมายเลขหนังสือเดินทาง" />
                        <TmmInput v-model="item.value.suffer_passport_number" placeholder="หมายเลขหนังสือเดินทาง..."
                            :error="errors[`sufferer_array[${index}].suffer_passport_number`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="ความเสียหาย" />

                        <TmmInputDropDown v-model="item.value.suffer_type_damage_code" placeholder="ความเสียหาย..."
                            className="" :options="resTypeDamage" class="w-full" value="code" label="detail"
                            :error="errors[`sufferer_array[${index}].suffer_type_damage_code`]" />
                    </div>

                </div>
            </div>

            <div class="flex justify-center py-2 pb-3 mb-3">
                <TmmButton type="primary" severity="secondary" icon="mdi mdi-plus" label="เพิ่มผู้เสียหาย" @click="pushSufferer({
                    suffer_firstname: undefined,
                    suffer_lastname: undefined,
                    suffer_age: undefined,
                    suffer_nationality: undefined,
                    suffer_passport_number: undefined,
                    suffer_type_damage_code: undefined,
                })" className="" />
            </div>

            <!--  ########################  [[ ทรัพย์สินที่เสียหา ]] ########################-->
            <!--  ########################  [[ ทรัพย์สินที่เสียหา ]] ########################-->
            <!--  ########################  [[ ทรัพย์สินที่เสียหา ]] ########################-->
            <TmmLabelSubtitle class="text-gray-500" label="ทรัพย์สินที่เสียหาย" />
            <div class="card p-3 mb-3" v-for="(item, index) in propertyFields" :key="item.key">
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                    <CloseCircleTwoTone v-if="propertyFields.length > 1" @click="confirmRemoveProperty(item, index)" />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">

                    <div class="">
                        <TmmTypographyLabelForm label="ประเภทสินทรัพย์" />
                        <TmmInputDropDown v-model="item.value.type_property_code" placeholder="ประเภทสินทรัพย์"
                            :options="resTypeProperty" class="w-full" value="detail" label="detail"
                            :error="errors[`property_array[${index}].type_property_code`]" />
                    </div>
                    <div class=""
                        v-if="item.value.type_property_code == 'รถยนต์' || item.value.type_property_code == 'รถจักรยานยนต์'">
                        <TmmTypographyLabelForm label="ยี่ห้อ" />
                        <TmmInput v-model="item.value.type_property_brand" placeholder="ยี่ห้อ..."
                            :error="errors[`property_array[${index}].type_property_brand`]" />
                    </div>
                    <div class=""
                        v-if="item.value.type_property_code == 'อาคาร/บ้านเรือน' || item.value.type_property_code == 'อื่นๆ'">
                        <TmmTypographyLabelForm label="จำนวน" />
                        <TmmInputNumber v-model="item.value.type_property_qty" placeholder="จำนวน..."
                            :error="errors[`property_array[${index}].type_property_qty`]" />
                        <!-- error:{{ errors[`property_array[${index}].type_property_qty`] }} -->
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="มูลค่าโดยประมาณ" />
                        <TmmInputNumber v-model="item.value.type_property_price" placeholder="มูลค่าโดยประมาณ..."
                            :error="errors[`property_array[${index}].type_property_price`]" />
                    </div>


                </div>

            </div>
            <div class="flex justify-center py-2 pb-3 mb-3">
                <TmmButton type="primary" severity="secondary" icon="mdi mdi-plus" label="เพิ่มสินทรัพย์เสียหาย" @click="pushProperty({
                    type_property_code: undefined,
                    type_property_brand: undefined,
                    type_property_qty: undefined,
                    type_property_price: undefined,
                })" className="" />
            </div>

            <!-- ############################### [[ คนร้าย ]] ################################## -->
            <TmmLabelSubtitle class="text-gray-500" label="ข้อมูลคนร้าย" />
            <div class="card p-3 mb-3" v-for="(item, index) in villainFields" :key="item.key">
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                    <CloseCircleTwoTone v-if="villainFields.length > 1" @click="confirmRemoveVilain(item, index)" />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div class="">
                        <TmmTypographyLabelForm label="ชื่อ" />
                        <TmmInput v-model="item.value.gangster_firstname" placeholder="ชื่อ..."
                            :error="errors[`villain_array[${index}].gangster_firstname`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="นามสกุล" />
                        <TmmInput v-model="item.value.gangster_lastname" placeholder="นามสกุล..."
                            :error="errors[`villain_array[${index}].gangster_lastname`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="อายุ" />
                        <TmmInputNumber v-model="item.value.gangster_age" :max="150" placeholder="อายุ..."
                            :error="errors[`villain_array[${index}].gangster_age`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="สัญชาติ" />
                        <TmmInputDropDown v-model="item.value.gangster_nationality" placeholder="สัญชาติ..."
                            className="" :options="resNational" class="w-full" value="nation_name_th"
                            label="nation_name_th" :error="errors[`villain_array[${index}].gangster_nationality`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="จำนวนครั้งที่กระทำความผิด" />
                        <TmmInputNumber :min="0" v-model="item.value.gangster_offense_count"
                            placeholder="จำนวนครั้งที่กระทำความผิด..."
                            :error="errors[`villain_array[${index}].gangster_offense_count`]" />
                    </div>
                    <div class="">
                        <TmmTypographyLabelForm label="อาวุธเครื่องมือที่ใช้" />
                        <TmmInput v-model="item.value.gangster_weapon" placeholder="อาวุธเครื่องมือที่ใช้..."
                            :error="errors[`villain_array[${index}].gangster_weapon`]" />
                    </div>

                </div>
            </div>

            <div class="flex justify-center py-2 pb-3 mb-3">
                <TmmButton type="primary" severity="secondary" icon="mdi mdi-plus" label="เพิ่มคนร้าย" @click="pushVillain({
                    gangster_firstname: undefined,
                    gangster_lastname: undefined,
                    gangster_age: undefined,
                    gangster_nationality: undefined,
                    gangster_offense_count: undefined,
                    gangster_weapon: undefined,
                })" className="" />
            </div>

            <div class="card p-3 mb-3">
                <div class="">
                    <div class="">
                        <TmmTypographyLabelForm label="ยานพานะที่ใช้ทำผิด" />
                        <TmmInputDropDown v-model="type_vehicle_code" placeholder="ยานพานะที่ใช้ทำผิด..." className=""
                            :options="resVehicle" class="w-full" value="code" label="detail"
                            :error="errors.type_vehicle_code" />
                    </div>
                    <div>
                        <TmmTypographyLabelForm label="ทะเบียนรถที่ใช้กระทำความผิด" />
                        <TmmInput v-model="type_vehicle_license_plate" class="w-full" placeholder="ทะเบียนรถ..."
                            :error="errors.type_vehicle_license_plate" />
                    </div>
                    <div class="col-span-2">
                        <TmmTypographyLabelForm label="รายละเอียด/พฤติการณ์แห่งคดี" />
                        <TmmInputTextarea :auto-size="{ minRows: 3, maxRows: 99 }" v-model="incident_detail"
                            placeholder="รายละเอียด/พฤติการณ์แห่งคดี..." :error="errors.incident_detail" />
                    </div>
                </div>
            </div>
            <div class="card p-3 mb-3">
                <div class="">

                    <div class="flex flex-col ">
                        <TmmTypographyLabelForm label="พนักงานสอบสวนผู้รับผิดชอบ" />
                        <a-auto-complete :status="(errors?.inquiry_employee_fullname ? 'error' : '')"
                            class="!w-full !mb-2" v-model:value="inquiry_employee_fullname"
                            :options="resSuggestionEmployeeInquiry" placeholder="รหัสพนักงานสอบสวนผู้รับผิดชอบ"
                            :field-names="{ label: 'fullname', value: 'fullname' }" @change="inquiryChange"  @search="inquirySearch" />
                        <a-auto-complete :status="(errors?.inquiry_employee_position ? 'error' : '')"
                            class="!w-full !mb-2" v-model:value="inquiry_employee_position" :options="resPositions"
                            placeholder="ตำแหน่ง"
                            :field-names="{ label: 'position_name_th', value: 'position_name_th' }" />

                        <TmmInput v-model="inquiry_employee_phone" class="w-full !mb-2" placeholder="เบอร์โทร..."
                            :error="errors.inquiry_employee_phone" />
                    </div>

                </div>
            </div>

            <div class="card p-3 mb-3">
                <div class="">
                    <div class="">
                        <TmmTypographyLabelForm label="นายตำรวจเวรชั้นผู้ใหญ่ควบคุม" />
                        <a-auto-complete :status="(errors?.senior_police_control_employee_fullname ? 'error' : '')"
                            class="!w-full !mb-2" v-model:value="senior_police_control_employee_fullname"
                            :options="resSuggestionEmployeeSenior" placeholder="รหัสพนักงานสอบสวนผู้รับผิดชอบ"
                            :field-names="{ label: 'fullname', value: 'fullname' }" @change="seniorChange" @search="seniorSearch" />
                        <a-auto-complete :status="(errors?.senior_police_control_employee_position ? 'error' : '')"
                            class="!w-full !mb-2" v-model:value="senior_police_control_employee_position"
                            :options="resPositions" placeholder="ตำแหน่ง"
                            :field-names="{ label: 'position_name_th', value: 'position_name_th' }" />


                        <TmmInput v-model="senior_police_control_employee_phone" class="w-full !mb-2"
                            placeholder="เบอร์โทร..." :error="errors.senior_police_control_employee_phone" />
                    </div>
                </div>
            </div>
            <div class="card p-3 mb-3">
                <div class="">
                    <div class="">
                        <TmmTypographyLabelForm v-if="areaLabel" :label="`การดำเนินการของ ${areaLabel}`" />
                        <TmmTypographyLabelForm v-else="areaLabel" :label="`การดำเนินการของ`" />
                        <TmmInputTextarea :auto-size="{ minRows: 3, maxRows: 99 }" v-model="incident_process_text"
                            placeholder="คำอธิบาย...." :error="errors.incident_process_text" />
                    </div>
                </div>
            </div>

            <div class="card p-3 mb-3">
                <div class="">
                    <div class="">
                        <TmmTypographyLabelForm :label="`เสนอรายงาน`" />
                        <TmmInputDropDown v-model="police_head_station_employee_id" placeholder="เลือก ชื่อ-นามสกุล"
                            className="" :options="resHeadeStation" class="w-full" value="employee_id" label="fullname"
                            :error="errors.police_head_station_employee_id" />
                    </div>
                </div>
            </div>



            <!-- <div class="card p-3 mb-3">
                <div>
                    <TmmTypographyLabelForm label="แนบรูป" />
                    <TmmInput placeholder="พิมพ์ข้อความรายละเอียด" />
                    <a-upload v-model:file-list="image_detail_expenses" accept="image/*" @preview="handlePreview"
                        list-type="picture" multiple name="file" disabled>
                        <a-button>
                            <upload-outlined></upload-outlined>
                            เลือกไฟล์
                        </a-button>
                    </a-upload>
                    <TmmInputUploadImage multiple  :maxCount="3" />
                </div>
            </div> -->
            <TmmTypographyLabelForm label="แนบรูปภาพและรายละเอียด" />
            <div class="card p-3 mb-3" v-for="(item, index) in attachFields" :key="item.key">
                <div class="flex justify-between">
                    <TmmTag color="#1677ff" class="rounded-xl mb-2">ลำดับที่ {{ index + 1 }}</TmmTag>
                    <CloseCircleTwoTone v-if="attachFields.length > 1" @click="confirmRemoveAttach(item, index)" />
                </div>
                <div class="grid grid-cols-1 gap-2">
                    <div class="">
                        <TmmTypographyLabelForm label="รายละเอียด..." /> {{ }}
                        <TmmInput v-model="item.value.group_text_detail" placeholder="รายละเอียด..."
                            :error="errors[`attach_array[${index}].group_text_detail`]" />
                    </div>

                    <div class="flex flex-col">
                        <TmmTypographyLabelForm label="ประเภทรูปภาพ" />
                        <TmmInputDropDown v-model="item.value.type_group_image_id" placeholder="ประเภทรูปภาพ..."
                            className="" :options="resTypeGroupImage" class="w-full !mb-2" value="id"
                            label="type_group_image_name"
                            :error="errors[`attach_array[${index}].type_group_image_id`]" />
                    </div>
                    <div class="flex flex-col">
                        <TmmTypographyLabelForm label="แนบรูปภาพ (แนบได้สูงสุด 3 รูป)" />
                        <a-upload :maxCount="3" v-model:file-list="item.value.image_detail" accept="image/*"
                            @preview="handlePreview" :before-upload="beforeUpload" list-type="picture" multiple
                            name="file">
                            <a-button>
                                <upload-outlined></upload-outlined>
                                เลือกไฟล์รูปภาพ
                            </a-button>
                        </a-upload>
                        <TmmTypographyTextValidator v-if="errors[`attach_array[${index}].image_detail`]"
                            errors="กรุณาอัพโหลดไฟล์" />
                    </div>
                </div>
            </div>

            <div class="flex justify-center py-2 pb-3 mb-3" v-if="attachFields.length < 6">
                <TmmButton type="primary" severity="secondary" icon="mdi mdi-plus" label="เพิ่มชุดแนบรูปภาพ" @click="pushAttach({
                    group_text_detail: undefined,
                    type_group_image_id: undefined,
                    image_detail: [],
                })" className="" />
            </div>


            <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <!-- <img alt="example" style="width: 100%" :src="previewImage" /> -->
                <a-image style="width: 100%" :src="previewImage" />
            </a-modal>


            <div class="flex gap-5 justify-center max-w-[20rem] mx-auto pb-5">
                <TmmButton type="primary" severity="secondary" :loading="disabledButton" className="w-full rounded-xl"
                    label="ยกเลิก" @click="router.push('/')" />
                <TmmButton type="primary" severity="primary" :loading="disabledButton" className="w-full rounded-xl"
                    htmlType="submit" label="บันทึก" />
            </div>
        </Form>


    </section>

    <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>


<script setup>
//! /////// [Api Variable] /////////
import * as dataApi from './api/data.js'
//! /////// [validation import] /////////
import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";
import { onMounted } from 'vue';
import { fi, tr } from 'date-fns/locale';
import { LongdoMapLoad, LongdoMap, LongdoMapMarker, LongdoMapPolyline } from 'longdo-map-vue'
LongdoMapLoad({
    apiKey: '1e7c1b91542a627c2f556824f98e9977',
})

const map = ref(null);
const marker = ref(null);

const currentLocation = ref()
function getMap(loadedMap) {
    map.value = loadedMap;
}
function addMarker(location_param) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/css/MarkerCluster.Default.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "/js/longdomap.markercluster-src.js";
    script.id = "markercluster";
    document.head.appendChild(script);
    script.onload = () => {
        console.log(map.value)
        if (map.value && location_param) {
            const longdo = window.longdo;
            marker.value = new longdo.Marker(
                { lat: location_param.lat, lon: location_param.lon },
                {
                    draggable: true,
                });
            map.value.Overlays.clear();
            map.value.Overlays.add(marker.value);
            updateLatAntLon()
            map.value.zoom(15)
            map.value.location({ lon: location_param.lon, lat: location_param.lat }, true);
            // event ลากหมุด
            map.value.Event.bind('overlayDrop', (overlay) => {
                if (overlay == marker.value) {
                    updateLatAntLon()
                }
            });
            // event ลากหน้าจอmap
            map.value.Event.bind('location', function () {
                currentLocation.value = map.value.location();
            });

            // Event คลิกขวา
            map.value.Event.bind('beforeContextmenu', function (event) {
                var element = document.createElement('div');
                element.innerHTML = 'ปักหมุดตรงนี้';
                element.style.cursor = 'pointer';
                element.onclick = function () {
                    map.value.Ui.ContextMenu.visible(false);
                    marker.value = new longdo.Marker(
                        { lat: event.location.lat, lon: event.location.lon },
                        {
                            draggable: true,
                        }
                    );
                    map.value.Overlays.clear();
                    map.value.Overlays.add(marker.value);
                    updateLatAntLon()
                };
                event.add(element);
            });
        } else {
            // หากไม่ส่ง param มาแสดงว่า เข้าปุ่ม "ยืนยันตำแหน่ง"
            currentLocation.value = map.value.location();
            console.log(currentLocation.value)
            const longdo = window.longdo;
            marker.value = new longdo.Marker(
                { lat: currentLocation.value.lat, lon: currentLocation.value.lon },
                {
                    draggable: true,
                });
            map.value.Overlays.clear();
            map.value.Overlays.add(marker.value);
            updateLatAntLon()

            // event ลากหมุด
            map.value.Event.bind('overlayDrop', (overlay) => {
                console.log(overlay)
                if (overlay == marker.value) {
                    updateLatAntLon()
                }
            });

            // Event คลิกขวา
            map.value.Event.bind('beforeContextmenu', function (event) {
                var element = document.createElement('div');
                element.innerHTML = 'ปักหมุดตรงนี้';
                element.style.cursor = 'pointer';
                element.onclick = function () {
                    map.value.Ui.ContextMenu.visible(false);
                    marker.value = new longdo.Marker(
                        { lat: event.location.lat, lon: event.location.lon },
                        {
                            draggable: true,
                        }
                    );
                    map.value.Overlays.clear();
                    map.value.Overlays.add(marker.value);
                    updateLatAntLon()
                };
                event.add(element);
            });

            // event ลากหน้าจอmap
            map.value.Event.bind('location', function () {
                currentLocation.value = map.value.location();
            });
        }



    };

}


const confirmLocation = async () => {
    await addMarker()
}

const updateLatAntLon = () => {
    const position = marker.value.location();
    incident_area_lat.value = position.lat;
    incident_area_long.value = position.lon;
}

const resLocation = ref([])
const locationValue = ref();
const locationSearch = async (val) => {
    if (val?.length >= 4) {
        // const res = await dataApi.getSearchLocation(val);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(`https://search.longdo.com/mapsearch/json/search?keyword=${val}&area=10&span=50km&limit=20&key=cffdefc2f61c2b38e32abe2c7b7e19cd`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                resLocation.value = result.data;
            })
            .catch((error) => console.error(error));
    }

};

const showmap = ref(false)
const resObjectPinLocation = ref();
const LocationChange = async (val) => {
    showmap.value = false
    resObjectPinLocation.value = await null;

    locationValue.value = val;
    console.log(val);
    try {
        const matchingLocation = resLocation.value.find(location => location.name == locationValue.value);
        if (matchingLocation) {
            resObjectPinLocation.value = matchingLocation;
            addMarker({ lat: resObjectPinLocation.value.lat, lon: resObjectPinLocation.value.lon })
        }

    } catch (error) {
        console.error(error);
        resObjectPinLocation.value = null;
    }
};


const isloadingAxi = useState('isloadingAxi')

const router = useRouter();
const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});


const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
    zod.object({
        police_province_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        incident_date: zod.string().nonempty(requireValue).default(""),
        incident_time: zod.string().nonempty(requireValue).default(""),
        type_report_code: zod.string().nonempty(requireValue).default(""),
        incident_cause_text: zod.string().nonempty(requireValue).default(""),
        incident_area_text: zod.string().nonempty(requireValue).default(""),
        incident_structure_text: zod.string().nonempty(requireValue).default(""),
        incident_area_lat: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        incident_area_long: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),

        police_head_station_employee_id: zod.number({
            required_error: requireValue,
            invalid_type_error: requireValue,
        }),
        // type_vehicle_code: zod.string().nonempty(requireValue).default(""),
        // type_vehicle_license_plate: zod.string().nonempty(requireValue).default(""),
        incident_detail: zod.string().nonempty(requireValue).default(""),
        // inquiry_employee_id: zod.number({
        //     required_error: requireValue,
        //     invalid_type_error: requireValue,
        // }),
        // inquery
        inquiry_employee_fullname: zod.string().nonempty(requireValue).default(""),
        inquiry_employee_position: zod.string().nonempty(requireValue).default(""),
        inquiry_employee_phone: zod.string().nonempty(requireValue).default(""),
        // senior
        senior_police_control_employee_fullname: zod.string().nonempty(requireValue).default(""),
        senior_police_control_employee_position: zod.string().nonempty(requireValue).default(""),
        senior_police_control_employee_phone: zod.string().nonempty(requireValue).default(""),

        incident_process_text: zod.string().nonempty(requireValue).default(""),

        sufferer_array: zod.array(
            zod.object({
                suffer_firstname: zod.string().nonempty(requireValue).default(""),
                suffer_lastname: zod.string().nonempty(requireValue).default(""),
                suffer_age: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                suffer_nationality: zod.string().nonempty(requireValue).default(""),
                suffer_passport_number: zod.string().nonempty(requireValue).default(""),
                suffer_type_damage_code: zod.string().nonempty(requireValue).default(""),
            })
        ),
        property_array: zod.array(
            zod.object({
                type_property_code: zod.string().nonempty(requireValue).default(""),
                // type_property_brand: zod.string().nonempty(requireValue).default(""),
                type_property_brand: zod.union([zod.string({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }).nonempty(requireValue), zod.undefined()]).optional(),
                type_property_qty: zod.union([zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }), zod.undefined()]).optional(),
                type_property_price: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
            })
                .refine(data => {
                    if (data.type_property_code == 'อาคาร/บ้านเรือน' || data.type_property_code == 'อื่นๆ') {
                        return data.type_property_qty !== undefined && data.type_property_qty !== null && typeof data.type_property_qty === 'number';
                    }
                    return true;
                }, {
                    message: requireValue,
                    path: ['type_property_qty'],
                })
                .refine(data => {
                    if (data.type_property_code == 'รถยนต์' || data.type_property_code == 'รถจักรยานต์ยนต์') {
                        return data.type_property_brand !== undefined && data.type_property_brand !== null && typeof data.type_property_brand === 'string';
                    }
                    return true;
                }, {
                    message: requireValue,
                    path: ['type_property_brand'],
                })
        ),
        villain_array: zod.array(
            zod.object({
                gangster_firstname: zod.string().nonempty(requireValue).default(""),
                gangster_lastname: zod.string().nonempty(requireValue).default(""),
                gangster_age: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                gangster_nationality: zod.string().nonempty(requireValue).default(""),
                gangster_offense_count: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }),
                gangster_weapon: zod.string().nonempty(requireValue).default(""),

            })
        ),
        attach_array: zod.array(
            zod.object({
                group_text_detail: zod.union([zod.string({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }).nonempty(requireValue)]).optional(),
                type_group_image_id: zod.number({
                    required_error: requireValue,
                    invalid_type_error: requireValue,
                }).optional(),
                // image_detail: zod.array(zod.string()).nonempty("image_detail ต้องเป็น array และต้องมีค่าอย่างน้อยหนึ่งค่า").optional()
                image_detail: zod.custom((value) => {
                    if (value != null && (Array.isArray(value) ? value.length > 0 : true)) {
                        return value;
                    }
                }),
            })
                .superRefine((data, context) => {
                    // Check group_text_detail and type_group_image_id
                    if (!data.type_group_image_id && (!data.group_text_detail || data.group_text_detail.trim() === "")) {
                        context.addIssue({
                            code: zod.ZodIssueCode.custom,
                            message: requireValue,
                            path: ['group_text_detail'],
                        });
                    }

                    // Check image_detail
                    // if (!Array.isArray(data.image_detail) || data.image_detail.length === 0) {
                    //     context.addIssue({
                    //         code: zod.ZodIssueCode.custom,
                    //         message: "image_detail ต้องเป็น array และต้องมีค่าอย่างน้อยหนึ่งค่า",
                    //         path: ['image_detail'],
                    //     });
                    // }
                })
        ),
        // image_detail_expenses: zod.custom((value) => {
        //     if (isEdit.value === true) {
        //         return value;
        //     }
        //     return Array.isArray(value) && value.length > 0 ? value : null;
        // }),

    })
);

const { handleReset, handleSubmit, errors } = useForm({
    initialValues: {
        sufferer_array: [
            {
                suffer_firstname: undefined,
                suffer_lastname: undefined,
                suffer_age: undefined,
                suffer_nationality: undefined,
                suffer_passport_number: undefined,
                suffer_type_damage_code: undefined,

            },
        ],
        property_array: [
            {
                type_property_code: undefined,
                type_property_brand: undefined,
                type_property_qty: undefined,
                type_property_price: undefined,
            },
        ],

        villain_array: [
            {
                gangster_firstname: undefined,
                gangster_lastname: undefined,
                gangster_age: undefined,
                gangster_nationality: undefined,
                gangster_offense_count: undefined,
                gangster_weapon: undefined,
            },
        ],
        attach_array: [
            {
                group_text_detail: undefined,
                type_group_image_id: undefined,
                image_detail: [],
            },
        ],
    },
    validationSchema
})


const { value: police_province_id } = useField("police_province_id");
const { value: incident_date } = useField("incident_date");
const { value: incident_time } = useField("incident_time");
const { value: type_report_code } = useField("type_report_code");
const { value: incident_cause_text } = useField("incident_cause_text");
const { value: incident_area_text } = useField("incident_area_text");
const { value: incident_area_lat } = useField("incident_area_lat");
const { value: incident_area_long } = useField("incident_area_long");

const { value: incident_structure_text } = useField("incident_structure_text");

// ยานพาหนะ
const { value: type_vehicle_code } = useField("type_vehicle_code");
const { value: type_vehicle_license_plate } = useField("type_vehicle_license_plate");

const { value: incident_detail } = useField("incident_detail");
// พนักงานสอบสวน
// const { value: inquiry_employee_id } = useField("inquiry_employee_id");
const { value: inquiry_employee_fullname } = useField("inquiry_employee_fullname");
const { value: inquiry_employee_position } = useField("inquiry_employee_position");
const { value: inquiry_employee_phone } = useField("inquiry_employee_phone");

// ตำรวจผู้ใหญ่ควบคุม
const { value: senior_police_control_employee_fullname } = useField("senior_police_control_employee_fullname");
const { value: senior_police_control_employee_position } = useField("senior_police_control_employee_position");
const { value: senior_police_control_employee_phone } = useField("senior_police_control_employee_phone");

// การดำเนินการ ส.ทท
const { value: incident_process_text } = useField("incident_process_text");

const { value: police_head_station_employee_id } = useField("police_head_station_employee_id");

//เปิดแชร์
// const { value: is_share_public } = useField('is_share_public', null, {
//     initialValue: false // กำหนดค่าเริ่มต้นที่นี่
// })
// const { value: image_detail } = useField("image_detail", null, {
//     initialValue: [] // กำหนดค่าเริ่มต้นที่นี่
// });



// ############################ [[ preview file upload ]]
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = '';
};
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


// ####################################### [[ LOAD DATA SELECT OPTIONS ]] #######################################





const { remove: removeSufferer, push: pushSufferer, fields: suffererFields } = useFieldArray("sufferer_array");
const { remove: removeProperty, push: pushProperty, fields: propertyFields, } = useFieldArray("property_array");
const { remove: removeVillain, push: pushVillain, fields: villainFields, } = useFieldArray("villain_array");
const { remove: removeAttach, push: pushAttach, fields: attachFields, } = useFieldArray("attach_array");


const confirmRemoveAttach = async (item, index) => {
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบชุดข้อมูลแนบรูปภาพลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            removeAttach(index)
        })
        .catch(() => {
        });
}

const confirmRemoveVilain = async (item, index) => {
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบคนร้ายลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            removeVillain(index)
        })
        .catch(() => {
        });
}
const confirmRemoveSuffer = async (item, index) => {
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบลำดับผู้เสียหายชอบลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            removeSufferer(index)
        })
        .catch(() => {
        });
}
const confirmRemoveProperty = async (item, index) => {
    showConfirmDialog({
        title: 'ลบข้อมูล',
        message:
            `ยืนยันการลบสินทรัพย์เสียหายลำดับที่ ${index + 1} ใช่หรือไม่`,
    })
        .then(() => {
            removeProperty(index)
        })
        .catch(() => {
        });
}



const onSubmit = handleSubmit((values) => {
    saveReport(values);
});

const disabledButton = ref(false)
const saveReport = async () => {


    try {
        updateLatAntLon();
        disabledButton.value = true;
        isloadingAxi.value = true;

        const formData = new FormData();
        formData.append('police_province_id', police_province_id.value ? police_province_id.value : null);
        formData.append('incident_date', incident_date.value);
        formData.append('incident_time', incident_time.value);
        formData.append('type_report_code', type_report_code.value);
        formData.append('incident_cause_text', incident_cause_text.value);
        formData.append('incident_area_text', incident_area_text.value);
        formData.append('incident_structure_text', incident_structure_text.value);
        formData.append('incident_area_lat', incident_area_lat.value);
        formData.append('incident_area_long', incident_area_long.value);
        // ยานพาหนะ
        formData.append('type_vehicle_code', type_vehicle_code.value ? type_vehicle_code.value : "");
        formData.append('type_vehicle_license_plate', type_vehicle_license_plate.value ? type_vehicle_license_plate.value : "");
        // รายละเอียดเหตุ
        formData.append('incident_detail', incident_detail.value);
        // พนักงานสอบสวน
        // formData.append('inquiry_employee_id', inquiry_employee_id.value);
        formData.append('inquiry_employee_fullname', inquiry_employee_fullname.value);
        formData.append('inquiry_employee_position', inquiry_employee_position.value);
        formData.append('inquiry_employee_phone', inquiry_employee_phone.value);
        // ตำรวจผู้ใหญ่ควบคุม
        formData.append('senior_police_control_employee_fullname', senior_police_control_employee_fullname.value);
        formData.append('senior_police_control_employee_position', senior_police_control_employee_position.value);
        formData.append('senior_police_control_employee_phone', senior_police_control_employee_phone.value);
        // การดำเนินการ ส.ทท
        formData.append('incident_process_text', incident_process_text.value);
        formData.append('police_head_station_employee_id', police_head_station_employee_id.value);

        // เปิดแชร์
        // formData.append('is_share_public', is_share_public.value ? 1 : 0);

        suffererFields.value.forEach((e, i) => {
            formData.append('suffer_firstname[]', e.value.suffer_firstname ? e.value.suffer_firstname : null);
            formData.append('suffer_lastname[]', e.value.suffer_lastname ? e.value.suffer_lastname : null);
            formData.append('suffer_age[]', e.value.suffer_age ? e.value.suffer_age : null);
            formData.append('suffer_nationality[]', e.value.suffer_nationality ? e.value.suffer_nationality : null);
            formData.append('suffer_passport_number[]', e.value.suffer_passport_number ? e.value.suffer_passport_number : null);
            formData.append('suffer_type_damage_code[]', e.value.suffer_type_damage_code ? e.value.suffer_type_damage_code : null);
        });
        propertyFields.value.forEach((e, i) => {
            formData.append('type_property_code[]', e.value.type_property_code ? e.value.type_property_code : "");
            formData.append('type_property_brand[]', e.value.type_property_brand ? e.value.type_property_brand : "");
            formData.append('type_property_qty[]', e.value.type_property_qty ? e.value.type_property_qty : "");
            formData.append('type_property_price[]', e.value.type_property_price ? e.value.type_property_price : "");
        });
        villainFields.value.forEach((e, i) => {
            formData.append('gangster_firstname[]', e.value.gangster_firstname ? e.value.gangster_firstname : null);
            formData.append('gangster_lastname[]', e.value.gangster_lastname ? e.value.gangster_lastname : null);
            formData.append('gangster_age[]', e.value.gangster_age ? e.value.gangster_age : 0);
            formData.append('gangster_nationality[]', e.value.gangster_nationality ? e.value.gangster_nationality : null);
            formData.append('gangster_offense_count[]', e.value.gangster_offense_count ? e.value.gangster_offense_count : 0);
            formData.append('gangster_weapon[]', e.value.gangster_weapon ? e.value.gangster_weapon : null);
        });

        attachFields.value.forEach((e, i) => {
            formData.append(`group_text_detail[${i}]`, e.value.group_text_detail ? e.value.group_text_detail : "");
            formData.append(`type_group_image_id[${i}]`, e.value.type_group_image_id ? e.value.type_group_image_id : "");
            // formData.append('image_detail[][]', e.value.image_detail ? e.value.image_detail : "");
            e.value.image_detail.forEach(file => {
                console.log(file)
                formData.append(`image_detail[${i}][]`, file.originFileObj);
            });
        });

        const res = await dataApi.saveReportV2(formData);
        errorAlert.value = false;
        alertToast.value = {
            severity: "success",
            summary: "ทำรายการสำเร็จ",
            detail: res.data.message,
        };
        disabledButton.value = false;
        isloadingAxi.value = false;
        handleReset();
        navigateTo(`/report/edit/${res.data.data.report_id}`)
    } catch (error) {
        disabledButton.value = false;
        isloadingAxi.value = false
        errorAlert.value = true;
        dataError.value = error;
        console.error(error)
    }
    disabledButton.value = false;
    isloadingAxi.value = false

}


const areaLabel = ref()
const areaChange = async () => {
    try {
        resPoliceProvince.value.forEach(item => {
            if (item.id == police_province_id.value) {
                areaLabel.value = item.police_province_name
            }
        });
    } catch (error) {
        console.error(error);
    }
}

const handleUpload = () => {
    console.log('image_detail', image_detail.value);
    const formData = new FormData();
    image_detail.value.forEach(file => {
        formData.append("image_detail[]", file);
    });
    formData.append("name", 'amm');
    console.log([...formData])
    console.log(formData)
};

const beforeUpload = file => {
    resSuggestionEmployee.value.forEach((e, i) => {
        fields.value[i].value.image_detail.forEach((item, index) => {
            fields.value[i].value.image_detail[index].status = "done"
        })

    });
};

onMounted(() => {
    connectLineNotifycheck();
    checkIsError();
    loadPoliceProvince();
    loadTypeReport();
    loadTypeDamage();
    loadTypeProperty();
    loadVehicle();
    loadInquiryEmp();
    loadSeniorPolice();
    loadPoliceHeadStation();
    loadTypeGroupImage();
    loadNational()
    loadEmployeeSuggestion()
    loadHeadeStation();
    loadPositions();
    //loadMyProfile();
})
const { $swal } = useNuxtApp()
const warningModal = ref(false);
const messageError = ref('');
const checkIsError = async () => {
    const route = useRoute();
    const isError = route.query.iserror;
    const message = route.query.message;
    if (isError == 'true') {
        warningModal.value = true;
        messageError.value = message


        const newQuery = { ...route.query };
        delete newQuery.iserror;
        delete newQuery.message;
        // Update the URL without reloading the page
        router.replace({ query: newQuery });
    }
};
const connectLineModal = ref(false);

const connectLineNotifycheck = async () => {
    try {
        const res = await dataApi.getCheckConnectLineNotify();
        console.log('คอลเช็ค conect line notify')
        if (res.data.data.connect == false) { //ถ้ายังไม่เชื่อม
            connectLineModal.value = true; //เปิด modal
        }
    } catch (error) {
        console.error(error);
    }
}

const connectLineNotify = async () => {
    try {
        const res = await dataApi.getCheckConnectLineNotify();
        if (res.data.data.connect == false) { //ถ้ายังไม่เชื่อม
            window.location.href = res.data.data.generateAuthorizeLink; //รีไดเร็ก
        } else {
            connectLineModal.value = false //ถ้าเชื่อมแล้ว ปิดmodal
        }
        return;
    } catch (error) {
        console.error(error);
    }
}

const resPositions = ref()
const loadPositions = async () => {
    try {
        const res = await dataApi.getPositions()
        resPositions.value = res.data.data;
    } catch (error) {
        console.error(error)
    }
}
const resHeadeStation = ref()
const loadHeadeStation = async () => {
    try {
        const res = await dataApi.getPoliceHeadeStation()

        resHeadeStation.value = res.data?.data?.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name}`,
        }));
    } catch (error) {
        console.error(error)
    }
}


const resSuggestionEmployee = ref();
const resSuggestionEmployeeInquiry = ref();
const resSuggestionEmployeeSenior = ref();
const loadEmployeeSuggestion = async () => {
    try {
        const res = await dataApi.getEmployeeSuggestion()
        resSuggestionEmployee.value = res.data.data;
        resSuggestionEmployeeInquiry.value= res.data.data;
        resSuggestionEmployeeSenior.value= res.data.data;
    } catch (error) {
        console.error(error);
    }
}
const inquiryChange = async () => {
    try {
        for (const item of resSuggestionEmployee.value) {
            if (inquiry_employee_fullname.value === item.fullname) {
                inquiry_employee_position.value = item.position;
                inquiry_employee_phone.value = item.phone;

                break;  // Stop the loop once a match is found
            } else {

                inquiry_employee_position.value = undefined;
                inquiry_employee_phone.value = undefined;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const inquirySearch = (val) => {
    try {
        if (val.length > 1) {
            resSuggestionEmployeeInquiry.value = resSuggestionEmployee.value.filter(employee =>
                employee.fullname.toLowerCase().includes(val.toLowerCase())
            );
            
        } else {
            resSuggestionEmployeeInquiry.value = resSuggestionEmployee.value
        }
    } catch (error) {
        console.error(error);
    }
}

const seniorChange = async () => {
    try {
        for (const item of resSuggestionEmployee.value) {
            if (senior_police_control_employee_fullname.value === item.fullname) {
                senior_police_control_employee_position.value = item.position;
                senior_police_control_employee_phone.value = item.phone;
                break;  // Stop the loop once a match is found
            } else {
                senior_police_control_employee_position.value = undefined;
                senior_police_control_employee_phone.value = undefined;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const seniorSearch = (val) => {
    try {
        if (val.length > 1) {
            resSuggestionEmployeeSenior.value = resSuggestionEmployee.value.filter(employee =>
                employee.fullname.toLowerCase().includes(val.toLowerCase())
            );
        } else {
            resSuggestionEmployeeSenior.value = resSuggestionEmployee.value
        }
    } catch (error) {
        console.error(error);
    }
}

const resNational = ref()
const loadNational = async () => {
    try {
        const res = await dataApi.getNation()
        resNational.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resTypeGroupImage = ref()
const loadTypeGroupImage = async () => {
    try {
        const res = await dataApi.getTypeGroupImage()
        resTypeGroupImage.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resPoliceProvince = ref()
const loadPoliceProvince = async () => {
    try {
        const res = await dataApi.getPoliceProvince()
        resPoliceProvince.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resTypeReport = ref()
const loadTypeReport = async () => {
    try {
        const res = await dataApi.getTypeReport()
        resTypeReport.value = res.data.data;
        resTypeReport.value = resTypeReport.value?.map((e, i) => ({
            ...e,
            value: e?.code,
        }));
        // console.log('resTypeReport', resTypeReport.value)
    } catch (error) {
        console.error(error);
    }
}
// const options = computed(() =>
//     resTypeReport.value?.map((item) => ({ value: item.code }))
// );

// const onSelect = (selectedValue) => {
//     console.log("Selected:", selectedValue);
// };

// const onSearch = (searchText) => {
//     options.value = !searchText
//         ? []
//         : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
// };

const resTypeDamage = ref()
const loadTypeDamage = async () => {
    try {
        const res = await dataApi.getTypeDamage()
        resTypeDamage.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}
const resTypeProperty = ref()
const loadTypeProperty = async () => {
    try {
        const res = await dataApi.getTypeProperty()
        resTypeProperty.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resVehicle = ref()
const loadVehicle = async () => {
    try {
        const res = await dataApi.getVehicle()
        resVehicle.value = res.data.data;
    } catch (error) {
        console.error(error);
    }
}

const resSeniorPolice = ref()
const loadSeniorPolice = async () => {
    try {
        const res = await dataApi.getSeniorPolice()
        resSeniorPolice.value = res.data.data;
        resSeniorPolice.value = resSeniorPolice.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name}`,
        }));
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

const resInquiryEmp = ref();
const loadInquiryEmp = async () => {
    try {
        const res = await dataApi.getInquiryEmp()
        console.log('res', res)
        resInquiryEmp.value = res.data.data;
        resInquiryEmp.value = resInquiryEmp.value.map((e, i) => ({
            ...e,
            fullname: `${e.rank_name_th_abb} ${e.first_name} ${e.last_name}`,
        }));
    } catch (error) {
        console.error(error);
    }
}
// const inquiryEmpChange = async () => {
//     resInquiryEmp.value.forEach(item => {
//         // if (item.employee_id == inquiry_employee_id.value) {
//         //     inquiry_employee_fullname.value = item.fullname
//         //     inquiry_employee_license_number.value = item.license_number;
//         // }
//     });
// }



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

<style></style>