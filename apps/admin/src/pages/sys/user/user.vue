<script lang="ts" setup>
import {computed, ref, unref} from "vue";
import UserDraw from "./model/UserDraw.vue";
import CreateSuccessModal from "./model/CreateSuccessModal.vue";
import {UserColumns, CreateFormSchemas, EditFormSchemas} from "./schemas";
import {api_create, api_edit, api_list} from "@/apis/user"
import {useTable} from "@vben/vbencomponents";
import {filterObjectFields} from "@vben/utils";

const rootDom = ref()
const Height = computed(() => window.innerHeight - (rootDom.value?.getBoundingClientRect().top || 0) - 20)
const UserRef = ref()
const CreateSuccessRef = ref()
const [registerTable, {reload}] = useTable({
      columnConfig: {resizable: false},
      columns: UserColumns,
      title: "用户管理",
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

    },
)
let UserSuccess = function (user) {
  UserRef.value.close()
  CreateSuccessRef.value?.open(user)
  reload()
}
const handleEdit = (row) => {
  UserRef.value?.open({
    title: "编辑用户",
    submit: api_edit,
    schemas: EditFormSchemas,
    success: (user) => {
      UserRef.value.close()
      reload()
    },
    model: filterObjectFields(JSON.parse(JSON.stringify(unref(row))),
        ['id', 'account', 'name', 'level', 'status', 'rebate', 'notice', 'note'])
  })
}

function handleCreate() {
  UserRef.value?.open({
    title: "添加用户",
    submit: api_create,
    schemas: CreateFormSchemas,
    success: function (user) {
      UserRef.value.close()
      CreateSuccessRef.value?.open(user)
      reload()
    }
  })
}

function CreateSuccess(user) {
  UserRef.value.close()
  CreateSuccessRef.value?.open(user)
  reload()
}

</script>
<template>
  <div ref="rootDom" style="margin: 20px">
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
          <vben-button class="action" type="primary" @click="handleCreate">添加用户</vben-button>
          <!--          <vben-button class="action" type="primary" @click="CreateRef?.open">添加用户</vben-button>-->
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
    <UserDraw ref="UserRef"/>
    <CreateSuccessModal ref="CreateSuccessRef"/>
  </div>
</template>


<style scoped>
.action {
  display: inline-block;
  margin-right: 10px;
}
</style>