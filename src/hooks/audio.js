
let timer
//播放音乐
export const playMusic = function (audio, url) {
  audio.src = url;
  const result=audio.play();
  return result
};
//控制播放或暂停
export const controlPlayer = function (audio, playerInfo) {
  if (playerInfo.isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  playerInfo.isPlaying = !playerInfo.isPlaying;
};
//音乐播放结束
export const musicEnded = function (playerInfo) {
  playerInfo.isPlaying = false;
};
//更新缩略播放器信息
export const updatePlayer = function (playerInfo, song) {
  playerInfo.imgUrl = song.al.picUrl;
  playerInfo.isPlaying = true;
  playerInfo.songName = song.name;
  const arr = [];
  for (let i = 0; i < song.ar.length; i++) {
    arr.push(song.ar[i].name);
  }
  playerInfo.artistName = arr.join("/");
};
