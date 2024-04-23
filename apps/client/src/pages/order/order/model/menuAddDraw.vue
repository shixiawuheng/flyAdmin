<script lang="ts" setup>
import {ref, defineExpose, reactive, watch, nextTick, computed} from 'vue'
import {order_type, ScriptResult, api_create} from "@/apis/order";
import {msg, notice} from '@vben/vbencomponents'
import {types} from '../schemas'
import successList from '@/pages/common/successList.vue'
import errorList from '@/pages/common/errorList.vue'
import {useUserStore} from "@/store/user";

const UserStore = useUserStore()
const Info = UserStore.getUserInfo
const WorkerJs = import.meta.env.VITE_PUBLIC_PATH + "/worker.js"
const menuDrawerFlag = ref(false)
const DrawerData = reactive({
  title: '新增类型',
})
let IndexType: order_type | undefined
const step = ref<"load" | "success" | "error">("load")

function open(prop) {
  prop = prop || {}
  const {title, data} = prop
  model.value = {
    type: undefined,
    body: "",
    ...data,
  }
  DrawerData.title = title || "创建订单"
  step.value = "load"
  return (menuDrawerFlag.value = true)
}

function close() {
  model.value.type = void 0
  return (menuDrawerFlag.value = false)
}

const emit = defineEmits(["success"])
defineExpose({
  open,
  close,
})
const model = ref({
  type: undefined,
  note: "",
  body: "",
})
const DropLoading = ref(false)
const loading = ref(false)
const success = ref<string[]>([])
const error = ref<string[]>([])
watch(() => step.value, (value => {
  switch (value) {
    case "load":
      return DrawerData.title = "创建订单"
    case "success":
      return DrawerData.title = "检查数据"
    case "error":
      return DrawerData.title = "发生错误!!!"
    default:
      return DrawerData.title = "未知页"
  }
}))

function ScriptCheck(Script: string, Body: string): Promise<ScriptResult> {
  return new Promise((resolve, reject) => {
    try {
      const worker = new Worker(WorkerJs);
      worker.postMessage({Script, Body})
      worker.onmessage = (result) => {
        if (result.data) {
          resolve(result.data)
        } else {
          reject(new Error("脚本解析错误!请检查格式!"))
        }
        worker.terminate();
      }
    } catch (e) {
      reject(e)
    }
  })
}

function handleTypeOptions() {
  return new Promise((resolve, _) => {
    const options = types.map(item => {
      return {
        label: item.name,
        value: item.id,
      }
    })
    resolve({options})
  })
}

watch(() => model.value.type, (value) => {
  if (value == void 0) return
  const obj = types.find((item) => {
    return item.id == value
  })
  model.value.note = obj?.note || ""
  IndexType = obj
})

function ShowErr() {
  step.value = "error"
}

function ShowSuccess() {
  step.value = "success"
}

function handlePost() {
  const type = IndexType?.id
  if (!type) {
    msg.error("订单类型异常");
    close();
    return;
  }
  const body = success.value.join("\n")
  if (body.length < 1) {
    msg.warning("订单内容异常!")
    return;
  }
  loading.value = true
  api_create(type, body).then((order) => {
    if (!(Info && IndexType)) return;
    Info.money -= order.count * GetPrice()
    UserStore.setUserInfo(Info)
    emit("success", order)
  }).finally(() => loading.value = false)
}

function handleSubmit() {
  if (!model.value.type || !IndexType) {
    notice.error({
      content: '提交错误!',
      meta: '类型不可为空',
      duration: 2500,
      keepAliveOnHover: true
    })
    return
  }
  loading.value = true
  ScriptCheck(IndexType.script, model.value.body)
      .then(res => {
        success.value = res.success
        error.value = res.error
        if (res.error.length != 0) {
          return ShowErr()
        }
        ShowSuccess()
      })
      .catch(e => notice.error({
        content: '提交错误!',
        meta: e.message,
        duration: 2500,
        keepAliveOnHover: true
      })).finally(() => loading.value = false)
}

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  if (e.dataTransfer.files.length === 0) return
  const files = e.dataTransfer.files;
  const reader = new FileReader();
  DropLoading.value = true
  reader.onload = function (e) {
    // if (!e.target) return
    model.value.body = e.target?.result as string
    DropLoading.value = false
  };
  nextTick(() => reader.readAsText(files[0]))
}

function handleDropEnter(e) {
  e.stopPropagation();
  e.preventDefault();
}

const GetPrice = () => {
  return Math.ceil((IndexType?.money || 0) * (Info?.rebate || 0))
}

</script>
<template>
  <VbenDrawer
      v-model:show="menuDrawerFlag" :mask-closable="true" :width="800"
      placement="right">
    <VbenDrawerContent closable>
      <template #header>{{ DrawerData.title }}</template>
      <vben-form v-if="step==='load'" v-model:model="model">
        <vben-form-item class="enter-x" inline label="类型">
          <vben-select
              v-model:value="model.type"
              :api="handleTypeOptions"
          />
        </vben-form-item>
        <vben-form-item v-show="model.type" :show-label="false" class="enter-x" inline>
          <vben-alert type="warning">
            <pre style="margin-top: -2px;margin-bottom: 0">单价：{{ GetPrice() }} ==>{{ model.note }}</pre>
          </vben-alert>
        </vben-form-item>
        <vben-form-item
            class="enter-x" inline
            label="提交数据"
            @dragenter="handleDropEnter"
            @drop="handleDrop">
          <vben-input
              v-model:value="model.body"
              :loading="DropLoading"
              placeholder="你可以选择复制粘贴过来 或者 将文件拖动到此处"
              type="textarea"
          />
        </vben-form-item>
        <vben-form-item class="enter-x" inline>
          <vben-button
              :loading="loading"
              block
              size="large"
              type="primary"
              @click="handleSubmit"
          >
            {{ loading ? "处理中" : "下一步" }}
          </vben-button>
        </vben-form-item>
      </vben-form>
      <successList
          v-if="step==='success'"
          :data="success"
          :loading="loading"
          :money="Info?.money"
          :price="GetPrice()"
          @success="handlePost"/>
      <errorList v-if="step==='error'" :data="error" :loading="loading" @success="ShowSuccess"/>
    </VbenDrawerContent>
  </VbenDrawer>
</template>
