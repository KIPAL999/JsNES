<template>
  <div class="game">
      <p class="game_p">{{this.title}}</p>
      <div class="game_ul">
        <li v-for="item in this.classicMore" :key="item.index">
          <a href="javascript:;" @click="startClassic(item)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>     
      <el-pagination
        :small="true"        
        background
        hide-on-single-page        
        layout="prev, pager, next"
        @current-change="changeClassic"
        :current-page.sync="currentClassic"
        :total="this.ClassicPage">
      </el-pagination>       
  </div>
</template>

<script>
export default {
    name:"ClassicGame",
    data() {
      return {
        title:"童年经典",
        classicMore:[],
        ClassicPage:0,
        currentClassic:1,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+"classicmore").then(res=> {
        this.classicMore=res.data[0]
        this.ClassicPage=res.data[1]*10
      })
    },
    methods: {
      // 点击分页的时候发送get请求;
      changeClassic() {
        this.axios.get(this.$store.state.url+"changeClassic",{params:{num:this.currentClassic}}).then(res=> {
          this.classicMore=res.data;
        })
      // 跳转到top
        window.scrollTo(0,0)        
      },
      startClassic(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }
}
</script>

<style>
</style>