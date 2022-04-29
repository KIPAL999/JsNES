<template>
  <div class="game">
      <p class="game_p">动作游戏</p>
      <div class="game_ul">
        <li v-for="item in this.actGame" :key="item.index">
          <a href="javascript:;" @click="startAct(item)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>
      <el-pagination
      :small="true"
        background
        hide-on-single-page
        @current-change="changeAct"
        :current-page.sync="currentAct"
        layout="prev, pager, next"
        :total="this.actPage">
      </el-pagination>
  </div>
</template>

<script>
export default {
    name:"ActGame",
    data() {
      return {
        actGame:[],
        actPage:0,  
        currentAct:1,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios.get(this.$store.state.url+'actgame').then(res=> {
        // 内容;
        this.actGame=res.data[0];
        // 页数;
        this.actPage=res.data[1]*10;
      })   
    },
    methods:{
      // 点击分页的时候发送get请求,
      changeAct() {
        this.axios.get(this.$store.state.url+"changeAct",{params:{num:this.currentAct}}).then(res=> {
          this.actGame=res.data;
        })
      // 跳转到top
        window.scrollTo(0,0)
      },
      // 点击跳转到begin页面,并将rom传输过去;
      startAct(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }
}
</script>

<style>
</style>