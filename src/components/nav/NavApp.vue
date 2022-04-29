<template>
    <div class="nav">
      <li v-for="(item,index) in this.cateGame" :key="item.index" @click="navImage(index)">
        <img :src="url+item.img">
        <p>{{item.title}}</p>
      </li>
    </div>  
</template>

<script>
export default {
    name:"NavApp",
    data() {
        return {
        cateGame:[],
        url:this.$store.state.url
        }
    },
    created() {
      this.axios(this.$store.state.url+'navImage').then(res=> {
        this.cateGame=res.data;
      })
    },
    methods: {
      navImage(index) {
        switch(index) {
          case 0:
            // 动作
            this.$router.replace("/actgame").catch(err => {})
            this.$bus.$emit('msggame',4); 
            break;
          case 1:
            // 冒险
            this.$router.replace("/avggame").catch(err=>{})     
            this.$bus.$emit('msggame',5); 
            break;            
          case 2:
            // 角色
            this.$router.replace("/rpggame").catch(err => {})     
            this.$bus.$emit('msggame',6);               
            break;            
          case 3:
            // 格斗
            this.$router.replace("/ftggame").catch(err => {})      
            this.$bus.$emit('msggame',7);            
            break;            
          case 4:
            // 射击
            this.$router.replace("/stggame").catch(err => {})      
            this.$bus.$emit('msggame',8);                         
            break;            
          case 5:  
            // 棋牌
            this.$router.replace("/chessgame").catch(err => {})        
            this.$bus.$emit('msggame',9);           
            break;            
        }
      }        
    }
}
</script>

<style>
@import "~assets/css/nav/navApp.css";
</style>