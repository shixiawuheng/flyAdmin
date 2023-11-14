<script lang="ts" setup>
import {ref, defineExpose} from 'vue'
import {useForm} from "@vben/vbencomponents";
import {menuAddSchema} from "./schemas";

const menuDrawerFlag = ref(false)

function open() {
  return (menuDrawerFlag.value = true)
}

defineExpose({
  open,
})

const [menuFormReg, {getFieldValue, validate}] = useForm({

  actions: true,
  schemas: menuAddSchema,
  actionsProps: {
    span: 24,
    submitText: '新增',
    cancelText: '取消'
  }

})
const model = ref({})
</script>
<template>
  <VbenDrawer v-model:show="menuDrawerFlag" :mask-closable="false" :width="500" placement="right">
    <VbenDrawerContent closable>
      <template #header>新增菜单</template>
      <VbenForm ref="menuFormRef" v-model:model="model" class="w-full" @register="menuFormReg"/>
    </VbenDrawerContent>
  </VbenDrawer>
</template>

<style lang="less" scoped></style>
