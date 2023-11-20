<script lang="ts" setup>
import {reactive, ref, unref, computed} from 'vue';
import {useI18n} from '@vben/locale';
import {notice, useForm} from '@vben/vbencomponents'
import {useUserStore} from '@/store/user';
import {onKeyStroke} from '@vueuse/core';
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid
} from './use-login';
import LoginFormTitle from './login-form-title.vue';
import md5 from 'crypto-js/md5';

const Store = JSON.parse(localStorage.getItem("login") || `{"rememberMe":false,"account":"","password":""}`)
const formRef = ref(null);
const loading = ref(false);
const rememberMe = ref(Store.rememberMe);

const {t} = useI18n();
const userStore = useUserStore();
const {setLoginState, getLoginState} = useLoginState();
const {getFormRules} = useFormRules();
const formData = reactive({
  account: Store.account,
  password: Store.password,
  captcha: "",
});
const isCaptcha = ref(false)
let captchaUrl = "/basic-api/captcha"
if (import.meta.env.MODE != "development") {
  captchaUrl = "/captcha"
}
const captcha = ref(captchaUrl)
const handleCaptcha = () => {
  captcha.value = captchaUrl + `?t=${Date.now()}&reload=true`
}
const captcha_id = getCookie('captcha_id');
isCaptcha.value = captcha_id != null
const [registerForm, {validForm}] = useFormValid();
const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
onKeyStroke('Enter', handleLogin);
let login_time = 0;

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

async function handleLogin() {
  if (Date.now() - login_time < 100) return;
  login_time = Date.now();
  // 暂时不做校验

  // const data = await validForm()
  // if (!data) return
  // debugger
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: md5(formData.password).toString(),
      account: formData.account,
      captcha: formData.captcha,
      mode: 'none' //不要默认的错误提示
    });
    if (userInfo) {
      if (rememberMe.value) {
        Store.password = formData.password;
        Store.rememberMe = true;
        Store.account = formData.account;
        localStorage.setItem("login", JSON.stringify(Store))
      }
      notice.success({
        content: t('sys.login.loginSuccessTitle'),
        meta: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name == "新用户" ? '尊贵的起飞用户' : userInfo.name}`,
        duration: 3000
      });
      // setTimeout(() => {
      //   const GetTS = function () {
      //     const nge_Hour = new Date().getHours();
      //     const nge_warmprompt = [
      //       '现在已经过凌晨了，身体是无价的资本喔，早点休息吧！',
      //       '凌晨1点多了，工作是永远都做不完的，别熬坏身子！',
      //       '该休息了，身体可是革命的本钱啊！',
      //       '夜深了，熬夜很容易导致身体内分泌失调，长痘痘的！',
      //       '四点过了，你明天不上班？？？',
      //       '你知道吗，此时是国内网络速度最快的时候！',
      //       '清晨好，这麽早就上班啦，昨晚做的梦好吗？ ',
      //       '新的一天又开始了，祝你过得快乐!',
      //       '早上好，一天之际在于晨，又是美好的一天！',
      //       '上午好！今天你看上去好精神哦！',
      //       '上午好！今天你看上去好精神哦！',
      //       '该吃午饭啦！有什么好吃的？您有中午休息的好习惯吗？',
      //       '该吃午饭啦！有什么好吃的？您有中午休息的好习惯吗？',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。',
      //       '太阳落山了！快看看夕阳吧！如果外面下雨，就不必了 ^_^',
      //       '太阳落山了！快看看夕阳吧！如果外面下雨，就不必了 ^_^',
      //       '晚上好，今天的心情怎么样?',
      //       '忙碌了一天，累了吧？快去嫖一下，放松下吧！',
      //       '忙碌了一天，累了吧？快去嫖一下，放松下吧！',
      //       '忙碌了一天，累了吧？快去嫖一下，放松下吧！',
      //       '这么晚了，还在上网？早点洗洗睡吧，睡前记得洗洗脸喔！',
      //       '这么晚了，还在上网？早点洗洗睡吧，睡前记得洗洗脸喔！',
      //     ];
      //     const msg = ' 温馨提示';
      //     return {
      //       message: msg,
      //       description: nge_warmprompt[nge_Hour],
      //       icon: '🚀',
      //     };
      //   };
      //   notice.info(GetTS());
      // }, 1000);
    }
  } catch (error) {
    // notice.error({
    //   content: t('sys.api.errorTip'),
    //   meta:
    //       (error as unknown as Error).message || t('sys.api.networkExceptionMsg')
    // });
    const captcha_id = getCookie('captcha_id');
    if (captcha_id != "") {
      isCaptcha.value = true
      handleCaptcha()
    }
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <login-form-title v-show="show" class="enter-x"/>
  <vben-form
      v-show="show"
      ref="formRef"
      :model="formData"
      :rules="getFormRules"
      @register="registerForm"
      @keypress.enter="handleLogin"
  >
    <vben-form-item :show-label="false" class="enter-x" inline>
      <vben-input
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
          class="fix-auto-fill"
          size="large"
      />
    </vben-form-item>
    <vben-form-item :show-label="false" class="enter-x" inline>
      <vben-input
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
          show-password-on="click"
          size="large"
          type="password"
      />
    </vben-form-item>
    <vben-form-item v-if="isCaptcha" :show-label="false" class="enter-x" inline>
      <vben-grid class="enter-x">
        <vben-grid-item :span="14">
          <vben-input
              v-model:value="formData.captcha"
              placeholder="请输入验证码"
              show-password-on="click"
              size="large"
          />
        </vben-grid-item>
        <vben-grid-item :span="4"/>
        <vben-grid-item :span="6" @click="handleCaptcha">
          <img :src="captcha" style="border: 1px solid #050505;"/>
        </vben-grid-item>
      </vben-grid>
    </vben-form-item>
    <vben-grid class="enter-x">
      <vben-grid-item :span="12">
        <vben-form-item :show-label="false" inline>
          <!-- No logic, you need to deal with it yourself -->
          <vben-checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </vben-checkbox>
        </vben-form-item>
      </vben-grid-item>
      <vben-grid-item :span="12">
        <vben-form-item :show-label="false" class="justify-items-end" inline>
          <!-- No logic, you need to deal with it yourself -->
          <vben-button
              size="small"
              tag="a"
              text
              type="primary"
              @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('sys.login.forgetPassword') }}
          </vben-button>
        </vben-form-item>
      </vben-grid-item>
    </vben-grid>

    <vben-form-item :show-label="false" class="enter-x" inline>
      <vben-button
          :loading="loading"
          block
          size="large"
          type="primary"
          @click="handleLogin"
      >
        {{ t('sys.login.loginButton') }}
      </vben-button>
    </vben-form-item>

    <vben-grid :cols="3" class="enter-x">
      <vben-grid-item :md="8" :xs="24">
        <vben-button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </vben-button>
      </vben-grid-item>
      <vben-grid-item :md="8" :xs="24" class="md:!my-0 xs:mx-0 md:mx-2">
        <vben-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </vben-button>
      </vben-grid-item>
      <vben-grid-item :md="7" :xs="24">
        <vben-button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </vben-button>
      </vben-grid-item>
    </vben-grid>

    <!--    <vben-divider class="enter-x">{{ t('sys.login.otherSignIn') }}</vben-divider>-->

    <!--    <div :class="`sign-in-way`" class="flex justify-evenly enter-x">-->
    <!--      <github-filled/>-->
    <!--      <wechat-filled/>-->
    <!--      <alipay-circle-filled/>-->
    <!--      <google-circle-filled/>-->
    <!--      <twitter-circle-filled/>-->
    <!--    </div>-->
  </vben-form>
</template>
