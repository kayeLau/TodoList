<template>
  <div class="chart"></div>
</template>

<script>
import { merge } from "lodash";
import * as echarts from "echarts";
import { BASIC_OPTION } from "./default_option";
import ResizeListener from "element-resize-detector";

export default {
  name: "ChartLine",
  props: {
    // 正常的业务数据，对应echarts饼图配置中series[0].data
    seriesData: {
      type: Object,
      required: true
    },

    extraOption: {
      type: Object,
      default: () => ({})
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
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    assembleDataToOption() {
      // 組合數據與配置
      return merge(
        {},
        BASIC_OPTION,
        {
            xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.seriesData.xAxis
        },
        },
        {
          series: this.seriesData.data
        },
        this.extraOption
      );
    },

    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
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

    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.chart) return;

      const fullOption = this.assembleDataToOption();
      console.log(fullOption);
      this.chart.setOption(fullOption, true);
    },

    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return;
      this.chart.resize();
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 16rem;
}
</style>


