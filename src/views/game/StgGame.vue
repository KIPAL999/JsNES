<template>
  <div class="game">
      <p class="game_p">射击游戏</p>
      <div class="game_ul">
        <li v-for="item in this.stgGame" :key="item.index">
          <a href="javascript:;" @click="startStg(item)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>      
      <el-pagination
        :small="true"
        background
        @current-change="changeStg"
        :current-page.sync="currentStg"
        hide-on-single-page        
        layout="prev, pager, next"
        :total="this.stgPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"StgGame",
    data() {
      return {
        stgGame:[],
        stgPage:0,
        currentStg:1,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+'stggame').then(res=> {
        this.stgGame=res.data[0];
        this.stgPage=res.data[1]*10;
      })     
    },
    methods: {
      changeStg() {
        this.axios.get(this.$store.state.url+"changeStg",{params:{num:this.currentStg}}).then(res=> {
          this.stgGame=res.data;
        })
      // 跳转到top
      window.scrollTo(0,0)
      },
      // 点击跳转到开始页面,并把rom传值过去;
      startStg(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }    
}
</script>

<style>
</style>