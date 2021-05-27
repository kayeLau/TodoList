<template>
  <div class="echart-wrap">
    <div class="introduction">
      <div class="count">
        <div>任務總數 {{ totaltest }}</div>
        <p>已完成 {{ totalDone }}</p>
        <p>未完成 {{ totalNotdone }}</p>
      </div>
      <div class="done-rate">
        <div class="water" ref="water"></div>
        <div class="task">
          <p>任務完成率</p>
          <p>{{ totalDoneRate }}</p>
        </div>
      </div>
    </div>
    <h2 class="sub-title">任務完成狀況</h2>
    <work-time-chart v-on:todolistData="getTodolistData"></work-time-chart>
  </div>
</template>
<script>
import workTimeChart from "@/components/chart_use/worktime.vue";
export default {
  data() {
    return {
      done: [],
      notdone: [],
      donePercentage: []
    };
  },
  components: {
    workTimeChart
  },
  computed: {
    totalDone() {
      return this.done.reduce((acc, curr) => acc + curr, 0);
    },
    totalNotdone() {
      return this.notdone.reduce((acc, curr) => acc + curr, 0);
    },
    totaltest() {
      return this.totalDone + this.totalNotdone || 0;
    },
    totalDoneRate() {
      let res = Math.ceil(this.donePercentage.reduce((acc, curr) => acc + curr, 0) /this.donePercentage.length)
      return res

    }
  },
  methods: {
    getTodolistData(done, notdone, donePercentage) {
      this.done = done;
      this.notdone = notdone;
      this.donePercentage = donePercentage;
    },
    setWaterHeight() {
      let setHeight = Math.ceil(150 * (this.totalDoneRate * 0.01));
      this.$refs.water.style.height = setHeight + "px";
    }
  },
  updated() {
    this.setWaterHeight()
  },

};
</script>
<style scoped>
.introduction {
  display: flex;
  justify-content: flex-start;
  padding: 20px 0;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.count,
.done-rate {
  padding: 15px;
  flex: 1;
  margin-right: 20px;
  max-width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0px 1px 2px #ccc, 0px 2px 8px #ccc;
}
.echart-wrap {
  width: 100%;
  margin-top: 100px;
}
.sub-title {
  position: relative;
  text-align: left;
  padding-bottom: 40px;
  padding-left: 20px;
}
.sub-title::before {
  content: "";
  position: absolute;
  left: 0;
  width: 10px;
  height: 30px;
  background-color: #db4c3f;
}
/*------水波圖------*/
.done-rate {
  width: 220px;
  height: 150px;
  position: relative;
  overflow: hidden;
}
.water {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 150px;
  background-color: rgb(118, 218, 255);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.water::before,
.water::after {
  content: "";
  position: absolute;
  width: 150px;
  height: 150px;
  top: -10px;
  left: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 38%;
  transform: translate(-50%, -70%) rotate(0);
  animation: 爱的魔力转圈圈 6s linear infinite;
  z-index: 10;
}
.water::after {
  border-radius: 48%;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translate(-50%, -70%) rotate(0);
  animation: 爱的魔力转圈圈 10s linear -5s infinite;
  z-index: 20;
}
.task {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 100;
}
/*------------*/
.count {
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.count div:nth-child(1) {
  padding-top: 10px;
  font-size: 20px;
  text-align: left;
  flex: 1;
}
.count p:nth-child(2) {
  color: green;
}
.count p:nth-child(3) {
  color: red;
  padding-bottom: 10px;
}

@keyframes 爱的魔力转圈圈 {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}
</style>