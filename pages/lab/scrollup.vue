<template>
    <InfiniteLoading :top="true" @infinite="load">
        <template #spinner>
            <span></span>
        </template>
        <template #complete>
            <span>No more data found!</span>
        </template>
    </InfiniteLoading>
    <div class="result" v-for="(comment, index) in comments" :key="comment.id">
        <div>{{ comment.id }} index:{{ index }}</div>
    </div>

</template>
<script setup>
import * as dataApi from "./api/data.js";
import { ref } from "vue";
// import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css";

let comments = ref([]);
let page = 1;
const load = async $state => {
    console.log("loading...");

    try {
        const payload = {
            id: [],
            per_page: 20,
        };
        const res = await dataApi.getMessage(payload, 5);
        if (res.data.data.length < 10) $state.complete();
        else {
            // comments.value.unshift(...json.reverse());
            comments.value.unshift(...res.data.data);
            $state.loaded();
        }
        page++;
    } catch (error) {
        $state.error();
    }
};
onMounted(() => {
    load()
})
</script>

<style>


#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.result {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 300;
    width: 400px;
    padding: 10px;
    text-align: center;
    margin: 0 auto 10px auto;
    background: #eceef0;
    border-radius: 10px;
}
</style>