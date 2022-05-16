<template>
  <div class="c-dashboard">
    <label for="startDate">Start Date : </label>
    <input name="startDate" type="date" v-model="startDate" />
    <label for="endDate">End Date : </label>
    <input name="endDate" type="date" v-model="endDate" />
  </div>
</template>

<script>
export default {
  name: "rangeInput",
  data(){
    return{
      startDate:0,
      endDate:0,
    }
  },
  props:{
    changeDate:Function,
  },
  watch: {
    startDate(newsearch, oldsearch) {
      let data ={
        'startDate':this.startDate,
        'endDate':this.endDate,
      };
      this.changeDate(data);
    },
    endDate(newsearch, oldsearch) {
      let data ={
        'startDate':this.startDate,
        'endDate':this.endDate,
      };
      this.changeDate(data);
    },
  },
};
</script>
