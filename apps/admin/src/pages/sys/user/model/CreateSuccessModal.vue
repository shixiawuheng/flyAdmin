<script lang="ts" setup>
import {ref} from "vue";
import {writeTextToClipboard} from '@vben/hooks/src/web/useCopyToClipboard'
import {msg} from '@vben/vbencomponents'

const Title = ref("创建成功")
const Body = ref({})
const Show = ref(false)

function open(user) {
  Body.value = `创建用户成功 用户名: ${user.account} 密码: 123456789 起飞币: ${user.money}`
  Show.value = true
}

function close() {
  console.log("关闭")
  Show.value = false
}


defineExpose({
  open,
  close
})
</script>

<template>
  <vben-modal
      v-model:show="Show"
      :title="Title"
      preset="dialog"
  >
    <div class="action">{{ Body }}</div>

  </vben-modal>
</template>

<style scoped>
.action {
  width: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中子元素 */
}
</style>