<template>
  <div class="game">
      <p class="game_p">棋牌游戏</p>
      <div class="game_ul">
        <li v-for="item in this.chessGame" :key="item.index">
          <a href="javascript:;" @click="startChess(item)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>      
      <el-pagination
      :small="true"
        background
        hide-on-single-page
        @current-change="changeChess"
        :current-page.sync="currentChess"
        layout="prev, pager, next"
        :total="this.chessPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"ChessGame",
    data() {
      return {
        chessGame:[],        
        rom:"",
        currentChess:1,
        chessPage:0,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+'chessgame').then(res=> {
        this.chessGame=res.data[0];
        this.chessPage=res.data[1]*10;
      })
    },
    methods: {
      // 点击分页的时候发送get请求;将ccurrentChess发送过去;
      changeChess() {
        this.axios.get(this.$store.state.url+"changeChess",{params:{num:this.currentChess}}).then(res=> {
          this.chessGame=res.data;
        })
      // 跳转到top
      window.scrollTo(0,0)
      },
      startChess(item) {
        // 跳转到begin,并将rom传值过去
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err => {});
      }
    }    
}
</script>

<style>
</style>