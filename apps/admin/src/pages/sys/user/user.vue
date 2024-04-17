<script lang="ts" setup>
import {ref} from "vue";
import CreateDraw from "./model/CreateDraw.vue";
import CreateSuccessModal from "./model/CreateSuccessModal.vue";

const CreateRef = ref()
const CreateSuccessRef = ref()

function CreateSuccess(user) {
  CreateRef.value.close()
  CreateSuccessRef.value?.open(user)
}
</script>
<template>
  <div>
    <vben-button type="primary" @click="CreateRef?.open">添加用户</vben-button>
    <CreateDraw ref="CreateRef" @success="CreateSuccess"/>
    <CreateSuccessModal ref="CreateSuccessRef"/>
  </div>
</template>


<style scoped>

</style>