<template>
  <ul class="searchList">
    <li
      class="song"
      v-for="(song, index) in searchResult"
      :key="song.id"
      @click="onPlay(song)"
    >
      <span class="index">{{ resetIndex(index) }}</span>
      <div class="songInfo">
        <p class="sgtl">{{ song.name }}</p>
        <p class="sgar">{{ formatArtist(song.ar) }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import emitter from "@/hooks/eventBus";
import { toRaw } from "vue";
export default {
  name: "List",
  props: ["searchResult"],
  setup(props) {
    //排列索引格式化
    function resetIndex(index) {
      return index < 9 ? `0${index + 1}` : index + 1;
    }
    //歌曲艺术家格式化
    function formatArtist(artists) {
      const arr = [];
      toRaw(artists).forEach((ele) => {
        arr.push(ele.name);
      });
      return arr.join("/");
    }
    //播放选中的音乐
    function onPlay(song) {
      emitter.emit("playMusic", song);
    }
    return {
      resetIndex,
      formatArtist,
      onPlay,
      toRaw
    };
  },
};
</script>

<style lang="less">
.searchList {
  margin: 0.86rem 0.3rem 1.4rem;
  .song {
    display: flex;
    height: 1.2rem;
    .index {
      padding: 0 0.1rem;
      line-height: 1.2rem;
      font-size: 0.34rem;
      font-weight: 500;
    }
    .songInfo {
      margin-left: 0.3rem;
      line-height: 0.9rem;
      p {
        height: 50%;
      }
      .sgtl {
        width: 5rem;
        font-size: 0.28rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sgar {
        margin-top: -0.2rem;
        font-size: 0.2rem;
        color: #cccccc;
      }
    }
  }
  
}
</style>
