<template>
  <div class="search">
      <div class="search_top">
        <a href="javascript:;" class="search_top_one" @touchstart="retrunSearch">
            <img src="~assets/img/search.png">
        </a>
        <input type="search" @keyup="sd($event)">
        <p @click="hunt">搜索</p>
      </div>
      <div class="search_end">
          <p>热门搜索</p>
          <div class="search_end_one">
              <li v-for="item in this.hotTitle" :key="item.index" @click="subText(item.name)">{{item.name}}</li>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"Search",
    data() {
        return {
            hotTitle:[],
            isShow:true,
            ins:[]
        }
    },
    mounted() {
        // 给ins赋值;
        this.ins=document.querySelector("input");
        // 页面加载之后自动获取焦点框;
        this.$nextTick(()=> {
            this.ins.focus();
        })
    },
    methods: {
        retrunSearch() {
            //跳转到首页,不需要返回按钮
            this.$router.replace("/")
            this.$bus.$emit('msg',this.isShow);
        },
        // 点击热门自动提交内容到搜索框;
        subText(text) {
            this.ins.value=text;
            this.hunt();
        },
        // 点击搜索按钮获取input的内容并发送给服务器;
        hunt() {
            // 当没有内容时不跳转;
            if(this.ins.value==null || this.ins.value=="") {
                return ;
            }else {
            // 当由内容的时候,将ins的值传输给huntGame模块;
            this.$router.replace({path:"/huntgame",query:{title:this.ins.value}}).catch(err=> {})
            }
        },
        sd(e) {
            // 只有当按钮为搜索时触发;
            if(e.keyCode==13) {
                this.hunt();
            }
        }
    },
    created() {
        // 页面加载的时候,将isShow改为false;
        this.$bus.$emit('msg',false);
        this.$bus.$emit('recordShow',false);
        // 页面加载的时候,给hotTtle赋值;
        this.axios.request(this.$store.state.url+"hotTitle").then(res=> {
            this.hotTitle=res.data;
        })
    },
    destroyed() {
        this.$bus.$emit('recordShow',true);
    }
}
</script>

<style>
@import "~assets/css/search/search.css";
</style>