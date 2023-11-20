<template>
  <div>
    <div class="scroll-setting">
      <span>Amount：</span>
      <input type="text" :value="curAmount" />
      <button @click="handleAmountChange" style="margin-left: 6px">confirm</button>
    </div>
    <div class="scroll-area" id="scroll-area">
      <template v-for="item in wrapData">
        <div
          :style="{
            top: `${item.top}px`
          }"
          v-if="item.top >= showArea.begin && item.top <= showArea.end"
          class="scroll-item"
          :key="item.value.value"
        >
          {{ item.value.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IFInfiniteScrollParams, infiniteScroll, IFInfiniteScrollShowArea} from '../packages/XInfiniteScroll/src';

const curAmount = ref(1000);
function handleAmountChange(event) {
  const value = event.target.value;
  if (!isNaN(value) && value > 0) {
    curAmount.value = value;
  }
}

const scrollParams = computed<IFInfiniteScrollParams>(() => {
  const useListData = [];
  for (let i = 0; i < curAmount.value; i ++) {
    useListData.push({
      label: `number ${i}`,
      value: String(i)
    })
  }
  return {
    listData: useListData,
    rowItemAmount: 1,
    rowHeight: 40,
  };
});

const { wrapData, scrollTop, showArea} = infiniteScroll(
  'scroll-area',
  scrollParams,
  1000
);
</script>

<style scoped>
.scroll-setting {
  margin-bottom: 16px;
  display: flex;
}
.scroll-area {
  height: 500px;
  width: 300px;
  border: 1px solid #cccccc;
  position: relative;
  overflow: auto;
}
.scroll-item {
  height: 36px;
  line-height: 36px;
  width: 100%;
  border-radius: 4px;
  background-color: #f1f1f1;
  text-align: center;
  margin-bottom: 4px;
  position: absolute;
}
</style>
