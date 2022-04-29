<template>
  <div class="home">
      <!-- 最近更新 -->
    <div class="new">
      <div class="new_top">
        <span>{{this.cateUrl[0]}}</span>
        <a href="javascript:;" @touchstart="newMore">更多 ></a>
      </div>
      <div class="new_button">
        <li v-for="item in this.newGame" :key="item.index">
          <a href="javascript:;" @click="startNew(item.rom)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>                        
      </div>
    </div>
    <!-- 童年精选 -->
    <div class="new">
      <div class="new_top">
        <span>{{this.cateUrl[1]}}</span>
        <a href="javascript:;" @touchstart="classicMore">更多 ></a>
      </div>
      <div class="new_button">
        <li v-for="item in this.classicGame" :key="item.index">
          <a href="javascript:;" @click="startClassic(item.rom)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>                        
      </div>
    </div>
    <!-- 总热门 -->
    <div class="new">
      <div class="new_top">
        <span>{{this.cateUrl[2]}}</span>
        <a href="javascript:;" @touchstart="hotMore">更多 ></a>
      </div>
      <div class="new_button">
        <li v-for="item in this.hotGame" :key="item.index">
          <a href="javascript:;" @click="startHot(item.rom)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>                        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Home",
  data() {
    return {
      newGame:[],
      classicGame:[],
      hotGame:[],
      lisHome:[],
      cateUrl:["最近更新","童年经典","总热门"],
      url:this.$store.state.url
    }
  },
  mounted() {
      // 获取li
      this.lisHome=document.querySelectorAll(".tabbar li");   
  },
  created() {
    this.axios(this.$store.state.url+'newgame').then(res=> {
      this.newGame=res.data;
    })
    this.axios(this.$store.state.url+'classicgame').then(res=> {
      this.classicGame=res.data;
    })
    this.axios(this.$store.state.url+'hotgame').then(res=> {
      this.hotGame=res.data;
    })
    this.$bus.$emit('msggame',0);
      this.$bus.$emit('msg',true);          
  },
  methods: {
    newMore() {
      for(let i of this.lisHome) {
          i.classList.remove("liRed");
      }
      this.$router.replace("/newgame").catch(err => {});
      this.$bus.$emit('msggame',1);         
    },
    classicMore() {
      for(let i of this.lisHome) {
          i.classList.remove("liRed");
      }      
      this.$router.replace("/classicgame").catch(err => {});
      this.$bus.$emit('msggame',2);         
    },
    hotMore() {
      for(let i of this.lisHome) {
          i.classList.remove("liRed");
      }      
      this.$router.replace("/hotgame").catch(err => {});
      this.$bus.$emit('msggame',3);         
    },
    // 最近更新模块;
    startNew(rom) {
        this.$router.push({path:"/startgame",query:{rom:rom}}).catch(err=> {})
      },
    // 童年经典模块;
    startClassic(rom) {
        this.$router.push({path:"/startgame",query:{rom:rom}}).catch(err=> {})
      },
    // 总热门模块;
    startHot(rom) {
        this.$router.push({path:"/startgame",query:{rom:rom}}).catch(err=> {})
      }
  }
}
</script>

<style>
@import "~assets/css/home/home.css";
</style>