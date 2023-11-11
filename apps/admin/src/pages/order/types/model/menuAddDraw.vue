<script lang="ts" setup>
import {ref, defineExpose, reactive, unref} from 'vue'
import {useForm} from "@vben/vbencomponents";
import {menuAddSchema} from "./schemas";
import {order_type} from "@/apis/order";
import {notice} from '@vben/vbencomponents'

const menuDrawerFlag = ref(false)
const DrawerData = reactive({
  title: '新增类型'
})
let submitApi = null

function open(prop) {
  prop = prop || {}
  const {title, data, api} = prop
  submitApi = api
  // model.value = data || {}
  DrawerData.title = title || "未知"
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
const model = ref<order_type>({
  money: 1,
  level: 1,
  name: '',
  note: '',
  script: `return function (body) {
  let arr = body.split("\\n");
  if (arr.length == 2) return arr.length
}`
})

const loading = ref(true)

function ScriptCheck(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      console.log(script)
      const Func = new Function(script)()
      if (typeof Func != "function") {
        throw new Error("脚本返回值有误不是函数! " + typeof Func)
      }
      resolve(script)
    } catch (e) {
      notice.error({content: "脚本有误", meta: e})
      reject(e)
    }
  })
}

const [menuFormReg] = useForm({
  actions: true,
  schemas: menuAddSchema,
  actionsProps: {
    span: 24,
    submitText: '确定',
  },
  submitFunc: async (from) => {
    await from?.validate()
    const value = unref(model.value)
    value.script = await ScriptCheck(value.script);
    value.level = Number(value.level)
    console.log(value)
    submitApi && await submitApi(value) == null || alert("未接受到提交函数")
    emit('success')
    notice.success("提交成功!")
  },

})

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
