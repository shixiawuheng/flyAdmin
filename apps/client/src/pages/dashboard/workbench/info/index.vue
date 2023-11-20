<template>
  <div
      class="ml-4 mr-4 mt-4 row-start-8 row-span-13 col-start-1 col-span-6 rounded-md border border-solid border-gray-200 flex flex-col">
    <div class="w-full h-1/10 border-b-1 border-b-solid border-gray-200 flex items-center">
      <span class="ml-4 text-lg text-gray-500 font-semibold cursor-default">个人信息</span>
    </div>
    <div class="h-9/10 m-3 overflow-auto">
      <vben-descriptions :column="1" label-placement="left" size="large">
        <vben-descriptions-item label="昵称">
          {{ info.name }}
        </vben-descriptions-item>
        <vben-descriptions-item label="用户名">
          {{ info.account }}
        </vben-descriptions-item>
        <vben-descriptions-item label="密码">
          <div>
            ******
            <!--              <a>修改密码</a>-->
          </div>
        </vben-descriptions-item>
        <vben-descriptions-item label="起飞币">
          {{ info.money }}
        </vben-descriptions-item>

        <!--          <vben-descriptions-item label="夜宵">-->
        <!--            苹果-->
        <!--          </vben-descriptions-item>-->
      </vben-descriptions>
      <vben-divider style="margin-top: 10px;margin-bottom: 10px"/>
      <vben-button
          block
          size="large"
          style="margin-top: 10px"
          type="primary"
          @click="handleRecharge">
        充值
      </vben-button>
      <vben-button
          block
          size="large"
          style="margin-top: 10px"
          type="primary"
          @click="$refs.newpwdRef.open()">
        修改密码
      </vben-button>
      <vben-button
          block
          size="large"
          style="margin-top: 10px"
          type="primary"
      >修改昵称
      </vben-button>
    </div>
    <recharge ref="rechargeRef"/>
    <newpwd ref="newpwdRef"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useUserStore} from "@/store/user";
import recharge from "./recharge.vue"
import newpwd from './newpwd.vue'

const rechargeRef = ref()

function handleRecharge() {
  rechargeRef.value.open()
}

const UserStore = useUserStore()
const info = computed(() => UserStore.getUserInfo)

</script>
