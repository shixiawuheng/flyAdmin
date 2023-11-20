<template>
  <div
      :class="`border-green-400 ml-4 mr-4 p-4 col-start-1 col-span-24 row-start-2 row-span-6 ${isDark ? 'bg-gray':'bg-green-100'} rounded-md`"
      style="border: 1px">
    <div class="grid grid-cols-24 grid-rows-24 w-full h-full">
      <div class="col-start-1 col-span-4 row-start-1 row-span-23 flex justify-center items-center">
        <img
            alt="avatar.png"
            class="drop-shadow-xl"
            height="150"
            src="/logo.svg"
            width="200"
        />
      </div>
      <div
          class="col-start-5 col-span-7 row-start-1 row-span-20 flex flex-col items-start justify-around text-white"
      >
        <div class="flex">
          <div
              class="w-14 h-17 bg-green-400 rounded-md shadow-xl flex flex-col justify-around items-center cursor-pointer"
          >
            <div class="text-xl">{{ BaseData.month }}</div>
            <div class="text-3xl">{{ BaseData.day }}</div>
          </div>
          <div class="weather h-17 ml-2 flex flex-col justify-between">
            <div class="font-bold flex">
              <iframe
                  v-if="IsWeather"
                  allowtransparency="true"
                  frameborder="0"
                  height="20"
                  scrolling="no"
                  src="https://tianqiapi.com/api.php?style=tx&skin=pitaya"
                  style="min-width: 350px;margin-top: 8px"
                  width="100%"
              ></iframe>
            </div>
            <div class="text-slate-500 font-bold text-base/7 italic whitespace-nowrap">
              工欲善其事，必先利其器
            </div>
          </div>
        </div>
        <div
            class="text-2xl font-bold"
            style="color:#a88f2c"
        >{{ dateState }}，{{
            info.name == "新用户" ? "尊贵的起飞用户" : "新用户"
          }}
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useUserStore} from "@/store/user";
import {useAppTheme} from '@vben/hooks'

const {isDark} = useAppTheme()
const IsWeather = true
computed(() => import.meta.env.MODE != 'development')
const info = useUserStore().getUserInfo
const dateState = computed(() => {
  let date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 12) {
    return '早上好';
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return '中午好';
  }
  return '晚上好';
});
const BaseData = ref({
  month: new Date().toLocaleString('en', {month: 'short'}),
  day: new Date().getDate(),
})
</script>

<style scoped>

</style>