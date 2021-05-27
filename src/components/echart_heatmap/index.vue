<template>
    <Empty v-if="isSeriesEmpty" description="暫無數據" />
    <heat-map v-else :series-data="seriesData" />
</template>
<script>
import HeatMap from "./echart_heatmap";
import {Empty} from "vant";
export default {
    name: "EchartHeatMap",
    components:{ HeatMap , Empty},
    props:{
        seriesData:{
            type: Object,
            require:true
        }
    },
    computed:{
        isSeriesEmpty(){
            return !this.seriesData.data.length;
        }
    }
}
</script>