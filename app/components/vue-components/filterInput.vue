<template>
  <div class="c-dashboard">
   <input type="search"  v-model="search" />
   <button class="c-button" v-on:click="fireClick">Clear</button>
  </div>
</template>

<script>
export default {
  name: "filterInput",
  emits: ['customtype'],
  data(){
    return{
      search:'',
    }
  },
  methods: {
    fireClick(){
      this.search = '';
    }
  },
  watch: {
    search(newsearch, oldsearch) {
      var event = new CustomEvent('customtype', { detail: this.search});

      window.dispatchEvent(event);
    }
  },
};
</script>
