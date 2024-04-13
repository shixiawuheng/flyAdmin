<script lang="ts" setup>
import {ref, defineExpose, nextTick} from 'vue'
import {api_getBody} from "@/apis/order";
import {msg, notice} from '@vben/vbencomponents'
import {writeTextToClipboard} from "@vben/hooks";


const menuDrawerFlag = ref(false)

const Body = ref([])

function open(order_id: string) {
  api_getBody(order_id).then((res: string) => {
    Body.value = res.split("\n")
  })
  return (menuDrawerFlag.value = true)
}

function close() {
  return (menuDrawerFlag.value = false)
}

defineExpose({
  open,
  close,
})

function Copy(text) {
  writeTextToClipboard(text)
  msg.success('复制成功');
}

</script>
<template>
  <VbenDrawer
      v-model:show="menuDrawerFlag" :mask-closable="true" placement="right"
      width="80%">
    <VbenDrawerContent closable>
      <template #header>查 看 结 果</template>
      <vxe-list
          :auto-resize="true"
          :data="Body"
          :scroll-y="{enabled: true, gt: 60, sItem: '.my-tr'}"
          height="100%"
      >
        <template #default="{ items }">
          <div
              v-for="item in items" :key="item" class="my-tr item"
              @click="Copy(item)">
            <vben-ellipsis>
              {{ item }}
            </vben-ellipsis>
          </div>
        </template>
      </vxe-list>
    </VbenDrawerContent>
  </VbenDrawer>
</template>
