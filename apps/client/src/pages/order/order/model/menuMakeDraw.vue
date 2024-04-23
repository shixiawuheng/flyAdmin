<script lang="ts" setup>
import {ref, defineExpose, reactive, watch, computed} from 'vue'
import {order_type, api_make} from "@/apis/order";
import {notice} from '@vben/vbencomponents'
import {types} from '../schemas'
import {useUserStore} from "@/store/user";

const UserStore = useUserStore()
const Info = UserStore.getUserInfo
const menuDrawerFlag = ref(false)
const DrawerData = reactive({
  title: '创建外部链接',
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
  DrawerData.title = title || "创建外部链接"
  step.value = "load"
  return (menuDrawerFlag.value = true)
}

function close() {
  model.value.type = void 0
  return (menuDrawerFlag.value = false)
}

const MakeData = ref("")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["success"])
defineExpose({
  open,
  close,
})
const model = ref({
  type: undefined,
  note: "",
  count: 0,
})
const DropLoading = ref(false)
const loading = ref(false)

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

const GetPrice = () => {
  return Math.ceil((IndexType?.money || 0) * (Info?.rebate || 0))
}
const BeMoney = ref(0)
const BeType = ref<"success" | "warning">("success")
watch(() => model.value.type, (value) => {
  if (value == void 0) return
  const obj = types.find((item) => {
    return item.id == value
  })
  model.value.note = obj?.note || ""
  IndexType = obj
})
watch(() => model.value.count, (value) => {
  if (value == void 0) return
  if (IndexType) {
    BeMoney.value = GetPrice() * value
    if (BeMoney.value > (Info?.money || 0)) {
      BeType.value = "warning"
    } else {
      BeType.value = "success"
    }
  }
  model.value.count = Math.ceil(value)
})

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
  api_make({type: model.value.type, count: model.value.count}).then((res: string[]) => {
    MakeData.value = res.join("\n")
    step.value = "success"
    if (Info) {
      // Info.money -= BeMoney.value
      // UserStore.setUserInfo(Info)
    }
  }).finally(() => loading.value = false)
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
            <pre style="margin-top: -2px;margin-bottom: 0">单价: {{ GetPrice() }} ==> {{ model.note }}</pre>
          </vben-alert>
        </vben-form-item>
        <vben-form-item
            class="enter-x" inline
            label="生成数量">
          <vben-input-number
              v-model:value="model.count"
              :loading="DropLoading"
              :min="1"
              placeholder="请输入生成数量"
          />

        </vben-form-item>
        <vben-form-item v-show="model.type && BeMoney>0" :show-label="false" class="enter-x" inline>
          <vben-alert :type="BeType">
            <pre style="margin-top: -2px;margin-bottom: 0">当前起飞币: {{ Info?.money }} ===> 预计需要:{{
                BeMoney
              }}</pre>
          </vben-alert>
        </vben-form-item>
        <vben-form-item class="enter-x" inline>
          <vben-button
              :loading="loading"
              block
              size="large"
              type="primary"
              @click="handleSubmit"
          >
            生 成
          </vben-button>
        </vben-form-item>
      </vben-form>
      <vben-input v-if="step==='success'" :value="MakeData" class="result-success" type="textarea"/>
    </VbenDrawerContent>
  </VbenDrawer>
</template>

<style scoped>
.result-success {
  width: 100%;
  height: 100%;

}
</style>