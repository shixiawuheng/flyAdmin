<template>
  <div
      class="row-start-8 row-span-13 col-start-17 col-span-8 mr-4 mt-4 rounded-md border border-solid border-gray-200">
    <div class="w-full h-12 border-b-1 border-b-solid border-gray-200 flex items-center">
      <span class="ml-4 text-lg text-gray-500 font-semibold cursor-default">公告</span>
    </div>
    <div class="w-full h-full flex flex-col px-4 overflow-auto">
      <vben-empty v-if="Notice.length===0" description="暂无公告" style="margin-top: 80px"/>
      <div
          v-for="(items, index) in Notice"
          v-else
          :key="index"
          class="w-full h-1/8 border-1 border-solid my-2 border-gray-200 rounded-md flex items-center hover:border-green-600 duration-150 cursor-pointer"
          @click="handleOpenNotice(items)"
      >
        <div class="flex flex-col ml-2">
          <span>{{ items.title }}</span>
          <span class="text-xs text-gray-500">{{ dayjs(items.time * 1000).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </div>
      </div>
    </div>
    <Content ref="ContentRef" @close="handleContentClose"/>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import {api_notice, Notice} from '@/apis/home'
import {ref} from "vue";
import Content from './show.vue'

const data = new Set(JSON.parse(localStorage.getItem("notice") || "[]"))

function handleContentClose({id}) {
  data.add(id)
  localStorage.setItem("notice", JSON.stringify(Array.from(data)))
}

const ContentRef = ref()
const Notice = ref([])
const handleOpenNotice = function (item: Notice) {
  ContentRef.value.open(item)
}

api_notice().then((val) => {
  Notice.value = val
})
</script>
