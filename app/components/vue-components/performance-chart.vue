<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" :dispatchAction="showCard" />
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import axios from 'axios'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },
  data() {
    return {
      chartData: [],
      selected: 0,
    };
  },
  props:{
    startDate:Date | Number,
    endDate:Date | Number,
  },
  watch:{
    startDate(newsearch, oldsearch) {
      if (this.startDate != 0 && this.endDate != 0) {
        this.selected = this.diffDate(this.startDate,this.endDate);
        if(this.selected != 0){
          let res =this.SearchDate(this.selected);
          this.showCard(res);
        }
      }
    },
    endDate(newsearch, oldsearch) {
      if (this.startDate != 0 && this.endDate != 0) {
      this.selected =this.diffDate(this.startDate,this.endDate);
      if(this.selected != 0){
        let res =this.SearchDate(this.selected);
        this.showCard(res);
      }
    }
    },
  },
  mounted () {
    axios
      .get('https://fe-task.getsandbox.com/performance')
      .then(response => {
        this.chartData = response.data;
        })
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
          formatter: function(params) {
            return (
              params[0].axisValue +
              '<br>&#128308; Team Performance Index: ' +
              params[0].data /100 + '%'
            );
          }
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
         visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 50,
            color: '#ee5f48'
          },
          {
            gt: 50,
            lte: 80,
            color: '#f8d530'
          },
          {
            gt: 80,
            lte: 100,
            color: '#178b48'
          },
        ],
        outOfRange: {
          color: '#104526'
        }
      },
      };
    },

    xAxisData() {
      return this.chartData.map((item) =>this.formatDate(item.date_ms))
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    diffDate(start,end) {
      let dateStart = moment(start);
      let dateEnd = moment(end);
      if (dateStart == dateEnd) {
         return this.formatDate(dateStart);
      }
      if (dateStart != 0 && dateEnd != 0) {
        let res = dateEnd.diff(dateStart) /2;
        if (res > 0) {
          return this.formatDate(res+dateStart);
        }
      }
      return 0;
    },
    showCard(e) {
      this.$refs.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex:e,
        });
      },
      SearchDate(date){
        let searchDates = this.xAxisData;
        if (searchDates.indexOf(date) != -1) {
          return searchDates.indexOf(date) ;
        }
        if ( moment(date).isBefore( searchDates[0])) {
          return 0 ;
        }
        for (let index = 0; index < searchDates.length; index++) {
          if (index != searchDates.length -1 && moment(date).isBetween(searchDates[index], searchDates[index+1])) {
            return (index +1) ;
          }

        }
         return searchDates.length -1 ;
      }
  },
};
</script>
