<template>
    <div class="game">
      <p class="game_p">{{huntTitle}}</p>
      <div class="game_ul">
        <li v-for="item in this.huntGame" :key="item.index">
          <a href="javascript:;" @click="startHunt(item)">
            <img :src="url+item.img">
            <p>{{item.title}}</p>
          </a>
        </li>
      </div>       
      <el-pagination
      :small="true"
        background
        hide-on-single-page
        :current-page.sync="currentHunt"
        @current-change="changeHunt"
        layout="prev, pager, next"
        :total="this.huntPage">
      </el-pagination>      
  </div>
</template>

<script>
export default {
    name:"HuntGame",
    data() {
      return {
        huntTitle:"搜索结果",
        huntGame:[],
        isShow:true,
        // 总页数;
        huntPage:0,
        // 当前页数;
        currentHunt:1,
        url:this.$store.state.url
      }
    },
    created() {
      // 页面加载的时候将父组件显示;
      this.$bus.$emit('msg',this.isShow);
      this.huntTitle=this.$route.query.title;
      // 当页面强制刷新的时候,重新给服务器发送事件;
        this.axios.get(this.$store.state.url+'hunt',{params:{field:this.huntTitle}}).then(res=> {
                // 将服务器传输过来的搜索结果传输给HuntGame,
                this.huntGame=res.data[0];
                this.huntPage=res.data[1]*10;
          }).catch(err=> {
                console.log(err);
        })      
    },
    methods: {
      changeHunt() {
        // 点击分页的时候发送get请求,并将页码传输过去;
        this.axios.get(this.$store.state.url+"changeHunt",{params:{num:this.currentHunt}}).then(res=> {
          this.huntGame=res.data;
        }).catch(err=> {
          console.log(err);
        })
        // 点击分页之后,回滚到yop
        window.scrollTo(0,0);
      },
      startHunt(item) {
        // 跳转到begin,并将rom传输过去;
        this.$router.push({path:"/startgame",query:{rom:item.rom,img:item.img}}).catch(err=> {})
      }
    }
}
</script>

<style>

</style>