<script lang="ts" setup>
import {ref} from "vue";
import CreateDraw from "./model/CreateDraw.vue";
import CreateSuccessModal from "./model/CreateSuccessModal.vue";
import {UserColumns} from "./schemas";
import {useTable} from "@vben/vbencomponents";

const Height = window.innerHeight - 165
const CreateRef = ref()
const CreateSuccessRef = ref()
const [registerTable, {reload}] = useTable({
      columnConfig: {resizable: false},
      columns: UserColumns,
    },
)

function CreateSuccess(user) {
  CreateRef.value.close()
  CreateSuccessRef.value?.open(user)
}

function F5() {

}
</script>
<template>
  <div>
    <vben-table
        @register="registerTable"
    >
      <template #toolbar>
        <div class="pb-2">
          <vben-button class="action" @click="F5"/>
          <vben-button class="action" type="primary" @click="CreateRef?.open">添加用户</vben-button>
        </div>
      </template>
      <template #action="{row}">
        <VbenButton secondary size="tiny" strong type="primary" @click="handleEdit(row)">
          编辑
        </VbenButton>
      </template>
      <template #empty>
        <span style="color: red;">
          <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif"/>
          <p>  暂无数据！</p>
        </span>
      </template>
      <!--      <template v-for="item in Object.keys($slots)" :key="item" #[item]="data">-->
      <!--        <slot :name="item" v-bind="data || {}"></slot>-->
      <!--      </template>-->
    </vben-table>
    <CreateDraw ref="CreateRef" @success="CreateSuccess"/>
    <CreateSuccessModal ref="CreateSuccessRef"/>
  </div>
</template>


<style scoped>
.action {
  display: flex;
  margin-right: 10px;
}
</style>