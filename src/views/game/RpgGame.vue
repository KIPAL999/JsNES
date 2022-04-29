<template>
  <div class="game">
      <p class="game_p">角色游戏</p>
      <div class="game_ul">
        <li v-for="item in this.rpgGame" :key="item.index">
          <a href="javascript:;" @click="startRpg(item)">
            <img :src="url+item.img" >
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>      
      <el-pagination
      :small="true"
        background
        :current-page.sync="currentRpg"
        @current-change="changeRpg"        
        hide-on-single-page
        layout="prev, pager, next"
        :total="this.rpgPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"RpgGame",
    index:7,    
    data() {
      return {
        rpgGame:[],
        rpgPage:0, 
        currentRpg:1,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+'rpggame').then(res=> {
        this.rpgGame=res.data[0];
        this.rpgPage=res.data[1]*10;
      })      
    },
    methods: {
      changeRpg() {
        this.axios.get(this.$store.state.url+"changeRpg",{params:{num:this.currentRpg}}).then(res=> {
          this.rpgGame=res.data;
        })
        // 自动加载到top
        window.scrollTo(0,0);
      },
      startRpg(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }    
}
</script>

<style>
      .rpgend {
        width: 90%;
        margin: 0 auto;
      }
</style>