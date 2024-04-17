<script lang="ts" setup>
import {computed} from 'vue'
import {context} from '../../../bridge'

const {useUserStore, useAppInject} = context

const userStore = useUserStore()
const {getIsMobile} = useAppInject()
const getUserInfo = computed(() => {
  const {name = '尊贵的起飞用户', avatar, desc} = userStore.getUserInfo || {}
  return {name: name == '新用户' ? '尊贵的起飞用户' : name, avatar: avatar || '/event/logo.svg', desc: desc || '无'}
})
</script>
<template>
  <div class="flex cursor-pointer">
    <img :src="getUserInfo.avatar" alt="avatar" class="avatar w-6 h-6 mr-3"/>
    <span v-if="!getIsMobile">{{ getUserInfo.name }}</span>
  </div>
</template>
<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
