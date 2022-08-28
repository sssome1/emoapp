<template>
  <div
    class="playcenter"
    v-show="songName != '' && route.path.indexOf('/player') == -1"
    @click="showPlayer"
  >
    <div class="playbg">
      <audio
        src=""
        ref="player"
        @ended="onEnded"
        volume="0.2"
        loop="true"
      ></audio>
      <div class="cover">
        <div class="imgbox">
          <img :src="imgUrl" />
        </div>
      </div>
      <div class="content">
        <h4 class="songName">{{ songName }}</h4>
        <span class="artist">{{ artistName }}</span>
      </div>
      <div class="icon">
        <van-icon
          :name="playerIcon()"
          size="0.6rem"
          @click.stop="onControlPlayer"
        />
      </div>
    </div>
  </div>
  <Player></Player>
</template>

<script>
import { ref, onUnmounted, onMounted, reactive, toRefs, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import Player from '@/components/Player.vue';
import emitter from "@/hooks/eventBus";
import {
  playMusic,
  controlPlayer,
  updatePlayer,
  musicEnded,
} from "@/hooks/audio";
import { useMusicStore } from "@/store/music";
export default {
  name: "PlayerMin",
  components:{Player},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const musicStore = useMusicStore();
    const player = ref(null);
    const playerInfo = reactive({
      imgUrl: "",
      isPlaying: false,
      songName: "",
      artistName: "",
    });
    //根据isPlaying决定icon
    const playerIcon = function () {
      return playerInfo.isPlaying ? "pause-circle-o" : "play-circle-o";
    };
    //控制音乐播放或暂停
    const onControlPlayer = function () {
      controlPlayer(player.value, playerInfo);
    };
    //音乐播放结束
    const onEnded = function () {
      musicEnded(playerInfo);
    };
    //弹出歌曲详情块
    const showPlayer = function () {
      emitter.emit("showPlayer",player.value);
      //发请求获取歌词
      musicStore.getLyrics();
    };
    onMounted(() => {
      emitter.on("playMusic", (song) => {
        let url = ` https://music.163.com/song/media/outer/url?id=${song.id}.mp3`;
        playMusic(player.value, url, musicStore)
          .then((res) => {
            updatePlayer(playerInfo, song);
            musicStore.updatePlayingSong(song);
          })
          .catch((err) => {
            playerInfo.isPlaying = false;
            alert('对不起，该歌曲暂无版权')
          });
      });
    });
    onUnmounted(() => {
      emitter.off("playMusic");
    });
    return {
      route,
      player,
      ...toRefs(playerInfo),
      playerIcon,
      onControlPlayer,
      onEnded,
      showPlayer,
    };
  },
};
</script>

<style lang="less">
.playcenter {
  padding: 0.2rem;
  height: 100%;
  .playbg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 14px;
    .cover {
      margin: 0.2rem;
      .imgbox {
        width: 0.94rem;
        height: 0.94rem;
        border-radius: 0.26rem;
        overflow: hidden;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
    }
    .content {
      flex: 1;
      margin-left: 0.2rem;
      height: 100%;
      .songName {
        font-size: 0.24rem;
        margin-top: 0.3rem;
      }
      .artist {
        display: block;
        padding-top: 0.06rem;
        font-size: 0.2rem;
        color: #393e46;
      }
    }
    .icon {
      margin-top: 0.1rem;
      margin-right: 0.3rem;
    }
  }
}
</style>
