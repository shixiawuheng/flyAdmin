<script lang="ts" setup>
import {ref, watch} from 'vue'
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  GraphicComponent,
  GridComponent
} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import VChart, {THEME_KEY} from 'vue-echarts'

function generateRandomColor(hueMin, hueMax) {
  // 将色调、饱和度和亮度的范围转换为0-1之间的数值
  const hueRange = hueMax - hueMin;
  const hue = Math.random() * hueRange + hueMin;
  const saturation = Math.random();
  const lightness = Math.random();

  // 将HSL颜色转换为RGB颜色
  function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, hue + 1 / 3);
      g = hue2rgb(p, q, hue);
      b = hue2rgb(p, q, hue - 1 / 3);
    }

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }

  return hslToRgb(hue, saturation, lightness);
}

echarts.use([
  DatasetComponent,
  GraphicComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);
const prop = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})


const Chart = ref()
const option = {
  grid: {
    left: "0",
    containLabel: true,
  },
  title: {
    text: "今日消费榜",
  },
  xAxis: {
    // max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['尊贵的起飞用户', '深白', '亿唐', '准星', '老奶奶'],
    inverse: true,
    boundaryGap: true,
    deduplication: null,
    animationDuration: 300,
    animationDurationUpdate: 300,
    // axisLabel: {
    //   show: true,
    //   fontSize: 14,
    //   rich: {
    //     flag: {
    //       fontSize: 25,
    //       padding: 5
    //     }
    //   }
    // },
    // max: 2 // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      type: 'bar',
      data: [0, 0, 0, 0, 0],
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 1000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};
watch(() => prop.data, (val => {
  const Tmp = {
    yAxis: {
      data: val.map(item => item.data.name)
    },
    series: {
      data: val.map(item => item.score)
    }
  }
  // option.yAxis.data = val.map(item => item.data.name)
  // option.series.data = val.map(item => item.score)
  // console.log(Tmp)
  // console.log(Chart.value)
  Chart.value.setOption(Tmp)
}))
</script>

<template>
  <v-chart ref="Chart" :option="option" autoresize/>
</template>

<style scoped>

</style>