<template>
  <div class="game">
      <p class="game_p">冒险游戏</p>
      <div class="game_ul">
        <li v-for="item in this.avgGame" :key="item.index">
          <a href="javascript:;" @click="startAvg(item)">
            <img :src="url+item.img">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>      
      <el-pagination
      :small="true"
        background
        layout="prev, pager, next"
        @current-change="changeAvg"
        :current-page.sync="currentAvg"
        hide-on-single-page
        :total="this.avgPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"AvgGame",
    data() {
      return {
        avgGame:[], 
        currentAvg:1,
        avgPage:0,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+'avggame').then(res=> {
        this.avgGame=res.data[0];
        this.avgPage=res.data[1]*10;
      })
    },
    methods: {
      // 点击分页的时候发送get请求;
      changeAvg() {
        this.axios.get(this.$store.state.url+"changeAvg?num="+this.currentAvg).then(res=> {
          this.avgGame=res.data;
        })
      // 跳转到top
      window.scrollTo(0,0)
      },
      // 点击跳转到bein并将rom传输过去
      startAvg(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }    
}
</script>

<style>
</style>