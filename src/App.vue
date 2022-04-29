<template>
  <div id="app">
    <div class="common" v-if="isShow">
    <!-- 导入input组件 -->
    <input-app  @fund="getMsgOne"></input-app>
    <!-- 导航栏模块 -->
    <nav-app></nav-app>
    </div>
    <keep-alive exclude="RunPage,HuntGame,SideBar,NavApp,Home,Search">
        <router-view/>
    </keep-alive>
    <!-- end模块 -->
    <end-app></end-app>
    <!-- 备案号模块 -->
    <end-record></end-record>
    <!-- 侧边栏模块 -->
    <side-bar></side-bar>
  </div>
</template>

<script>
// 导入返回底部模块;
import EndApp from 'components/end/EndApp.vue';
// 导入导航栏模块;
import NavApp from './components/nav/NavApp.vue';
// 导入Input组件
import InputApp from './components/input/InputApp.vue';
// 导入侧边栏组件
import SideBar from './components/sidebar/SideBar.vue';
// 导入备案号组件
import EndRecord from './components/end/EndRecord.vue'
// 导入bus
import bus from './bus'
  export default {
      name:"app",
      components:{
            EndApp,
            NavApp,
            InputApp,
            SideBar,
            EndRecord
      },
      data() {
      return {
        isShow:true,
        navHeight:0
      }
    },
    mounted() {
      bus.$on('msg',(e)=> {
        // 改变isShow为false;
        this.isShow=e;
      })
      // 获取nav      
      let nav=document.querySelector(".nav");
      this.navHeight=nav.offsetTop+nav.offsetHeight;
      this.$bus.$on('msg',(text)=> {
        // 将isShow改为true;
        this.isShow=text;
      })
      // 禁止页面强制缩放;
      document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      }, { passive: false });      
      // 禁止双击放大;
      var lastTouchEnd = 0;
      document.documentElement.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, { passive: false } );
      // 页面加载后执行;
      window.addEventListener("scroll",()=> {
        // 判断scrollTop,改变isTrunForm的值;
        this.isTrunFrom=window.scrollY>=this.navHeight?true:false;
      })
    },
    methods: {
      // 点击搜索框的时候
      getMsgOne(data) {
        this.isShow=data
      }
    }
      }
</script>

<style>
/* 引入bootstrap图标库 */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
/* 引入媒体查询 */
@import "~assets/css/app/util.css";
/* 引入app样式 */
@import "~assets/css/app/app.css";
/* 引入game模块样式 */
@import "~assets/css/game/game.css";
</style>
