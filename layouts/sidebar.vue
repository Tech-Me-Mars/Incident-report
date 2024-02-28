<!-- <template>
    <aside id="logo-sidebar" class="fixed top-10 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div>
        <h1 class="font-bold text-xl pl-2 mb-5 mt-3">เมนูทั้งหมด</h1>
    </div>
        <div class="h-full px-3 pb-4 overflow-y-auto bg-">
      <ul class="space-y-2 font-medium">
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span class="ms-3">Dashboard</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
               <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
               <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </a>
         </li>
      </ul>
   </div>
</aside>
</template> -->
<template>
   <fwb-sidebar id="logo-sidebar"
      class="fixed top-10 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar">
      <div v-for="(item, index) in menuSidebar" :key="index">
         <div class="font-bold text-lg">{{ item.groupmenu }}</div>
         <div v-for="(item_menulist, index_menulist) in item.menulist" :key="index_menulist">

            <!-- <NuxtLink :to="item_menulist.to"> -->
            <fwb-sidebar-item :link="item_menulist.to" v-if="item_menulist.submenu.length == 0">
               <template #icon>
                  <i :class="`${item_menulist.icon}`" style="font-size: 23px;"></i>
               </template>
               {{ item_menulist.menu }}
            </fwb-sidebar-item>

            <fwb-sidebar-dropdown-item v-if="item_menulist.submenu.length > 0">
               <template #icon>
                  <i :class="`${item_menulist.icon}`" style="font-size: 23px;"></i>
               </template>
               <template #trigger> {{ item_menulist.menu }} </template>
               <template #default>
                  <div v-for="(item_submenu, index_submenu) in item_menulist.submenu" :key="index_submenu">
                     <fwb-sidebar-item :link="item_submenu.to" class="pl-11">
                        <template #icon>
                           <i :class="`${item_submenu.icon}`" style="font-size: 23px;"></i>
                        </template>
                        <template #default><span>{{ item_submenu.menu }}</span> </template>

                     </fwb-sidebar-item>
                  </div>

               </template>
            </fwb-sidebar-dropdown-item>

         </div>


      </div>


   </fwb-sidebar>
</template>
<script setup>
import "@mdi/font/css/materialdesignicons.min.css"
import { FwbSidebar, FwbSidebarItem, FwbSidebarDropdownItem } from 'flowbite-vue'

const menuSidebar = [
   {
      groupmenu: "ภาพรวม",
      menulist: [
         { menu: "ภาพรวม", to: "/modules/dashboard_overview", icon: "mdi mdi-home-outline", submenu: [] },
         {
            menu: "ระบบแผน",
            to: "",
            icon: "mdi mdi-notebook-outline",
            submenu: [
               { menu: "แผน", to: "/modules/plan", icon: "" },
               { menu: "อนุมัติแผน", to: "", icon: "" },
            ]
         },
         { menu: "จัดการคู่ค้า", to: "/modules/supplier/main", icon: "mdi mdi-smart-card-outline", submenu: [] },
         {
            menu: "จัดการสินค้า",
            to: "",
            icon: "mdi mdi-folder-file-outline",
            submenu: [
               { menu: "สินค้า", to: "/modules/products/main", icon: "" },
               { menu: "อนุมัติแผน", to: "/modules/products/import", icon: "" },
            ]
         },
         { menu: "จัดซื้อ", to: "/modules/po/main", icon: "mdi mdi-cart-outline", submenu: [] },
         { menu: "รับสินค้า", to: "/receive-and-complete/main", icon: "mdi mdi-package-variant-closed", submenu: [] },
         { menu: "ใบแจ้งหนี้", to: "/modules/invoice/main", icon: "mdi mdi-note-plus-outline", submenu: [] },
         { menu: "ชำระเงิน", to: "/", icon: "mdi mdi-cash", submenu: [] },
      ]
   },
   {
      groupmenu: "จัดการผู้ใช้งาน",
      menulist: [
         {
            menu: "ข้อมูลผู้ใช้งาน",
            to: "/modules/manage_users/data_user",
            icon: "mdi mdi-account-box-multiple-outline",
            submenu: []
         },
      ]
   },
   {
      groupmenu: "จัดการบุคลากร",
      menulist: [
         {
            menu: "จัดการบุคลากร",
            to: "",
            icon: "mdi mdi-account-cog-outline",
            submenu: [
               { menu: "ข้อมูลบุคลากร", to: "/modules/manage_personel/personal_data", icon: "" },
               { menu: "ข้อมูลเงินเดือน", to: "/modules/manage_personel/salary_data", icon: "" },
               { menu: "ลางาน", to: "/modules/manage_personel/leave_work", icon: "" },
               { menu: "ประเมินผลงาน", to: "/", icon: "" },
            ]
         },
      ]
   },
   {
      groupmenu: "จัดการการเข้าถึง",
      menulist: [
         {
            menu: "จัดการการเข้าถึง",
            to: "",
            icon: "mdi mdi-account-lock-outline",
            submenu: [
               { menu: "ข้อมูลตำแหน่งงาน", to: "/modules/manage_access_control/position_main", icon: "" },
               { menu: "ข้อมูลการเข้าถึงบุคลากร", to: "/modules/manage_access_control/permission_access", icon: "" },
               { menu: "การเข้าถึงข้อมูลตำแหน่ง", to: "/modules/manage_access_control/permission_position", icon: "" },
            ]
         },
         {
            menu: "รายงาน",
            to: "",
            icon: "",
            submenu: [
               { menu: "รายงานผู้จัดจำหน่าย", to: "/modules/report/supplier-main", icon: "" },
               { menu: "รายงานใบสั่งซื้อ", to: "/modules/report/po", icon: "" },
               { menu: "รายงานแผน", to: "/modules/report/plan", icon: "" },
               { menu: "รายงานผลิตภัณฑ์ซัพพลายเออร์", to: "/modules/report/supplier-product", icon: "" },
               { menu: "รายงานเงินเดือน", to: "/modules/report/saraly", icon: "" },
            ]
         },

      ]
   },

   {
      groupmenu: "ตั้งค่า",
      menulist: [
         {
            menu: "จัดการข้อมูล",
            to: "",
            icon: "mdi mdi-folder-cog-outline",
            submenu: [
               { menu: "ข้อมูลการเข้าถึง", to: "/modules/manage_data/perrmission_main", icon: "" },
               { menu: "ข้อมูลหน่วยนับ", to: "/modules/manage_data/unit", icon: "" },
               { menu: "ข้อมูลลักษณะสินค้า", to: "/modules/manage_data/sku_attribute", icon: "" },
               { menu: "ข้อมูลหมวดหมู่สินค้า", to: "/modules/manage_data/category_product", icon: "" },
               { menu: "ข้อมูลบรรจุภัณฑ์", to: "/modules/manage_data/packagingtype", icon: "" },
               { menu: "ข้อมูลประเภทหน่วยงาน", to: "/modules/manage_data/department_type", icon: "" },
               { menu: "ข้อมูลข้อมูลประเภทแผน", to: "/modules/manage_data/plantype", icon: "" },
               { menu: "ข้อมูลประเภทการใช้เงิน", to: "/modules/manage_data/typemoney", icon: "" },
               { menu: "ข้อมูลสถานะใบแจ้งหนี้", to: "/modules/manage_data/invoice_status", icon: "" },
               { menu: "ข้อมูลรูปแบบการชำระเงิน", to: "/modules/manage_data/payment_methods", icon: "" },
               { menu: "ข้อมูลหน่วยงาน", to: "/modules/manage_data/department_main", icon: "" },
               { menu: "ข้อมูลประเภทการลางาน", to: "/modules/manage_data/leave_type", icon: "" },
               { menu: "ข้อมูลวุฒิการศึกษา", to: "/modules/manage_data/education_degree", icon: "" },
               { menu: "ข้อมูลประเภทการเคลื่อนย้าย", to: "/modules/manage_data/trasfer-information", icon: "" },
               { menu: "ข้อมูลสถานะครุภัณฑ์", to: "/modules/manage_data/equipment-status", icon: "" },
               { menu: "ข้อมูลประเภทครุภัณฑ์", to: "/modules/manage_data/equipment-type", icon: "" },
               { menu: "ข้อมูลครุภัณฑ์", to: "/modules/manage_data/equipment-information", icon: "" },
               { menu: "ข้อมูลแจ้งซ่อม", to: "/modules/manage_data/report-repair", icon: "" },
               { menu: "ข้อมูลงาน", to: "/modules/manage_data/work-information", icon: "" },
            ]
         },
      ]
   },


]
</script>

<style>
/* ทำให้เมนูย่อยในsidebar warp เมื่อชนขอบ */
.whitespace-nowrap{
text-wrap: wrap;
}</style>