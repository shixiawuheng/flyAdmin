<template>
  <vben-modal
      v-model:show="show"
      @after-leave="$emit('close',BaseData)"
  >
    <vben-card
        :embedded="true"
        :title="`📖 ${BaseData.title}`"
        content-style="padding-bottom: 5px;"
        footer-style="padding: 10px;"
        header-style="border-bottom: 1px solid #494747;padding: 10px;text-align: center;margin-bottom: 10px;padding-bottom: 5px"

    >
      <pre>{{ BaseData.content }}</pre>
      <template #footer>
        <div style="text-align: center;">
          <vben-button type="success" @click="close">我知道了</vben-button>
        </div>
      </template>
    </vben-card>
  </vben-modal>
</template>

<script lang="ts" setup>
import {defineExpose, ref} from 'vue'
import {Notice} from '@/apis/home'

// const emit = defineEmits(['close'])

function open(props: Notice | undefined) {
  BaseData.value = props || {
    id: "",
    time: Date.now(),
    title: "测试标题",
    content: "测试内容",
  }
  console.log(props)
  return (show.value = true)
}

function close() {
  return show.value = false
}

defineExpose({
  open,
  close,
})
const show = ref(false)
const BaseData = ref({
  title: "测试标题",
  content: "测试内容",
  time: Date.now() / 1000
})
</script>

