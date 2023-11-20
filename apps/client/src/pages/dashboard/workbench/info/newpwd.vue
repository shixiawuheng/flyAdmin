<template>
  <vben-modal v-model:show="show" preset="card" title="修 改 密 码">
    <vben-form-item :show-label="false">
      <vben-Input v-model:value="model.old" placeholder="请输入旧密码" type="password"/>
    </vben-form-item>
    <vben-form-item :show-label="false">
      <vben-Input v-model:value="model.new" placeholder="请输入新密码"/>
    </vben-form-item>
    <div style="text-align: center">
      <vben-button :loading="loading" type="success" @click="handleNewPwd">
        修 改 密 码
      </vben-button>
    </div>
  </vben-modal>
</template>

<script lang="ts" setup>
import {ref, unref} from 'vue'
import {api_newpwd} from '@/apis/home'
import {msg} from "@vben/vbencomponents"
import {useUserStore} from "@/store/user";
import md5 from 'crypto-js/md5';

function handleNewPwd() {
  const data = unref(model)
  if (data.old == "" || data.new == "") {
    msg.error("新旧密码不可为空")
    return
  }
  loading.value = true
  api_newpwd({old: md5(data.old).toString(), new: md5(data.new).toString()}).then(() => {
    msg.success("修改成功! 请重新登录!")
    useUserStore().logout()
  }).finally(() => loading.value = false)
}

const model = ref({
  old: "",
  new: "",
})
const loading = ref(false)
const show = ref(false)


function open(props) {
  return show.value = true
}

defineExpose({
  open,
  close: () => show.value = false
})
</script>

<style scoped>

</style>