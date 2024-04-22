<template>
  <div
      class="ml-4 mr-4 mt-4 row-start-8 row-span-13 col-start-1 col-span-6 rounded-md border border-solid border-gray-200 flex flex-col">
    <div class="w-full h-1/10 border-b-1 border-b-solid border-gray-200 flex items-center">
      <span class="ml-4 text-lg text-gray-500 font-semibold cursor-default">个人信息</span>
    </div>
    <div class="h-9/10 m-3 overflow-auto">
      <VbenDesc :column="1" label-placement="left" size="large">
        <VbenDescItem label="昵称">
          {{ info?.name || '尊贵的起飞用户' }}
        </VbenDescItem>
        <VbenDescItem label="用户名">
          {{ info?.account || '未知' }}
        </VbenDescItem>
        <VbenDescItem label="密码">
          <div>
            ******
          </div>
        </VbenDescItem>
        <VbenDescItem label="起飞币">
          <CountTo
              :duration="1000"
              :endVal="info?.money || 0"
              :startVal="0"/>

        </VbenDescItem>
      </VbenDesc>
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
          @click="$refs.newpwdRef?.open()">
        修改密码
      </vben-button>
      <vben-button
          block
          size="large"
          style="margin-top: 10px"
          type="primary"
      >修改昵称
      </vben-button>
      <vben-button
          block
          size="large"
          style="margin-top: 10px"
          type="primary"
          @click="F5()"
      >刷新
      </vben-button>
    </div>
    <recharge ref="rechargeRef"/>
    <newpwd ref="newpwdRef"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useUserStore} from "@/store/user";
import {api_info} from '@/apis/home'
import recharge from "./recharge.vue"
import newpwd from './newpwd.vue'
import {CountTo} from '@vben/components/index'

const rechargeRef = ref()

function handleRecharge() {
  rechargeRef.value.open()
}

const UserStore = useUserStore()
const info = computed(() => UserStore.getUserInfo)

async function F5() {
  const info = await api_info()
  if (info) UserStore.setUserInfo(info);
}
</script>
