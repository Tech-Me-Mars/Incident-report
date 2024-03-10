<template>
<van-cell-group inset>
  <van-field v-model="text" label="Text" />
  <van-field v-model="tel" type="tel" label="Phone" />
  <van-field v-model="digit" type="digit" label="Digit" />
  <van-field v-model="number" type="number" label="Number" />
  <van-field v-model="password" type="password" label="Password" />
</van-cell-group>
</template>

<script setup>

import * as dataApi from "./api/data.js";

const loaddata = async()=>{
    
    try{
        const res = await dataApi.getSupplierAll();
        console.log(res.data.data)
    }catch(error){
        console.error(error)
    }
}
loaddata()
</script>