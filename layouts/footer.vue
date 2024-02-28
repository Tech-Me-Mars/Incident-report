<template>
    <div class="z-50">
        <div class="relative">
            
            <div class="bg-white text-dark-600 p-1 w-full flex justify-between items-center fixed bottom-0 left-0">
                <div class="grid grid-cols-3 w-full">
                    
                    <button class="text-center flex flex-col items-center space-x-2 font-bold">
                        <i class="pi pi-pencil" style="font-size: 2.5rem;"></i>
                        รายงาน
                    </button>
              
                    <div class="flex justify-center text-center ">
                        <img src="https://miro.medium.com/v2/resize:fit:500/0*xkJgg-6HskYrQ3N7.jpeg" alt="User Avatar"
                            class="w-[5rem] h-[5rem] rounded-full absolute -top-8 border-8 border-white" />
                    </div>

                    <OverlayPanel ref="menu" class="" :pt="{
                        root: { class: 'p-0 m-0 bg-white rounded-xl' },
                        content: { class: 'p-0 m-0 ' }
                    }"
                    >
                        <ul class="list-none p-1 ">
                            <router-link @click="toggleImgMenu" :to="item.path" v-for="(item,index) in itemsMenu" :key="index">
                            <li class="hover:bg-gray-300 p-2 shadow-2 cursor-pointer w-full border-blue-600 border text-xs lg:text-lg
                                -xl rounded-lg mb-2 font-bold" :class="isActive(item.path)">
                                <i :class="item.icon" style="font-size: 1rem"></i>{{ item.label }}
                            </li>
                        </router-link>
                        </ul>

                    </OverlayPanel>
                    <button class="text-center flex flex-col items-center space-x-2 font-bold" @click="toggleImgMenu">
                        <i class="pi pi-bars" style="font-size: 2.5rem"></i>
                        รายงานของฉัน
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useRouter, useRoute } from "vue-router";
// import { useRouter, useRoute } from 'nuxt/app';

const route = useRoute();
const router = useRouter();
const menu = ref();
const toggleImgMenu = (event) => {
    console.log(event);
    menu.value.toggle(event);
};
const currentRoute = computed(() => {
    return route.path;
});
const isActive  = (val) =>{
    if (currentRoute.value == val) {
        console.log('active route ');
        return 'bg-blue-600 text-white shadow-xl'
    }
    
};
const itemsMenu = ref([
            {
                label: 'ล็อคอิน',
                icon: 'pi pi-sign-out mr-1',
                path:"/"

            },
            {
                label: 'แดชบอร์ด',
                icon: '',
                path:"/dashboard"
            },
            {
                label: 'เลือกประเภทแจ้งเหตุ',
                icon: '',
                path:"/reporttype"
            },
            {
                label: 'รายการแจ้งของฉัน',
                icon: '',
                path:"/allreport"
            },
            {
                label: 'ฟอร์มแจ้งเหตุ',
                icon: '',
                path:"/formreport"

            },
            {
                label: 'finish',
                icon: '',
                path:"/finish"
            },

]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>


<style >
.p-menu .p-menuitem:not(.p-highlight):not(.p-disabled)>.p-menuitem-content:hover {
    color: #212529;
    background: none;
}
</style>