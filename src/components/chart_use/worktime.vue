<template>
  <div>
    <echart-line :series-data="todolistData" :extra-option="extraOption" />
  </div>
</template>

<script>
import EchartLine from "@/components/echart_line";

export default {
  components: {
    EchartLine
  },
  data() {
    return {
      extraOption: {
        color: ["#fe883a", "#2d90d1", "#f75981", "#90e2a9"]
      }
    };
  },
  computed:{
    todolistData(){
      //獲取store并產出echart series
      let data = this.$store.getters.wholelist;
      let done = new Array(data.length).fill(0);
      let notdone = new Array(data.length).fill(0);
      //分別統計完成與未完成情況
      let xAxis = [];
      for(let i = 0;i < data.length;i++){
        let date = data[i].name + '';
        let month = date.substring(4,6);
        let day = date.substring(6,8);
        xAxis.push(month + '/' + day)
        for(let j = 0;j < data[i].store.length;j++){
          if(data[i].store[j].state === false){
            notdone[i] += 1
          }else{
            done[i] += 1
          }
        }
      }

      //計算完成百分比
      let donePercentage = [];
      for(let i = 0;i < done.length;i++){
        if(done[i] === 0 && notdone[i] === 0){
          donePercentage[i] = 0;
        }else{
          donePercentage[i] = Math.round((done[i] / (done[i] + notdone[i])) * 100);
        }
      }
      //向父組件發送數據
      this.$emit('todolistData', done , notdone , donePercentage)

      return {
        xAxis,
        data:[{
          name:"完成百分比",
          type:"line",
          data:donePercentage
        },
      ]}
    },
  },
    mounted() {
    this.$store.dispatch("read_todo");
  },
};
// [
// {"name":20210517,"store":[{"content":"5555","state":true},{"content":"555","state":true},{"content":"5555","state":true}]},
// {"name":20210516,"store":[{"content":"555555","state":true},{"content":"555555","state":false},{"content":"555","state":true}]},
// {"name":20210515,"store":[{"content":"555555","state":true},{"content":"555555","state":false},{"content":"555","state":true}]},
// {"name":20210514,"store":[{"content":"555555","state":true},{"content":"555555","state":false},{"content":"555","state":true}]},
// {"name":20210513,"store":[{"content":"555555","state":true},{"content":"555555","state":false},{"content":"555","state":true}]},
// {"name":20210512,"store":[{"content":"555555","state":true},{"content":"555555","state":false},{"content":"555","state":true}]},
// {"name":20210511,"store":[{"content":"555555","state":true},{"content":"555555","state":false},{"content":"555","state":true}]}
// ]
</script>


