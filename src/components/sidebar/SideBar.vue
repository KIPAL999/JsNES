<template>
  <div class="tabbar" :class="{tabbarShow:isTabbarShow}">
    <ul>
      <li v-for="(item,index) in tabbarTitle" :key="item.index" @click="tabbarAll(index)">
          <i :class="item.svg"></i>
          <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:"SideBar",
    data() {
        return {
            tabbarTitle:[
                {title:"返回",svg:"bi bi-x-octagon"},
                {title:"首页",svg:"bi bi-house"},
                {title:"最近更新",svg:"bi bi-type-h1"},
                {title:"童年经典",svg:"bi bi-type-h2"},
                {title:"总热门",svg:"bi bi-type-h3"},
                {title:"动作游戏",svg:"bi bi-dice-1"},
                {title:"冒险游戏",svg:"bi bi-dice-2"},
                {title:"角色游戏",svg:"bi bi-dice-3"},
                {title:"格斗游戏",svg:"bi bi-dice-4"},
                {title:"射击游戏",svg:"bi bi-dice-5"},
                {title:"棋牌游戏",svg:"bi bi-dice-6"},
                {title:"下载App",svg:"bi bi-download"}
            ],
            isTabbarShow:false,
            bodyShow:[]
        }
    },
    mounted() {
      // 获取body
      this.bodyShow=document.querySelector("body");      
      // 获取li
      this.lisNav=document.querySelectorAll(".tabbar li");    
      this.$bus.$on('func',(data)=> {
        this.isTabbarShow=data;
      })
      // 先清空所有li样式,然后根据下标来确定该有的样式;
      this.$bus.$on("msggame",(e)=> {
        // 排他思想;
        for (let i of this.lisNav) {
          i.classList.remove("liRed");
        }        
        this.lisNav[e+1].classList.add("liRed");
      })
    },
    methods: {
      tabbarAll(index) {
        this.isTabbarShow=false;
        this.bodyShow.classList.remove("bodyShow");    
        if(index!=0) {
        this.$bus.$emit('msggame',index-1);    
        }        
        switch(index) {                 
          case 1:
          this.$router.replace("/").catch(err => {})
          break;
          case 2:
          this.$router.replace("/newgame").catch(err => {})
          break;
          case 3:
          this.$router.replace("/classicgame").catch(err => {})            
          break;
          case 4:
          this.$router.replace("/hotgame").catch(err => {})          
          break;
          case 5:
          this.$router.replace("/actgame").catch(err => {})
          break;
          case 6:
          this.$router.replace("/avggame").catch(err => {})
          break;
          case 7:
          this.$router.replace("/rpggame").catch(err => {})
          break;
          case 8:
          this.$router.replace("/ftggame").catch(err => {})
          break;
          case 9:
          this.$router.replace("/stggame").catch(err => {})
          break;
          case 10:
          this.$router.replace("/chessgame").catch(err => {})
          break;                                             
          case 11:
          window.location.href=this.$store.state.url+"极简红白机1.0.1.apk";
          break;                                                                                
        }
      }      
    }
}
</script>

<style>
  @import "~assets/css/sidebar/sidebar.css";
</style>