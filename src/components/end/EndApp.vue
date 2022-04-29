<template>
    <div class="endApp">
    <a href="javascript:;" class="end" @touchstart="endTop" :class="{endShow:isEndShow}">
      <img src="~assets/img/top.png" alt="">
    </a>
    </div>
</template>

<script>
export default {
    name:"EndApp",
    data() {
        return {
            isEndShow:false,
        }
    },
    methods: {
      endTop() {
        // 跳转到顶部;
        scrollTo(0,0);
      }        
    },
    mounted() {
      window.addEventListener("scroll",(e)=> {
        // 判断一个scrollY,改变isEndShow的值;
        this.isEndShow=window.scrollY>=800?true:false;          
      })
    }
}
</script>

<style>
@import "~assets/css/end/endApp.css"
</style>