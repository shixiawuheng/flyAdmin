<script lang="ts" setup>
import MakeDraw from "./model/MakeDraw.vue";
import {ref} from "vue";
import MakeSuccessModal from "./model/MakeSuccessModal.vue";
// import {notice} from "@vben/vbencomponents";

const MakeRef = ref()
const MakeSuccessRef = ref()

function MakeSuccess(val) {
  MakeRef.value?.close()
  const keys = val.map(v => v.key)
  MakeSuccessRef.value?.open(keys)
  // console.log(keys)
  // notice.success(`成功生成${keys.length}张充值卡`)

}
</script>
<template>
  <div>
    <MakeDraw ref="MakeRef" @success="MakeSuccess"/>
    <MakeSuccessModal ref="MakeSuccessRef"/>
    <vben-button type="primary" @click="MakeRef?.open">生 成 充 值 卡</vben-button>
  </div>

</template>


<style scoped>

</style>