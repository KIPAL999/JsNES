<template>
  <div class="record" v-if="isRecordShow">
      <img :src="this.$store.state.url+this.generalImg">
      <p v-for="item in this.general" :key="item.index">{{item}}</p>
  </div>
</template>

<script>
export default {
    name:"EndRecord",
    data() {
        return {
            isRecordShow:true,
            generalImg:"record/01.jpg",
            general:null
        }
    },
    created() {
        this.axios(this.$store.state.url+'endcord').then(res=>{
        this.general=res.data;
      })        
    },
    mounted() {
        this.$bus.$on('recordShow',(e)=> {
            this.isRecordShow=e;
        });
    }
}
</script>

<style>
@import "~assets/css/end/endRecord.css";
</style>