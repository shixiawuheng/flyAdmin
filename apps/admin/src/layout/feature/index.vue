<script lang="ts" setup>
import {computed} from 'vue'
import {useUserStore} from '@/store/user'
import sessionTimeoutLogin from '@/pages/sys/login/session-timeout-login.vue'


const userStore = useUserStore()
const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)
</script>

<template>
  <session-timeout-login v-if="getIsSessionTimeout"/>
</template>
