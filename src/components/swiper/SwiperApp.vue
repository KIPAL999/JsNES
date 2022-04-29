<template>
            <!-- 轮播图模块 -->
        <div class="swiperapp">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide v-for="item in this.slide" :key="item.index">
                <img :src="url+item.img">
              </swiper-slide>
            <div class="swiper-pagination  swiper-pagination-white" slot="pagination"></div>
            </swiper>
        </div>
</template>

<script>
export default {
    name:"SwiperApp",
    data() {
      return {
        swiperOptions: {
          pagination: '.swiper-pagination',
          loop:true,
          autoplay:3000,
          autoplayDisableOnInteraction: false
        },
        slide:[],
        url:this.$store.state.url
      }        
    },
    created() {
      this.axios(this.$store.state.url+'slideImage').then(res=>{
        this.slide=res.data;
      })        
    }
}
</script>

<style>
      .swiperapp img {
        width: 100%;
        height: 7.36rem;
      }
</style>