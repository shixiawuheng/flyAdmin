<script lang="ts" setup>
import {ref, unref} from 'vue'
import {api_types, api_addType, api_editType} from '@/apis/order'
import {baseColumns} from './schemas'
// import TModel from './model/edit.vue'
import MenuAddDraw from './model/menuAddDraw.vue'

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
  menuAddDrawRef.value.open({title: "创建订单种类", api: api_addType})
}

function handleEdit(value) {
  menuAddDrawRef.value.open({title: "编辑订单种类", api: api_editType, data: unref(value)})
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
        :options="{title: '订单类型管理', pagination: false, border: 'full', loading: loading }"
        :row-config="{ isHover: true }"
        :scroll-y="{enabled: true,gt:50}"
        :show-overflow="false"
    >
      <template #toolbar>
        <div class="pb-2">
          <VbenButton class="ml-2" type="primary" @click="handleCreate">
            新建
          </VbenButton>
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
    </VbenTable>
    <MenuAddDraw ref="menuAddDrawRef" @success="HandleSuccess"/>
  </div>
</template>
