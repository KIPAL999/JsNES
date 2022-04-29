<template>
  <div class="game">
      <p class="game_p">{{this.title}}</p>
      <div class="game_ul">
        <li v-for="item in this.newMore" :key="item.index">
          <a href="javascript:;" @click="startNew(item)">
            <img :src="url+item.img" alt="">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>      
      <el-pagination
        :small="true"
        background
        hide-on-single-page
        @current-change="changeNew"
        :current-page.sync="currentNew"        
        layout="prev, pager, next"
        :total="this.newPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"NewGame",
    data() {
      return {
        title:"最近更新",
        newMore:[],
        newPage:0,
        currentNew:1,
        url:this.$store.state.url
      }
    },
    created() {
      this.axios(this.$store.state.url+'newmore').then(res=> {
        this.newMore=res.data[0];
        this.newPage=res.data[1]*10;
      })   
    },
    methods: {
      // 点击分页的时候发送get请求
      changeNew() {
        this.axios.get(this.$store.state.url+"changeNew",{params:{num:this.currentNew}}).then(res=> {
          this.newMore=res.data;
        })
        // 跳转到顶部;
        window.scrollTo(0,0);
      },
      startNew(item) {
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }
}
</script>

<style>
</style>