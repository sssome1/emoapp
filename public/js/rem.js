function remSize() {
  let deviceWidth = document.documentElement.clientWidth;
  deviceWidth = deviceWidth >= 750 ? 750 : deviceWidth;
  deviceWidth = deviceWidth <= 320 ? 320 : deviceWidth;
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
}

remSize()
window.onresize=function(){
  remSize()
}
