<template>
  <van-popup
    v-model:show="isShowPlayer"
    round
    closeable
    close-icon="arrow-down"
    position="bottom"
    :style="{ height: '80%' }"
    close-on-popstate
    lazy-render
    teleport="#app"
    @click-close-icon="closePopup"
  >
    <div class="pl">
      <div
        class="plbg"
        :style="{ backgroundImage: `url(${playingSong.al.picUrl})` }"
      ></div>
      <!-- <div class="mask"></div> -->
      <div class="plContent">
        <div class="plTitle">
          <div class="title">
            <p class="sgName">{{ playingSong.name }}</p>
            <p class="arName">{{ playingSong.ar[0].name }}</p>
          </div>
        </div>
        <div class="plMain">
          <div class="plImg">
            <img :src="playingSong.al.picUrl" />
          </div>
          <div class="plLyrics" ref="plLyrics">
            <div class="lrcContent" ref="lrcContent">
              <p
                v-for="(lyric, index) in lyrics"
                :key="lyric"
                :class="{ hightlight: index == curLrcIndex - 1 }"
              >
                {{ lyric.lyricStr }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { useMusicStore } from "@/store/music";
import { toRef, ref, onMounted, onUnmounted, reactive } from "vue";
import emitter from "@/hooks/eventBus";
export default {
  setup() {
    const musicStore = useMusicStore();
    const playingSong = toRef(musicStore, "playingSong");
    const isShowPlayer = ref(false);
    const times = toRef(musicStore.lyrics, "times");
    const curLrcIndex = ref(0);
    const lrcContent = ref(null);
    const plLyrics = ref(null);

    const closePopup = function () {
      isShowPlayer.value = false;
    };
    onMounted(() => {
      emitter.on("showPlayer", (player) => {
        isShowPlayer.value = true;
        if(lrcContent.value!=null){
          plLyrics.value.scrollTop = lrcContent.value.children[curLrcIndex.value].offsetTop;
        }
        player.addEventListener("timeupdate", () => {
          if (player.currentTime > times.value[musicStore.curLyricIndex]) {
            plLyrics.value.scrollTop = lrcContent.value.children[curLrcIndex.value].offsetTop;
            musicStore.curLyricIndex++;
            curLrcIndex.value++;
          }
        });
      });
    });
    onUnmounted(() => {
      emitter.off("showPlayer");
    });
    return {
      isShowPlayer,
      closePopup,
      playingSong,
      curLrcIndex,
      lrcContent,
      plLyrics,
      lyrics: toRef(musicStore.lyrics, "lrc"),
    };
  },
};
</script>

<style lang="less">
.pl {
  position: relative;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.4rem;
  overflow: hidden;
  .plbg {
    height: 100%;
    background-size: 150%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    opacity: 1;
    transform: scale(1.5);
    transform-origin: center center;
    filter: blur(40px);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
  .plContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .plTitle {
      display: flex;
      padding: 0 0.3rem;
      padding-top: 0.2rem;
      height: 8%;
      .title {
        flex: 1 0 4rem;
        text-align: center;
        .sgName {
          font-size: 0.3rem;
        }
        .arName {
          font-size: 0.2rem;
        }
      }
    }
    .plMain {
      // height: 70%;
      overflow: hidden;
      .plImg {
        margin: 10% auto;
        width: 3rem;
        height: 3rem;
        border-radius: 0.2rem;
        background-color: #fff;
        overflow: hidden;
      }
      .plLyrics {
        position: relative;
        height: 4rem;
        padding: 0 0.8rem;
        text-align: center;
        overflow: scroll;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .lrcContent {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          transition: 0.2s;
          p {
            min-height: 0.3rem;
            font-size: 0.3rem;
            margin-bottom: 0.2rem;
          }
          .hightlight {
            font-size: 0.34rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
