<template>
  <HeaderMainProfile />
  <section class="p-3">
    <Form @submit="onSubmit" class="space-y-1 mb-3">

      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-4">
          <TmmInputDropDown v-model="type_report_code" placeholder="ประเภทรายงาน" className="" :options="resReportType"
            class="w-full" value="code" label="detail" :error="errors.type_report_code" />
        </div>
        <div class="col-span-4">
          <TmmInputCalendar v-model="incident_date_start" class="w-full" placeholder="ตั้งแต่วันที่"
            :error="errors.incident_date_start" />
        </div>
        <div class="col-span-4">
          <TmmInputCalendar v-model="incident_date_end" class="w-full" placeholder="ถึงวันที่"
            :error="errors.incident_date_end" />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-7">
          <a-select v-model:value="locationValue" show-search placeholder="ค้นหาพื้นที่"
            :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null"
            :options="resLocation" class="w-full" :field-names="{ label: 'name', value: 'name' }"
            @search="locationSearch" :status="errors.incident_area_lat ? 'error' : ''"></a-select>
        </div>
        <div class="col-span-5">
          <TmmInputDropDown v-model="radius_km" placeholder="รัศมี" className="" :options="resRadius" value="value"
            label="label" class="w-full" />
        </div>

      </div>
      <div class="flex justify-between">
        <TmmButton v-if="!showIconLoadAll" @click="loadFindMapAll()" label="แสดงที่หมด"
          icon="mdi mdi-checkbox-blank-outline" type="primary" severity="warning" />
        <TmmButton v-else @click="loadFindMapAll()" label="แสดงที่หมด" icon="mdi mdi-checkbox-outline" type="primary"
          severity="warning" />
        <TmmButton label="ค้นหา" icon="mdi mdi-map" type="primary" htmlType="submit" severity="info" />
      </div>
    </Form>
    <!-- <client-only>
            <LongdoMap v-if="showMap" class="h-[30rem] w-full" @load="initializeMap">
            </LongdoMap>
            <LongdoMap v-else class="h-[30rem] w-full">
            </LongdoMap>
        </client-only> -->
    <div class="flex justify-center w-[95%] h-[60vh] mx-auto">
      <longdo-map class="h-full w-full" @load="getMap" v-if="showMap == true" />
      <longdo-map class="h-full w-full" v-else />
    </div>
    <div class="text-end pr-6">
      <span class="text-xs text-blue-400">จำนวนข้องมูลที่แสดง <span v-if="resMap?.items?.length>0">{{ resMap?.items?.length }}</span><span v-else>0</span>  รายการ</span>
    </div>
  </section>

  <TmmAlertToast :data="alertToast" :error="errorAlert" :dataError="dataError" />
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as dataApi from './api/dataApi.js'

import { useField, useForm, Form, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { format } from "date-fns";
import * as zod from "zod";
import { fi, tr } from 'date-fns/locale';

const alertToast = ref({});
const errorAlert = ref(false);
const dataError = ref({});

const map = ref(null);

const resRadius = ref()
const loadRadius = async () => {
  try {
    const res = await dataApi.getRadius()
    resRadius.value = res.data.data?.map((e, i) => ({
      ...e,
      value: e,
      label: e
    }));
  } catch (error) {
    console.error(error);
  }
}

const resReportType = ref()
const loadReportType = async () => {
  try {
    const res = await dataApi.getReportType()
    resReportType.value = res.data.data;
  } catch (error) {
    console.error(error);
  }
}

const resLocation = ref([])
const locationValue = ref();
const locationSearch = async (val) => {
  if (val?.length >= 4) {
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

const requireValue = "กรุณาระบุข้อมูล";
const validationSchema = toTypedSchema(
  zod.object({
    incident_date_end: zod.string().nonempty(requireValue).default(""),
    incident_date_start: zod.string().nonempty(requireValue).default(""),
    type_report_code: zod.string().nonempty(requireValue),
    // incident_date: zod.string().nonempty(requireValue).default(""),
    // incident_time: zod.string().nonempty(requireValue).default(""),
    // type_report_code: zod.string().nonempty(requireValue).default(""),
  })
)

const { handleReset, handleSubmit, errors } = useForm({
  validationSchema
})

const onSubmit = handleSubmit((values) => {
  search(values);
});

const search = async () => {
  try {
    showMap.value = false
    const payload = {
      type_report_code: type_report_code.value ? type_report_code.value : "", // ไม่บังคับ
      incident_date_start: incident_date_start.value ? incident_date_start.value : "", // ไม่บังคับ
      incident_date_end: incident_date_end.value ? incident_date_end.value : "", // ไม่บังคับ
      radius_km: radius_km.value ? radius_km.value : "", // ไม่บังคับ [1, 5, 10, 25, 50, 75, 100, 150, 200]
      area_lat: area_lat.value ? area_lat.value : "", // ไม่บังคับ
      area_long: area_long.value ? area_long.value : ""   // ไม่บังคับ
    }
    const res = await dataApi.findMapFilter(payload);
    // หากมีข้อมูล 
    if (res.data.data?.items?.length > 0) {
      console.log(res.data.data?.items?.length)
      resMap.value = await res.data.data;
      showIconLoadAll.value = false
      showMap.value = true

      setTimeout(() => {
        initialCluster();
      }, 300);
    } else {
      // หากไม่มีข้อมูล แสดงmapเปล่า ๆ
      showIconLoadAll.value = false
      showMap.value = false
    }

  } catch (error) {
    errorAlert.value = true;
    dataError.value = error;
    console.error(error)
  }
}

const { value: type_report_code } = useField("type_report_code");
const { value: incident_date_start } = useField("incident_date_start");
const { value: incident_date_end } = useField("incident_date_end");
const { value: radius_km } = useField("radius_km");
const { value: area_lat } = useField("area_lat");
const { value: area_long } = useField("area_long");
const { value: focus_location } = useField("focus_location");
const { value: zoom } = useField("zoom");

function getMap(mapInstance) {
  map.value = mapInstance;
}

const showMap = ref(false);
const resMap = ref([]);
const showIconLoadAll = ref(false);

const loadFindMapAll = async () => {
  try {
    showMap.value = false;
    const res = await dataApi.findMapAll();
    resMap.value = await res.data.data;
    showMap.value = true;

    showIconLoadAll.value = await true;
    setTimeout(() => {
      initialCluster();
    }, 300);

  } catch (error) {
    showIconLoadAll.value = false;
    errorAlert.value = true;
    dataError.value = error;
    console.error(error);
  }
};

function initialCluster() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/css/MarkerCluster.Default.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "/js/longdomap.markercluster-src.js";
  script.id = "markercluster";
  document.head.appendChild(script);

  script.onload = () => {
    const longdo = window.longdo;
    let markercluster = new lmc.MarkerCluster(map.value, {});
    if (resMap.value?.option) {
      map.value.location({
        lon: resMap.value.option.center_long,
        lat: resMap.value.option.center_lat,
      });
      map.value.zoom(resMap.value?.option?.zoom || 13); // Set the zoom level to 13
    }
    resMap.value?.items.forEach(item => {
      const imagesHtml = item.report_image_all.map(imgUrl => `<img src="${imgUrl}" alt="report image" style="width: 100px; height: auto; margin: 5px;">`).join('');
      const detailHtml = `
      ${item.detail_text}
      <br>
      <div class="overflow-x-auto whitespace-nowrap">
        <div class="flex">
          ${imagesHtml}
        </div>
      </div>
    `;
      markercluster.addMarkers(
        new longdo.Marker(
          { lat: item.incident_area_lat, lon: item.incident_area_long },
          {
            icon: {
              url: item.icon_map || 'https://map.longdo.com/mmmap/images/pin_mark.png',
              offset: { x: 12, y: 45 },
              size: { width: 40, height: 45 }
            },
            title: item.title,
            detail: detailHtml,
          }
        )
      );
    });


    markercluster.render();
  };
}

function setCustomGeolocationIcon() {
    const geolocationButton = document.querySelector('ldmap_button ldmap_geolocation');
    geolocationButton.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const longdo = window.longdo;
            const geolocationMarker = new longdo.Marker(
                { lat: latitude, lon: longitude },
                {
                    icon: {
                        url: 'https://w7.pngwing.com/pngs/457/630/png-transparent-location-logo-location-computer-icons-symbol-location-miscellaneous-angle-heart.png',
                        offset: { x: 12, y: 45 }, // Adjust offset if needed
                    },
                    title: 'Your Location',
                }
            );
            map.value.Overlays.add(geolocationMarker);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setCustomGeolocationIcon();
});

onMounted(async () => {
  await loadFindMapAll();
  loadRadius();
  loadReportType();


});

onUnmounted(() => {
  map.value = null;
});
</script>