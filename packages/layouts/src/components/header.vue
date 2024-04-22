<script lang="ts" setup>
import HeaderTrigger from './trigger/HeaderTrigger.vue'
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppSearch from '../components/search/AppSearch.vue'
import AppNotify from '../components/notify/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import {SettingButton} from '../components/setting'
import UserDropdown from '../components/user-dropdown/index.vue'
import {context} from '../../bridge'
import {computed, unref} from 'vue'
import {SettingButtonPositionEnum, NavBarModeEnum} from '@vben/constants'
import {useAppTheme} from '@vben/hooks'
import DarkModeToggle from "./setting/components/DarkModeToggle.vue";

const {useAppConfig, useMenuSetting, useHeaderSetting, useRootSetting} =
    context

const {isTopMenu, isMix, menu} = useAppConfig()

const {Logo, useMultipleTabSetting} = context
const {
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
  getShowFullHeaderRef,
} = useHeaderSetting()
const {isHeaderDark} = useAppTheme()
const {getSettingButtonPosition, getShowSettingButton} = useRootSetting()
const {getMenuType, getMenuWidth, getShowHeaderTrigger} = useMenuSetting()
const {getShowMultipleTab} = useMultipleTabSetting()
const getShowSetting = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(getShowHeader)
  }
  return settingButtonPosition === SettingButtonPositionEnum.HEADER
})

const getShowHeaderMultipleTab = computed(() => {
  return unref(getShowMultipleTab) && unref(getMenuType) !== NavBarModeEnum.MIX
})
// 是否显示header中的logo
const showHeaderLogo = computed(() => {
  return unref(isTopMenu) || unref(isMix)
})
//是否显示header中的面包屑
const showHeaderBreadcrumb = computed(() => {
  return !(unref(isTopMenu) || (unref(isMix) && unref(menu).split))
})

//根据布局模式设置logo宽度
const logoWidth = computed(() => (unref(isTopMenu) ? 150 : getMenuWidth.value))
</script>
<template>
  <VbenSpace vertical>
    <VbenLayoutHeader :inverted="isHeaderDark">
      <VbenSpace
          v-if="getShowFullHeaderRef"
          :class="['h-48px', 'shadow']"
          :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
          align="center"
          justify="space-between"
      >
        <slot name="logo">
          <VbenSpace :size="0" align="center" class="items-center">
            <Logo
                v-if="showHeaderLogo"
                :style="{
                width: logoWidth + 'px',
                maxWidth: logoWidth + 'px',
              }"
            />
            <HeaderTrigger v-if="getShowHeaderTrigger"/>
            <slot v-if="showHeaderBreadcrumb" name="breadcrumb">
              <LayoutBreadcrumb/>
            </slot>
          </VbenSpace>
        </slot>
        <slot v-if="!showHeaderBreadcrumb" name="menu"></slot>
        <div id="userActionElement" class="pl-8px pr-8px">
          <slot name="buttons">
            <VbenSpace :size="16" align="center" class="p-1">
              <AppSearch v-if="getShowSearch"/>
              <AppNotify v-if="getShowNotice" :is-dark="isHeaderDark"/>
              <AppFullScreen v-if="getShowFullScreen"/>
              <VbenLocalePicker
                  v-if="getShowLocalePicker"
                  :reload="true"
                  :showText="false"
              />
              <DarkModeToggle/>
              <UserDropdown/>
              <!--              <SettingButton v-if="getShowSetting"/>-->
            </VbenSpace>
          </slot>
        </div>
      </VbenSpace>
    </VbenLayoutHeader>

    <template v-if="getShowHeaderMultipleTab">
      <slot name="tabs">
        <LayoutTabs/>
      </slot>
    </template>
  </VbenSpace>
</template>

<style></style>
