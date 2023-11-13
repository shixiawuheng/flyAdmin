<script lang="ts" setup>
import {ref} from 'vue'
import {api_types, order} from '@/apis/order'
import {baseColumns} from './schemas'
import MenuAddDraw from './model/menuAddDraw.vue'
import {msg} from "@vben/vbencomponents";


let loading = ref(false)
const reload = () => {
  return new Promise((resolve, reject) => {
    loading.value = true
    api_types().then(res => {
      data.value = res
      resolve()
    }).catch(reject).finally(() => loading.value = false)
  })
}
reload()
const data = ref([])
const Height = window.innerHeight - 165
const menuAddDrawRef = ref()

function handleCreate() {
  menuAddDrawRef.value.open()
}

function handleShowBody(row: order) {
  if (row.status != 3) {
    msg.warning("当前状态不允许查看内容")
    return
  }
  console.log()
}

async function HandleSuccess() {
  console.log("成功")
  await reload()
  menuAddDrawRef.value.close()
}

</script>
<template>
  <div style="max-height: calc(100vh - 100px); background-color: inherit;">
    <VbenTable
        :column-config="{ resizable: false }"
        :columns="baseColumns"
        :data="data"
        :maxHeight="Height"
        :options="{title: '订单管理', pagination: false, border: 'full', loading: loading, }"
        :row-config="{ isHover: true }"
        :scroll-y="{enabled: true,gt:50}"
        :show-overflow="false"
    >
      <template #toolbar>
        <div class="pb-2">
          <VbenButton class="ml-2" type="primary" @click="handleCreate">
            创建订单
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
    <MenuAddDraw ref="menuAddDrawRef" @success="HandleSuccess"/>
  </div>
</template>
