<script lang="ts" setup>
import {reactive, ref, unref, computed} from 'vue'
import {CountDownInput} from '@vben/components'
import {useI18n} from '@vben/locale'
import {
  useLoginState,
  useFormRules,
  useFormValid,
  LoginStateEnum,
} from './use-login'
import LoginFormTitle from './login-form-title.vue'

const {t} = useI18n()
const {handleBackLogin, getLoginState} = useLoginState()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  code: '',
  policy: false,
})

const {getFormRules} = useFormRules(formData)
const {validForm} = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>

<template>
  <template v-if="getShow">
    <login-form-title class="enter-x"/>
    <vben-form ref="formRef" :model="formData" :rules="getFormRules">
      <vben-form-item :show-label="false" class="enter-x" inline name="account">
        <vben-input
            v-model:value="formData.account"
            :placeholder="t('sys.login.userName')"
            class="fix-auto-fill"
            size="large"
        />
      </vben-form-item>
      <vben-form-item :show-label="false" class="enter-x" inline name="code">
        <count-down-input
            v-model:value="formData.code"
            :placeholder="t('sys.login.smsCode')"
            class="fix-auto-fill"
            size="large"
        />
      </vben-form-item>
      <vben-form-item
          :show-label="false"
          class="enter-x"
          inline
          name="password"
      >
        <vben-input
            v-model:value="formData.password"
            :placeholder="t('sys.login.password')"
            size="large"
            visibilityToggle
        />
      </vben-form-item>
      <vben-form-item
          :show-label="false"
          class="enter-x"
          inline
          name="confirmPassword"
      >
        <vben-input
            v-model:value="formData.confirmPassword"
            :placeholder="t('sys.login.confirmPassword')"
            size="large"
            type="password"
            visibilityToggle
        />
      </vben-form-item>
      <vben-form-item :show-label="false" class="enter-x" inline name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <vben-checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </vben-checkbox>
      </vben-form-item>
      <vben-button
          :loading="loading"
          block
          class="enter-x"
          size="large"
          type="primary"
          @click="handleRegister"
      >
        {{ t('sys.login.registerButton') }}
      </vben-button>
      <vben-button
          block
          class="mt-4 enter-x"
          size="large"
          @click="handleBackLogin"
      >
        {{ t('sys.login.backSignIn') }}
      </vben-button>
    </vben-form>
  </template>
</template>
