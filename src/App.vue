<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <Main />
    <div class="playermin">
      <PlayerMin></PlayerMin>
    </div>
    
  </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import PlayerMin from "@/components/PlayerMin";
import Player from "@/components/Player";
export default {
  components: { Header, Main, PlayerMin, Player },
  setup() {
    
    return {

    };
  },
};
</script>

<style>
@import "@/fonts/font_3539123_px75wan228h/iconfont.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
html {
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
  position: relative;
  letter-spacing: 1px;
}
#app {
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
img[src=""],
img:not([src]) {
  opacity: 0;
}
.icon {
  font-size: 0.5rem;
}
.container {
  height: 100%;
  border-top: 1px solid #fff;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
.playermin {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.6rem;
}
.toast {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  /* width: 2rem; */
  margin: 0 auto;
  padding: 0.1rem 0.2rem;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
  background: #4a4a4b;
  border-radius: 0.14rem;
}
.endTips {
  text-align: center;
  font-size: 0.3rem;
  color: #cccccc;
}
</style>
