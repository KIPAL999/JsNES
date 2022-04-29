<template>
  <div class="game">
      <p class="game_p">{{this.title}}</p>
      <div class="game_ul">
        <li v-for="item in this.hotMore" :key="item.index">
          <a href="javascript:;" @click="startHot(item)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>      
      <el-pagination
        :small="true"
        background
        hide-on-single-page
        @current-change="changeHot"
        :current-page.sync="currentHot"        
        layout="prev, pager, next"
        :total="this.hotPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"HotGame",
    data() {
      return {
        title:"总热门",
        hotMore:[],
        hotPage:0,   
        currentHot:1,
        url:this.$store.state.url     
      }
    },
    created() {
      this.axios(this.$store.state.url+'hotmore').then(res=> {
        this.hotMore=res.data[0];
        this.hotPage=res.data[1]*10;
      })
    },
    methods: {
      // 点击分页的时候发送get请求;
      changeHot() {
        this.axios.get(this.$store.state.url+"changeHot",{params:{num:this.currentHot}}).then(res=> {
          this.hotMore=res.data;
        })
      // 跳转到top
        window.scrollTo(0,0)                
      },
      startHot(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }
}
</script>

<style>
</style>