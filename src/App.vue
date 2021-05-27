<template>
  <div id="app">
    <imgholder v-show="ImgActive"></imgholder>
    <div id="nav">
      <div class="nav-btn">
        <van-icon
          name="bars"
          color="#fff"
          size="24px"
          style="line-height: 44px;"
          @click="navHeadler"
        />
      </div>
    </div>
    <popup ref="popup" :overlay="overlay"></popup>
    <div id="router" :style="routerStyle">
      <router-view />
    </div>
  </div>
</template>
<script>
import popup from "@/components/popup.vue";
import imgholder from "@/components/imgholder.vue";
export default {
  data() {
    return {
      show: false, //popup狀態
      overlay: true, //overlay狀態
      screen: "wide", //設備屏幕寬窄
      resizeWaiter: false,
      ImgActive: false,
      routerStyle: {
        width: "80vw",
        left: "50%"
      }
    };
  },
  components: {
    popup,
    imgholder
  },
  watch: {
    //監聽路由變化
    $route: "setBackground"
  },
  methods: {
    navHeadler() {
      //控制popup開關
      if (this.show === false) {
        this.$refs.popup.popupOn();
        this.show = true;
      } else {
        this.$refs.popup.popupOff();
        this.show = false;
      }
      this.routerPositionHandle();
    },
    routerPositionHandle() {
      //控制router窗口位置
      if (this.screen === "narrow") return;
      if(this.$route.path === "/")return;
      this.show === true
        ? (this.routerStyle.left = "60%")
        : (this.routerStyle.left = "50%");
    },
    matchMedia() {
      //媒體查詢
      if (window.matchMedia("(max-width: 900px)").matches) {
        this.screen = "narrow";
        this.overlay = true;
        this.routerStyle.width = "80vw";
      } else {
        this.screen = "wide";
        this.overlay = false;
        this.routerStyle.width = "50vw";
      }
    },
    screenMatch() {
      //監聽window窗口大小變化并自適應
      let self = this;
      window.onresize = function() {
        if (!this.resizeWaiter) {
          this.resizeWaiter = true;
          setTimeout(function() {
            self.matchMedia();
            this.resizeWaiter = false;
          }, 500);
        }
      };
    },
    setBackground() {
      //當主頁時顯示圖片
      if (this.$route.path === "/") {
        this.ImgActive = true;
      } else {
        this.ImgActive = false;
      }
    }
  },
  mounted() {
    this.matchMedia();
    this.screenMatch();
    this.setBackground();
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

#nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  z-index: 9999;
  padding: 0 30px;
  height: 44px;
  background-color: #db4c3f;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.nav-btn {
  cursor: pointer;
}
#router {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  transition: left 0.1s;
}
</style>
