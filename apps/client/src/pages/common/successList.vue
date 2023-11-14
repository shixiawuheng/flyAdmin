<template>
  <div style="height: 100%">
    <vxe-list
        :auto-resize="true"
        :scroll-y="{enabled: true, gt: 60, sItem: '.my-tr'}"
        class="my-table-list"
        height="100%"
        v-bind="$attrs">
      <template #default="{ items }">
        <div
            v-for="item in items" :key="item" class="my-tr item"
            @click="Copy(item)">
          <vben-ellipsis>
            {{ item }}
          </vben-ellipsis>
        </div>
      </template>
    </vxe-list>
    <vben-button
        :loading="$attrs.loading"
        block
        size="large"
        type="primary"
        @click="$emit('success')"
    >
      确认提交
    </vben-button>
  </div>
</template>

<script lang="ts" setup>
import {writeTextToClipboard} from '@vben/hooks/src/web/useCopyToClipboard'
import {msg} from '@vben/vbencomponents'

// defineProps({
//   loading: Boolean
// })
// const emit = defineEmits(['update:data', 'success'])
//
// function handleSubmit() {
//   emit("success")
// }

function Copy(text) {
  writeTextToClipboard(text)
  msg.success('复制成功');
  // clipboardRef.value = text
  // if (unref(copiedRef)) {
  //
  // } else {
  //   msg.error('复制失败');
  // }
}
</script>

<style lang="scss" scoped>
.item {
  display: block;
  padding-left: 10px;
  padding-top: 5px;
  width: 100%;
}

.my-table-list {
  border: 1px solid #e8eaec;
  height: 92%;
  margin-bottom: 3%;
}

.my-table-list table {
  width: 100%;
  text-align: center;
}

.my-table-list .my-tr {
  height: 32px;
}

.my-table-list .my-tr:hover {
  background-color: #f5f7fa;
}

.my-table-list td {
  border-right: 1px solid #e8eaec;
}
</style>
