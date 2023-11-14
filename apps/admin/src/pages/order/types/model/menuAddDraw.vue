<script lang="ts" setup>
import {ref, defineExpose, reactive, unref} from 'vue'
import {useForm} from "@vben/vbencomponents";
import {menuAddSchema} from "./schemas";
import {order_type} from "@/apis/order";
import {notice} from '@vben/vbencomponents'
import {minify} from 'terser'

const menuDrawerFlag = ref(false)
const DrawerData = reactive({
  title: '新增类型'
})
let submitApi = null

function open(prop) {
  prop = prop || {}
  const {title, data, api} = prop
  submitApi = api
  model.value = {
    money: 1,
    level: '1',
    name: 'x',
    note: 'x',
    script: ` return function(body){
        const filter=function (str){
            return str.replace(/\\s/g, "");
        }
        const emailReg=function (str){
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(str)
        }
        const pwd=function (str){
            return /^[a-zA-Z0-9@!#$%^&*?]{6,16}$/.test(str)
        }
        function handle(str){
            const arr=filter(str).split("----")
            if (arr.length!==2) throw new Error("数据列数异常")
            if (!emailReg(arr[0]))  throw new Error("账号格式错误")
            if (!pwd(arr[1]))  throw new Error("密码格式错误")
            return true
        }
        const arr=body.split("\\n");
        if(arr.length>1){
            const res= {
                success:[],
                error:[],
                count:arr.length
            }
            for (let i = 0; i < arr.length; i++) {
                try{
                    handle(arr[i])
                    res.success.push(arr[i])
                }catch (e){
                    res.error.push(e.message)
                }
            }
            return res
        }
    };`,
    ...data,
  }
  model.value.level = model.value.level.toString()
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
const model = ref<order_type>({level: 1, money: 0, name: "", note: "", script: ""})

const loading = ref(true)

function ScriptCheck(script: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const output = await minify(script, {
        compress: {
          unsafe: true,
          sequences: false,
          unsafe_Function: true
        },
        parse: {
          bare_returns: true,
        }
      })
      const Func = new Function(output.code)()
      if (typeof Func != "function") throw new Error("脚本返回值有误不是函数! " + typeof Func)
      resolve(output.code)
    } catch (e) {
      notice.error({content: "脚本有误", meta: e.message, duration: 1500})
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
  submitFunc: (from) => {
    loading.value = true
    from?.validate().then(async () => {
      const value = unref(model.value)
      value.script = await ScriptCheck(value.script);
      value.level = Number(value.level)
      console.log(value)
      submitApi && await submitApi(value) == null || alert("未接受到提交函数")
      emit('success')
      setTimeout(() => notice.success({content: "提交成功!", duration: 1500}), 500)
    }).finally(() => loading.value = false)
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
