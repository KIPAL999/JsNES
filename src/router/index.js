import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 懒加载;
const Home=()=> import ('views/home/Home')
const Search=()=> import ('views/search/Search')
// 动作游戏
const ActGame=()=> import ('views/game/ActGame')
// 冒险游戏
const AvgGame=()=> import ('views/game/AvgGame')
// 角色游戏
const RpgGame=()=> import ('views/game/RpgGame')
// 格斗游戏
const FtgGame=()=> import ('views/game/FtgGame')
// 射击游戏
const StgGame=()=> import ('views/game/StgGame')
// 棋牌游戏
const ChessGame=()=> import ('views/game/ChessGame')
// 最近更新
const NewGame=()=> import ('views/game/NewGame')
// 童年经典
const ClassicGame=()=> import ('views/game/ClassicGame')
// 总热门
const HotGame=()=> import ('views/game/HotGame')
// 搜索结果
const HuntGame=()=> import ("views/game/HuntGame")
// 开始游戏
const StartGame=()=> import ("views/pad/RunPage")
const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: '/home',
    component: Home
  },
  {
    path:"/search",
    component:Search
  },
  // 动作游戏
  {
    path:"/actgame",
    component:ActGame
  },
  // 冒险游戏
  {
    path:"/avggame",
    component:AvgGame
  },
  // 角色游戏
  {
    path:"/rpggame",
    component:RpgGame
  },
  // 射击游戏
  {
    path:"/stggame",
    component:StgGame
  },
  // 棋牌游戏
  {
    path:"/chessgame",
    component:ChessGame
  },
  // 格斗游戏
  {
    path:"/ftggame",
    component:FtgGame
  },
  // 最近更新
  {
    path:"/newgame",
    component:NewGame
  },
  // 童年经典
  {
    path:"/classicgame",
    component:ClassicGame
  },
  // 总热门
  {
    path:"/hotgame",
    component:HotGame
  },
  // 搜索结果;
  {
    path:"/huntgame",
    component:HuntGame
  },
  // 开始游戏;
  {
    path:"/startgame",
    component:StartGame
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
