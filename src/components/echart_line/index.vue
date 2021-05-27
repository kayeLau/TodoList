<template>
  <Empty v-if="isSeriesEmpty" description="暫無數據" />
  <chart-line v-else :series-data="seriesData" />
</template>

<script>
import ChartLine from "./echart_line.vue";
import { Empty } from "vant";

export default {
  name: "EChartLine",
  components: { ChartLine, Empty },
  props: {
    seriesData: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 针对饼图数据是不是无效的判断
    isSeriesEmpty() {
      return !this.seriesData.data.length;
    }
  },
};
</script>

