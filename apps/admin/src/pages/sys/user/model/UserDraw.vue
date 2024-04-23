<script lang="ts" setup>
import {ref, defineExpose, unref} from 'vue'
import {useForm} from "@vben/vbencomponents";
import {UserData, CreateParams} from "@/apis/user";


const menuDrawerFlag = ref(false)
const DrawerData = ref({
  title: '添加用户',
  model: {},
  schemas: [],
  submit: async function (model) {
    return close()
  }
})

function open(prop) {
  DrawerData.value = prop || DrawerData.value
  model.value = DrawerData.value.model || {}
  setTimeout(() => updateSchemas(unref(DrawerData).schemas))
  return (menuDrawerFlag.value = true)
}

function close() {
  return (menuDrawerFlag.value = false)
}

defineExpose({
  open,
  close,
})
const model = ref<CreateParams>(unref(DrawerData).model)

const loading = ref(true)

const [menuFormReg, {updateSchemas}] = useForm({
  actions: true,
  schemas: [],
  actionsProps: {
    span: 24,
    submitText: '确定',
  },
  submitFunc: (from) => {
    loading.value = true
    from?.validate().then(submit).finally(() => loading.value = false)
  },

})

function submit() {
  unref(DrawerData).submit(unref(model.value)).then((val: UserData) => {
    unref(DrawerData).success(val)
  }).finally(() => loading.value = false)
}
</script>
<template>
  <VbenDrawer
      v-model:show="menuDrawerFlag" :loading="loading" :mask-closable="true" :width="500"
      placement="right">
    <VbenDrawerContent closable>
      <template #header>{{ DrawerData.title }}</template>
      <VbenForm ref="menuFormRef" v-model:model="model" class="w-full" @register="menuFormReg"/>
    </VbenDrawerContent>
  </VbenDrawer>
</template>
<style lang="less" scoped></style>
