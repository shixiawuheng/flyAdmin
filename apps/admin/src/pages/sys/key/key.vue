<script lang="ts" setup>
import MakeDraw from "./model/MakeDraw.vue";
import {computed, ref} from "vue";
import MakeSuccessModal from "./model/MakeSuccessModal.vue";
import {useTable} from "@vben/vbencomponents";
import {TableColumns} from "./model/schemas";
import {api_list} from "@/apis/key";

const MakeRef = ref()
const MakeSuccessRef = ref()

function MakeSuccess(val) {
  MakeRef.value?.close()
  const keys = val.map(v => v.key)
  MakeSuccessRef.value?.open(keys)
  // console.log(keys)
  // notice.success(`成功生成${keys.length}张充值卡`)

}

const rootDom = ref()
const Height = computed(() => window.innerHeight - (rootDom.value?.getBoundingClientRect().top || 0) - 20)
const [registerTable, {reload}] = useTable({
  columnConfig: {resizable: false},
  columns: TableColumns,
  title: "充值卡管理",
  api: api_list,
  stripe: true,
  border: true,
  pagination: {
    loading: false,
    size: 'small',
    background: true,
    pageSize: 50,
    pageSizes: [50, 100, 200, 500, 1000],
  },
  showOverflow: true,
  scrollY: {enabled: true, gt: 50}
})
</script>
<template>
  <div ref="rootDom" style="margin: 20px;">
    <vben-table
        :height="`${Height}px`"
        @register="registerTable"
    >
      <template #toolbar>
        <div class="pb-2">
          <vben-button class="action" style="top:2.5px" @click="reload">
            <VbenIconify
                hoverPointer
                icon="ic:baseline-sync"
            />
          </vben-button>
          <vben-button type="primary" @click="MakeRef?.open">生成</vben-button>
        </div>
      </template>
      <template #action="{row}">
        <!--        <VbenButton secondary size="tiny" strong type="primary" @click="handleEdit(row)">-->
        <!--          编辑-->
        <!--        </VbenButton>-->
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
    <MakeDraw ref="MakeRef" @success="MakeSuccess"/>
    <MakeSuccessModal ref="MakeSuccessRef"/>

  </div>

</template>


<style scoped>
.action {
  display: inline-block;
  margin-right: 10px;
}
</style>