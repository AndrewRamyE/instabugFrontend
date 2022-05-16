<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <rangeInput :changeDate="changeDate" />
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :startDate="startDate" :endDate="endDate" />
    </div>
  </div>
</template>

<script>
import { now } from "moment";
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import rangeInput from "../components/vue-components/range-input.vue";
export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
    rangeInput,
  },
  data() {
    return {
      startDate : 0,
      endDate : 0,
    };
  },
  methods: {
    changeDate(e){
      this.startDate = e.startDate;
      this.endDate = e.endDate;
    }
  },
};
</script>
