<template>
  <vben-modal v-model:show="show" preset="card" title="充值页">
    <vben-Input v-model:value="key" :status="status" placeholder="请输入充值码"/>
    <template #footer>
      <div style="text-align: center">
        <vben-button :loading="loading" type="success" @click="handleRecharge">
          充 值
        </vben-button>
      </div>

    </template>
  </vben-modal>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {msg} from "@vben/vbencomponents"
import {api_recharge} from "@/apis/home"
import {useUserStore} from "@/store/user";

const loading = ref(false)
const key = ref("")
const show = ref(false)
const status = ref("")

function handleRecharge() {
  if (!key.value) {
    status.value = "error"
    msg.error("充值码不可为空")
    return
  }
  loading.value = true
  api_recharge(key.value).then((res) => {
    useUserStore().setUserInfo(res)
    show.value = false
    msg.success("充值成功")
  }).finally(() => loading.value = false)
}

function open(props) {
  key.value = ""
  return show.value = true
}

defineExpose({
  open,
  close: () => show.value = false
})
</script>

<style scoped>

</style>