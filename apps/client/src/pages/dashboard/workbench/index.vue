<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue'
import Notice from './notice/notice.vue'
import Weather from './weather/index.vue'
import Info from './info/index.vue'


</script>
<template>
  <div class="grid grid-cols-24 grid-rows-24 w-full h-screen">
    <Weather/>
    <Notice/>
    <Info/>

    <!-- chart start -->
    <!--    "row-start-8 row-span-13 col-start-17 col-span-8 mr-4 mt-4 rounded-md border border-solid border-gray-200"-->

    <!-- chart end -->

    <!-- Latest News start -->
    <!--    card row-start-7 row-span-4 col-start-7 col-span-5 mr-4 bg-black/25 rounded-md flex flex-col justify-around items-center hover:shadow-xl duration-200 cursor-default-->

    <!-- Latest News end -->

    <!-- member charts start -->
    <!--    <div-->
    <!--        class="row-start-16 row-span-8 col-start-17 col-span-8 mr-4 mt-4 border border-solid border-gray-200 rounded-md"-->
    <!--    >-->
    <!--      <v-chart ref="radarChart" :option="memberOption" autoresize/>-->
    <!--    </div>-->
  </div>
</template>

<style lang="less" scoped>
.card {
  backdrop-filter: blur(16px);
}

.active {
  visibility: visible;
}

</style>