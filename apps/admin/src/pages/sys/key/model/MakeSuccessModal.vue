<script lang="ts" setup>
import {ref} from "vue";
import {writeTextToClipboard} from '@vben/hooks/src/web/useCopyToClipboard'
import {msg} from '@vben/vbencomponents'

const Title = ref("生成成功")
const Body = ref("")
const Show = ref(false)
let Data = []

function open(keys) {
  keys = keys || []
  Data = keys
  console.log(keys)
  Body.value = `成 功 生 成 ${keys.length} 张 充 值 卡`
  Show.value = true
}

function close() {
  Show.value = false
}

function Copy() {
  writeTextToClipboard(Data.join("\r\n")).then(() => {
    msg.success("复制成功")
    close()
  }).catch(e => {
    msg.info("复制不一定成功!请确认后关闭窗口!")
  })
}

function Save() {
  const blob = new Blob([Data.join("\r\n")], {type: 'text/plain'})
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'recharge.txt'
  link.click()
  URL.revokeObjectURL(url)
  close()
}

const check = ref(false)

function Check() {

}

defineExpose({
  open,
  close
})
</script>

<template>
  <vben-modal
      v-model:show="Show"
      :close-on-esc="false"
      :mask-closable="false"
      :title="Title"
      preset="dialog"
  >
    <div v-if="!check" class="action">{{ Body }}</div>
    <vben-input v-if="check" :value="Data.join('\\r\\n')" type="textarea"/>
    <template #action>
      <div class="action">
        <vben-button type="primary" @click="Copy">复 制 到 剪 贴 板</vben-button>
        <div style="margin: 0 60px"></div>
        <vben-button type="primary" @click="check=true">查 看</vben-button>
        <div style="margin: 0 60px"></div>
        <vben-button type="primary" @click="Save">保 存 到 文 件</vben-button>
      </div>
    </template>
  </vben-modal>
</template>

<style scoped>
.action {
  width: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中子元素 */
}
</style>