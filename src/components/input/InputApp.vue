<template>
    <!-- 搜索框模块 -->
    <div class="top">
      <form :class="{trunFrom:isTrunFrom}">
        <span class="form-one" @click="tabbarApp">
          <img src="~assets/img/nav.png">
        </span>
        <div class="form-middle">
          <i class="bi bi-search"></i>
          <input type="search" value="魂斗罗" @click="topSearch">
        </div>
      </form>
      <!-- 轮播图模块 -->
    <swiper-app></swiper-app>
    </div>
</template>

<script>
// 导入轮播图模块;
import SwiperApp from 'components/swiper/SwiperApp';
export default {
    name:"InputApp",
    components: {
          SwiperApp
    },
    data() {
        return {
            isShow:false,
            isTrunFrom:false,
            bodyShow:[],            
            isTabbarShow:true,
            lisNav:[]
        }
    },
    mounted() {
      // 获取body
      this.bodyShow=document.querySelector("body");  
    },
    methods: {
        topSearch() {
        // 跳转到搜素页面;并将isShow改成false
        this.$router.push("/search");
        this.$emit('fund',this.isShow)
      },
        tabbarApp() {
        // 改变isTabbarShow的值;
        this.$bus.$emit('func',this.isTabbarShow)
        // 给html和body添加overflow;
        this.bodyShow.classList.add("bodyShow");
      },  
    }
}
</script>

<style>
  @import "~assets/css/input/input.css";
</style>