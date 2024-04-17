<script lang="ts" setup>
import {ref, defineExpose, reactive, unref} from 'vue'
import {useForm} from "@vben/vbencomponents";
import {MakeSchemas} from "./schemas";
import {api_make, MakeParams, Key} from "@/apis/key";


const menuDrawerFlag = ref(false)
const DrawerData = reactive({
  title: '生成充值卡'
})


function open() {
  return (menuDrawerFlag.value = true)
}

function close() {
  return (menuDrawerFlag.value = false)
}

const emit = defineEmits(["success"])
defineExpose({
  open,
  close,
})
const model = ref<MakeParams>({count: 1, money: 10, note: ""})

const loading = ref(true)

const [menuFormReg] = useForm({
  actions: true,
  schemas: MakeSchemas,
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
  api_make(unref(model.value)).then((val: Key[]) => {
    // const keys = val.map(v => v.key)
    // console.log(keys)
    // close()
    emit("success", val)
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
