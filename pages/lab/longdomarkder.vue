<template>
    <div class="flex flex-col items-center my-8 w-[95%] h-[80vh] mx-auto">
        <div class="mb-4">
            <button @click="addMarker(storStation)" class="px-4 py-2 bg-blue-500 text-white rounded">Add Marker</button>
            <button @click="removeMarker" class="px-4 py-2 bg-red-500 text-white rounded ml-4">Remove Marker</button>
            <button @click="moveMarker" class="px-4 py-2 bg-red-500 text-white rounded ml-4">move Marker</button>
            <TmmButton type="primary" icon="mdi mdi-map-marker-radius" outlined size="" className="!px-1 !text-xs"
                severity="info" label="ยืนยันตำแหน่ง" @click="confirmLocation" />
        </div>
        <longdo-map class="h-full w-full" @load="getMap" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const map = ref(null);
const marker = ref(null);
const storStation = ref({ lat: 13.689128, lon: 100.491781 });
const storStationCn = ref({ lat: 15.185197, lon: 100.125122 });
const currentLocation = ref()

function getMap(loadedMap) {
    map.value = loadedMap;
}

function moveMarker() {
    if (map.value && marker.value) {
        map.value.Overlays.move()(storStationCn.value.lat, storStationCn.value.lon);
    }
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
            // event ลากหมุด
            map.value.Event.bind('overlayDrop', (overlay) => {
                console.log(overlay)
                if (overlay == marker.value) {
                    console.log('==')
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

const incident_area_lat = ref()
const incident_area_long = ref()
const updateLatAntLon = () => {
    const position = marker.value.location();
    incident_area_lat.value = position.lat;
    incident_area_long.value = position.lon;
    console.log(incident_area_lat.value)
    console.log(incident_area_long.value)
}

function removeMarker() {
    if (map.value && marker.value) {
        map.value.removeMarker(marker.value);
        marker.value = null;
    }
}

onMounted(() => {
    // Additional initialization if needed

});

onUnmounted(() => {
    // Clean up any necessary resources here
});
</script>