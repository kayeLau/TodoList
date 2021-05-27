<template>
  <div class="chart"></div>
</template>
<script>
import * as echarts from "echarts";
import { merge } from "lodash";
import { BASIC_OPTION } from "./default_option";
import ResizeListener from "element-resize-detector";

export default {
  naem: "heatmap",
  props: {
    seriesData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    seriesData: {
      deep: true,
      handler() {
        this.updateChartView();
      }
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el);
    this.updateChartView();
    window.addEventListener("resize", this.handleWindowResize);
    this.addChartResizeListener();
  },
  methods: {
    assembleDataToOption() {
      return merge({}, BASIC_OPTION, {
        series: this.seriesData.data
      });
    },
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: "scroll",
        callOnAdd: true
      });

      instance.listenTo(this.$el, () => {
        if (!this.chart) return;
        this.chart.resize();
      });
    },
    updateChartView() {
      if (!this.chart) return;

      const fullOption = this.assembleDataToOption();
      this.chart.setOption(fullOption, true);
    },
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    }
  }
};
</script>
<style scoped>
.chart{
    width: 100%;
    height: 16rem;
}
</style>