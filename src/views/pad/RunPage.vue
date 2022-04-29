<template>
<div class="runpage">
          <div class="navbar navbar-expand" ref="navbar">
                <button @click="out">退出</button>
          </div>     
          <div class="saveing" :class="{'saveingNone':isGameShow}">
          <button @click="saveTool">保存</button>
          </div>
          <div class="saveTool" :class="{'saveClose':isSaveClose}">
            <img src="~assets/img/gameClose.png" alt="" @click="closeSaveTool">
            <img :src="gameUrl+this.romImg" >
            <p>{{saveGameTime}}</p>
            <button @click="saveGame">存档</button>
            <button @click="loadGame" :class="{'loadClose':isLoadClose}">读取</button>
          </div>
          <img src="~assets/img/gameIco.png" @click="startGame" id="btn_load">   
          <!-- 画布模块 -->
        <span v-if="error">{{error}}</span>
          <div v-else class="screen-container" ref='screenContainer'>
            <Screen ref='screen' @GenerateFrame='{() => nes.frame();}'/>
          </div>
          <!-- 控制模块 -->
          <div class="controller-action">
          <!-- 功能键 -->
          <div class="function">
                <!-- <button @click="out">退出</button> -->
                <button @touchstart="gameDown('select')" @touchend="gameUp('select')">选择</button>
                <button @touchstart="gameDown('start')" @touchend="gameUp('start')" >开始</button>            
          </div>                                  
          <!-- 摇杆容器 -->
          <div id="direction"></div>                           
          <!-- A,B,X,Y,AB -->
          <div class="action">
                <div class="action0 action1">
                    <button @touchstart="gameDown('AB')" @touchend="gameUp('AB')" id="ab-button">AB</button>
                </div>
                <div class="action0">
                    <button @touchstart="gameDown('Y')" @touchend="gameUp('Y')" id="y-button">Y</button>                  
                    <button @touchstart="gameDown('X')" @touchend="gameUp('X')" id="x-button">X</button>                  
                </div>          
                <div class="action0">
                    <button @touchstart="gameDown('B')" @touchend="gameUp('B')" id="b-button">B</button>
                    <button @touchstart="gameDown('A')" @touchend="gameUp('A')" id="a-button">A</button>                  
                </div>
      </div>
      </div>
</div>
</template>
<script>
import { NES } from 'jsnes'
import { Controller } from 'jsnes'
import Screen from './Screen'
import Raven from 'raven-js'
import Speakers from 'assets/js/gamepad/Speakers'
import FrameTimer from 'assets/js/gamepad/FrameTimer'
import {Joystick} from 'assets/js/gamepad/joystick'
var _this
var nes
var joystick
export default {
  name:"RunPage",
  components: {
    Screen
  },
  data () {
    return {
      speakers: null,
      running: false,
      frameTimer: null,
      loading: null,
      paused: false,
      error: null,
      loadedPercent: 0,
      bodyShow:[],
      currentRequest: null,
      GameTimer:null,
      gameUrl:this.$store.state.url,
      fpsInterval: null,
      romImg:this.$route.query.img,
      isGameShow:true,
      spanGame:[],
      isSaveClose:true,
      saveGameTime:"未存档",
      isLoadClose:true,
      isClick1:true,
      isClick2:true,
      isClick3:true,
      isClick4:true,
      isClick5:true,
      isClick6:true,
      isClick7:true,
      isClick8:true,
      isClick9:true,
      isClick10:true
    }
  },
  created() {
    // 页面加载的时候,将isShow改为false;    
    this.$bus.$emit('msg',false);
  },
  mounted() {
  // 获取提示框span;
    this.spanGame=document.querySelector("#save");
  //实例化摇杆 摇杆配置依赖游戏信息
          joystick = new Joystick({
              el: "#direction", //容器
              // color: color, //摇杆颜色
              color:"black",//摇杆颜色
              size: 150, //摇杆大小
              isFourBtn: false, //8键模式
              keyCodes: [87, 83, 65, 68], //绑定 上下左右 到 WSAD键
              btn_down_fn: (event) => {        
                if(nes){
                  switch(event.keyCode) {
                    case 87:
                    nes.buttonDown(1, Controller.BUTTON_UP);                              
                    nes.frame();                                         
                    break;
                    case 83:
                    nes.buttonDown(1, Controller.BUTTON_DOWN);                              
                    nes.frame();                                               
                    break;
                    case 65:
                    nes.buttonDown(1, Controller.BUTTON_LEFT);                              
                    nes.frame();                                                
                    break;
                    case 68:
                    nes.buttonDown(1, Controller.BUTTON_RIGHT);                              
                    nes.frame();                                                
                    break;                                                            
                  }
                }
              }, //按下时的回调
              btn_up_fn: (event) => {
                if(nes && this.running) {
                  switch(event.keyCode) {
                    case 87:
                    nes.buttonUp(1, Controller.BUTTON_UP);                              
                    nes.frame();                                        
                    break;
                    case 83:
                    nes.buttonUp(1, Controller.BUTTON_DOWN);                              
                    nes.frame();                                
                    break;
                    case 65:
                    nes.buttonUp(1, Controller.BUTTON_LEFT);                              
                    nes.frame();                                                
                    break;
                    case 68:
                    nes.buttonUp(1, Controller.BUTTON_RIGHT);                              
                    nes.frame();                                                
                    break;                                                            
                  }    
                }              
              }, //释放时的回调
          })      
  //页面加载的时候,给body和html添加class
      this.bodyShow=document.querySelector("body");   
      this.bodyShow.classList.add("bodyShow");
  // 当进入到后台化的时候,暂停页面，          
          document.addEventListener('visibilitychange',()=> {
            if(document.visibilityState=="hidden" && this.running) {
              this.stop() 
            // 当来到页面的时候,开始页面，
            }else if(document.visibilityState=="visible" && this.running){
            // 否则就继续游戏
              this.start()
            }
          })
  },
  // 离开时清空;  
  beforeDestroy () {
    if (this.currentRequest) {
      this.currentRequest.abort()
    }
    if(this.running) {
    clearInterval(this.GameTimer);
    this.GameTimer=null;
    this.stop()
    this.running=false;
    window.removeEventListener('resize', this.layout)
    window.nes = undefined    
    }
    this.bodyShow.classList.remove("bodyShow");    
    // 当页面离开时候将app显示;
    this.$bus.$emit('msg',true);   
  },
  methods: {
    // 点击图片开始游戏;
    startGame() {
      // 清除图片;
    document.querySelector("#btn_load").style.display='none';
    // 将isGameShow改为false;
    this.isGameShow=false;
    // 初始化摇杆;
    joystick.init()       
    _this = this
    this.speakers = new Speakers({
      onBufferUnderrun: (actualSize, desiredSize) => {
        if (!_this.running || _this.paused) {
          return
        }
        nes.frame()
        if (_this.speakers.buffer.size() < desiredSize) {
          nes.frame()
        }
      }
    })
    nes = new NES({
      onFrame: _this.$refs.screen.setBuffer,
      onStatusUpdate: console.log,
      onAudioSample: _this.speakers.writeSample
    })

    // For debugging
    window.nes = nes

    this.frameTimer = new FrameTimer({
      onGenerateFrame: Raven.wrap(nes.frame),
      onWriteFrame: Raven.wrap(this.$refs.screen.writeBuffer)
    })

    window.addEventListener('resize', this.layout)
    _this.layout()

    this.load() 
    },

// 点击图标清除弹出框;
  closeSaveTool() {
  this.isSaveClose=true;
},

// 按下保存触发;
  saveTool() {
    this.isSaveClose=false;
    // 按下保存按钮的时候,通过romImg的唯一标识来获取存档;
    let loadData = localStorage.getItem(this.romImg);
    // 如果没有存档将读取存档的按钮隐藏;
    if( loadData == null ) {
        return;
    }else {
    // 如果存档不为空将时间赋值将时间赋值给p,并显示加载按钮;
        var decodedData = JSON.parse(loadData);
        this.saveGameTime=decodedData[0];
        this.isLoadClose=false;
    }              
  },

// 按下保存游戏触发;
  saveGame() {
      try{
        // 创建一个数组保存时间和存档;
        let localArchive=[new Date().toLocaleString(),nes.toJSON()];
        // 将时间暂时先赋值给p;
          this.saveGameTime=localArchive[0];
        // 将数组转换为JSON字符串保存,利用romImg为唯一标识;
        let saveData = JSON.stringify(localArchive);
        localStorage.setItem(this.romImg, saveData);
        this.isLoadClose=false;
      }catch(oException){
        // 如果存贮容量超额,清除所有存档
          if(oException.name == 'QuotaExceededError'){
              localStorage.clear();
          }
      }
  },

// 按下加载游戏;
  loadGame() {
    // 通过romImg来加载json字符串;
      let saveData = localStorage.getItem(this.romImg);
      // 判断存档是否为空;
      if( saveData == null ) {
          return;
      }
      // 如果不为空,将json转为js对象;
      var decodedData = JSON.parse(saveData);
      // 加载存档;
      nes.fromJSON(decodedData[1]);
      this.isSaveClose=true;
  },

  DownAB() {
        nes.buttonDown(1, Controller.BUTTON_A);        
        nes.buttonDown(1, Controller.BUTTON_B);            
        nes.frame();     

  },
  UpAB() {
        nes.buttonUp(1, Controller.BUTTON_A);
        nes.buttonUp(1, Controller.BUTTON_B);            
        nes.frame();                
  },
  DownA() {
        nes.buttonDown(1, Controller.BUTTON_A);        
        nes.frame();     
  },
  UpA() {
        nes.buttonUp(1, Controller.BUTTON_A);       
        nes.frame();         
  },
  DownB() {
        nes.buttonDown(1, Controller.BUTTON_B);        
        nes.frame();     
  },
  UpB() {
        nes.buttonUp(1, Controller.BUTTON_B);       
        nes.frame();         
  },
  // 触屏按下触发;
    gameDown(title) {
      switch(title.toUpperCase()) {
        case 'AB':  
      if(this.isClick1) {
            this.isClick1 = false;
            //事件
            this.DownAB();
            //定时器
            setTimeout(()=>{
            this.isClick1=true;
            }, 300);//一秒内不能重复点击
        }
        break;
        case 'X':
        // nes.buttonUp(1, Controller.BUTTON_A);                                                 
        // nes.frame();                         
        // nes.buttonDown(1, Controller.BUTTON_A);                                                 
        // nes.frame();                           
        // if(this.GameTimer) {
        //   clearInterval(this.GameTimer)
        // }
        // this.GameTimer=setInterval(()=> {           
        // nes.buttonUp(1, Controller.BUTTON_A);                                                 
        // nes.frame();                                
        // nes.buttonDown(1, Controller.BUTTON_A);         
        // nes.frame();                        
        // },300)
              if(this.isClick7) {
            this.isClick7 = false;
        nes.buttonUp(1, Controller.BUTTON_A);                                                 
        nes.frame();                         
        nes.buttonDown(1, Controller.BUTTON_A);                                                 
        nes.frame();                           
        if(this.GameTimer) {
          clearInterval(this.GameTimer)
        }            
            //事件
            this.GameTimer=setInterval(()=> {           
            nes.buttonUp(1, Controller.BUTTON_A);                                                 
            nes.frame();                                
            nes.buttonDown(1, Controller.BUTTON_A);         
            nes.frame();                        
            },300)
            //定时器
            setTimeout(()=>{
            this.isClick7=true;
            }, 300);//一秒内不能重复点击
        }
        break;
        case 'Y':   
        // nes.buttonUp(1, Controller.BUTTON_B);                                                 
        // nes.frame();                             
        // nes.buttonDown(1, Controller.BUTTON_B);                                                 
        // nes.frame();                                                
        // if(this.GameTimer) {
        //   clearInterval(this.GameTimer)
        // }
        // this.GameTimer=setInterval(()=> {           
        // nes.buttonUp(1, Controller.BUTTON_B);                                                 
        // nes.frame();                                
        // nes.buttonDown(1, Controller.BUTTON_B);         
        // nes.frame();                        
        // },300)
              if(this.isClick9) {
            this.isClick9 = false;
            //事件
              nes.buttonUp(1, Controller.BUTTON_B);                                                 
              nes.frame();                             
              nes.buttonDown(1, Controller.BUTTON_B);                                                 
              nes.frame();                                                
              if(this.GameTimer) {
                clearInterval(this.GameTimer)
              }
              this.GameTimer=setInterval(()=> {           
              nes.buttonUp(1, Controller.BUTTON_B);                                                 
              nes.frame();                                
              nes.buttonDown(1, Controller.BUTTON_B);         
              nes.frame();                        
              },300)        
            //定时器
            setTimeout(()=>{
            this.isClick9=true;
            }, 300);//一秒内不能重复点击
        }           
        break;
        // A
        case 'A':
      if(this.isClick3) {
            this.isClick3 = false;
            //事件
            this.DownA();
            //定时器
            setTimeout(()=>{
            this.isClick3=true;
            }, 300);//一秒内不能重复点击
        }
        break;
        // B
        case 'B':
      if(this.isClick5) {
            this.isClick5 = false;
            //事件
            this.DownB();
            //定时器
            setTimeout(()=>{
            this.isClick5=true;
            }, 300);//一秒内不能重复点击
        }           
        break;        
        // 默认;
        default:
          nes.buttonDown(1,Controller['BUTTON_'+title.toUpperCase()]);
          nes.frame();             
        break;
      }
    },

  // 触屏弹起触发; 
    gameUp(title) {
    switch(title.toUpperCase()) {
        case 'AB':
      if(this.isClick2) {
            this.isClick2 = false;
            //事件
            this.UpAB();
            //定时器
            setTimeout(()=>{
            this.isClick2=true;
            }, 300);//一秒内不能重复点击
        }
        break;
        case 'X':
        // clearInterval(this.GameTimer);
        // nes.buttonUp(1, Controller.BUTTON_A);                                                 
        // nes.frame();        
      clearInterval(this.GameTimer);
      if(this.isClick8) {
            this.isClick8 = false;
            //事件
        nes.buttonUp(1, Controller.BUTTON_A);                                                 
        nes.frame();        
            //定时器
            setTimeout(()=>{
            this.isClick8=true;
            }, 300);//一秒内不能重复点击
        }        
        break;
        case 'Y':
        // clearInterval(this.GameTimer);
        // nes.buttonUp(1, Controller.BUTTON_B);                                                 
        // nes.frame();              
        clearInterval(this.GameTimer);                          
              if(this.isClick10) {
            this.isClick10 = false;
            //事件
            nes.buttonUp(1, Controller.BUTTON_B);                                                 
            nes.frame();                                  
            //定时器
            setTimeout(()=>{
            this.isClick10=true;
            }, 300);//一秒内不能重复点击
        }
        break;
        case 'A':
      if(this.isClick4) {
            this.isClick4 = false;
            //事件
            this.UpA();
            //定时器
            setTimeout(()=>{
            this.isClick4=true;
            }, 300);//一秒内不能重复点击
        }
        break;
        case 'B':
      if(this.isClick6) {
            this.isClick6 = false;
            //事件
            this.UpB();
            //定时器
            setTimeout(()=>{
            this.isClick6=true;
            }, 300);//一秒内不能重复点击
        }  
        break;
        // 默认;
        default:
          nes.buttonUp(1,Controller['BUTTON_'+title.toUpperCase()]);
          nes.frame();             
        break;
    }
    },

// 从服务器获取rom
    loadBinary (path, callback, handleProgress) {
      var req = new XMLHttpRequest()
      req.open('GET', path)
      req.overrideMimeType('text/plain; charset=x-user-defined')
      req.onload = function () {
        if (this.status === 200) {
          callback(null, this.responseText)
        } else if (this.status === 0) {
        } else {
          callback(new Error(req.statusText))
        }
      }
      req.onerror = function () {
        callback(new Error(req.statusText))
      }
      req.onprogress = handleProgress
      req.send()
      return req
    },

// 加载rom;
    load () {
        let path=this.gameUrl+this.$route.query.rom;
        this.currentRequest = this.loadBinary(
          path,
          (err, data) => {
            if (err) {
              window.alert(`Error loading ROM: ${err.toString()}`)
            } else {
              _this.handleLoaded(data)
            }
          },
          _this.handleProgress
        )
    },

    handleProgress (e) {
      if (e.lengthComputable) {
        this.loadedPercent = e.loaded / e.total * 100
      }
    },

    handleLoaded (data) {
      this.uiEnabled = true
      this.running = true
      this.loading = false
      nes.loadROM(data)
      this.start()
    },

    start () {
      this.frameTimer.start()
      this.speakers.start()
      // this.fpsInterval = setInterval(() => {
      //   console.log(`FPS: ${nes.getFPS()}`)
      // }, 1000)
    },

    stop () {
      this.frameTimer.stop()
      this.speakers.stop()
      clearInterval(this.fpsInterval)
    },

    handlePauseResume () {
      if (this.paused) {
        this.paused = false
        this.start()
      } else {
        this.paused = true
        this.stop()
      }
    },

    out() {
      // this.running=false;
      if(this.running) {
      clearInterval(this.GameTimer);
      this.GameTimer=null;
      this.stop()
      this.running=false;
      window.removeEventListener('resize', this.layout)
      window.nes = undefined    
      }      
      this.$router.go(-1);
    },

    layout () {
      let navbarHeight = parseFloat(window.getComputedStyle(this.$refs.navbar).height)
      // this.$refs.screenContainer.style.height = `${window.innerHeight -
      // navbarHeight}px`
      this.$refs.screen.fitInParent()
    },

    toggleControlsModal () {
      this.controlsModal = !this.controlsModal
    }
  }
}
</script>

<style scoped>
@import '~assets/css/gamepad/runpage.css';
</style>
