<template>
  <div class="game">
      <p class="game_p">格斗游戏</p>
      <div class="game_ul">
        <li v-for="item in this.ftgGame" :key="item.index">
          <a href="javascript:;" @click="startFtg(item)">
            <img :src="url+item.img">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>     
      <el-pagination
        :small="true"
        background
        hide-on-single-page
        @current-change="changeFtg"
        :current-page.sync="currentFtg" 
        layout="prev, pager, next"
        :total="this.ftgPage">
      </el-pagination>       
  </div>
</template>

<script>
export default {
    name:"FtgGame",
    data() {
      return {
        ftgGame:[],   
        ftgPage:0,
        currentFtg:1,        
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+'ftggame').then(res=> {
        this.ftgGame=res.data[0];
        this.ftgPage=res.data[1]*10;
      }) 
    },
    methods: {
      changeFtg() {
        this.axios.get(this.$store.state.url+"changeFtg",{params:{num:this.currentFtg}}).then(res=> {
          this.ftgGame=res.data;
        })
      // 跳转到top
      window.scrollTo(0,0)
      },
      // 点击跳转到开始页面,并将rom传值过去;
      startFtg(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }    
}
</script>

<style>
</style>