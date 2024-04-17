<script lang="ts" setup>
import {ref} from 'vue'
import {api_list, order, order_status} from '@/apis/order'
import {baseColumns, status} from './schemas'
import MenuAddDraw from './model/menuAddDraw.vue'
import Body from './model/body.vue'
import {msg, useTable} from "@vben/vbencomponents";
import MenuMakeDraw from "./model/menuMakeDraw.vue";

const tableRef = ref()
const data = ref<order[]>([])
const loading = ref(false)

const [TableRegister] = useTable({
  api: api_list,
  columns: baseColumns,
  pagerConfig: {enabled: true},
  // mouseConfig: {selected: true, area: true, extension: true},
  border: 'full',
  rowConfig: {isHover: true},
  title: '订单管理（订单只会保留七天请及时处理）',
  showOverflow: true,
  scrollY: {enabled: true, gt: 50}
})
const menuAddDrawRef = ref()
const menuMakeDrawRef = ref()
const BodyRef = ref()

function handleCreate() {
  menuAddDrawRef.value.open()
}

function handleShowBody(row: order) {
  if (!(row.status == order_status.OrderError || row.status == order_status.OrderOk)) {
    msg.warning(`当前状态[${status[row.status]}]不允许查看内容`)
    return
  }
  BodyRef.value.open(row.id)
}

async function HandleCreateSuccess(order) {
  data.value.push(order)
  menuAddDrawRef.value.close()
  msg.success("创建订单成功")
}

async function HandleMakeSuccess(arr) {
  arr.forEach(item => {
    data.value.push(item)
  })
  menuMakeDrawRef.value.close()
}

function handleMake() {
  menuMakeDrawRef.value.open()
}

</script>
<template>
  <div style="height: 100%">
    <VbenGrid :cols="12" :x-gap="8" :y-gap="12" style="padding: 20px">
      <!--    <VbenGridItem :span="12">-->
      <!--      <VbenCard :bordered="false" embedded>-->
      <!--        <VbenForm-->
      <!--            ref="formRef"-->
      <!--            v-model:model="formModel"-->
      <!--            class="w-full"-->
      <!--            @register="formReg"-->
      <!--        />-->
      <!--      </VbenCard>-->
      <!--    </VbenGridItem>-->
      <VbenGridItem :span="12">
        <VbenTable
            ref="tableRef"
            :loading="loading"
            height="1000px"
            @register="TableRegister"
        >
          <template #toolbar>
            <div class="pb-2">
              <VbenButton class="ml-2" type="primary" @click="handleCreate">
                创建订单
              </VbenButton>
              <VbenButton class="ml-2" type="primary" @click="handleMake">
                生成外部订单
              </VbenButton>
            </div>
          </template>
          <template #action="{row}">
            <VbenButton secondary size="tiny" strong type="primary" @click="handleShowBody(row)">
              查看结果
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
        </VbenTable>
      </VbenGridItem>

    </VbenGrid>
    <MenuAddDraw ref="menuAddDrawRef" @success="HandleCreateSuccess"/>
    <MenuMakeDraw ref="menuMakeDrawRef" @success="HandleMakeSuccess"/>
    <Body ref="BodyRef"/>
  </div>
</template>
