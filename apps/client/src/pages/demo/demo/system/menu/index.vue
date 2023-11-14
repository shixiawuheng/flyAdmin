<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useForm, useTable} from '@vben/vbencomponents'
import {formSchema, menuColumns} from './schemas'

import MenuAddDraw from './modules/menuAddDraw.vue'
import {getMenuList} from '#/apis/sys/menu'

const formRef = ref(null)
const [formReg, {getFieldValue, validate}] = useForm({
  actions: true,
  schemas: formSchema,
  actionsProps: {
    span: 8,
    submitText: '查询',
  },
})
const formModel = ref({})
const menuData: any = reactive({
  table: {
    items: [],
    total: 0,
  },
})

const menuAddDrawRef: any = ref(null)

function handleMenuAddDraw() {
  return menuAddDrawRef.value.open()
}

getMenuList().then((res) => {
  console.log('res', res)
  menuData.table.items = res
})

function handleToggleTree() {
  return null
}
</script>
<template>
  <VbenGrid :cols="12" :x-gap="8" :y-gap="12" style="padding: 20px">
    <VbenGridItem :span="12">
      <VbenCard :bordered="false" embedded>
        <VbenForm
            ref="formRef"
            v-model:model="formModel"
            class="w-full"
            @register="formReg"
        />
      </VbenCard>
    </VbenGridItem>
    <VbenGridItem :span="12">
      <VbenTable
          ref="menuTreeTable"
          :columns="menuColumns"
          :data="menuData.table.items"
          :options="{ pagination: true, border: 'inner'}"
          :row-config="{ isHover: true }"
          :tree-config="{
          transform: true,
          rowField: 'id',
          parentField: 'parentId',
          iconOpen: 'vxe-icon-square-minus',
          iconClose: 'vxe-icon-square-plus',
        }"
          @toggle-tree-expand="handleToggleTree"
      >
        <template #toolbar>
          <div class="pb-2">
            <VbenButton type="info" @click="handleMenuAddDraw"
            >新增菜单
            </VbenButton
            >
          </div>
        </template>
      </VbenTable>
    </VbenGridItem>
  </VbenGrid>
  <MenuAddDraw ref="menuAddDrawRef"/>
</template>

<style lang="less" scoped></style>
