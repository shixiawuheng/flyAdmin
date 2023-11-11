<script lang="ts" setup>
import {computed, ref} from 'vue'
import {api_types, api_addType, order_type} from '@/apis/order'
import {baseColumns} from './schemas'
// import TModel from './model/edit.vue'
import MenuAddDraw from './model/menuAddDraw.vue'

let loading = ref(false)
const reload = function () {
  loading.value = true
  api_types().then(res => {
    data.value = res
  }).finally(() => loading.value = false)
}
reload()
const data = ref([])
const Height = computed(() => window.innerHeight - 165)
const menuAddDrawRef = ref()

function handleCreate() {
  menuAddDrawRef.value.open({title: "创建订单种类", api: api_addType})
}

function handleEdit(a, b, c, d) {
  console.log(a, b, c, d)
  // menuAddDrawRef.value.open({title: "创建订单种类", api: api_addType})
}

function HandleSuccess() {
  console.log("成功")
  reload()
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
      <template #action>
        <VbenButton secondary size="tiny" strong type="primary" @click="handleEdit">
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
