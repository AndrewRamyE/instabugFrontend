import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import FilterInput from './components/vue-components/filterInput.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import page404 from './pages/page404.vue';

angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});
angular.module('appModule').directive('vFilterInput', (createVueComponent) => {
  return createVueComponent(Vue.component('FilterInput', FilterInput));
});
angular.module('appModule').directive('vPage404', (createVueComponent) => {
  return createVueComponent(Vue.component('vPage404', page404));
});

angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});
