import { defineStore } from "pinia";
import { timeFormat } from "@/hooks/timeFormat";
import {
  reqPersonalized,
  reqHightQuality,
  reqRankList,
  reqListDetails,
  reqNetizen,
  reqLyrics,
} from "@/api/index";

export const useMusicStore = defineStore("music", {
  state: () => ({
    personalized: {},
    hightquality: {},
    netizen: {},
    rankList: [],
    playlist: {},
    playingSong: {},
    lyrics: {
      id: "",
      lrc: [],
      times: [],
    },
    curLyricIndex:0
  }),
  getters: {
    rankHasTracks: (state) => {
      return state.rankList.slice(0, 4);
    },
    rankNoTracks: (state) => {
      return state.rankList.slice(4, 37);
    },
  },
  actions: {
    //获取推荐歌单
    async getPersonalized() {
      const result = await reqPersonalized();
      if (result.code == 200) {
        this.personalized = result.result;
      } else {
        return Promise.reject("failed to get personalized");
      }
    },
    //获取精品歌单
    async getHightquality() {
      const result = await reqHightQuality();
      if (result.code == 200) {
        this.hightquality = result.playlists;
      } else {
        return Promise.reject("falid to get hightquality");
      }
    },
    //获取网友精选碟
    async getNetizen() {
      const result = await reqNetizen();
      if (result.code == 200) {
        this.netizen = result.playlists;
      } else {
        return Promise.reject("falid to get netizen");
      }
    },
    //获取排行榜详情
    async getRankList() {
      const result = await reqRankList();
      if (result.code == 200) {
        this.rankList = result.list;
      } else {
        return Promise.reject("failed to get rankList");
      }
    },
    //获取歌单详情
    async getListDetails(listId) {
      this.playlist = {};
      const result = await reqListDetails(listId);
      if (result.code == 200) {
        this.playlist = result.playlist;
      } else {
        return Promise.reject("failed to get listDetails");
      }
    },
    //获取歌词
    async getLyrics() {
      let id = this.playingSong.id;
      if (this.lyrics.id != id) {
        const result = await reqLyrics(id);
        if (result.code == 200) {
          this.lyrics.id = id;
          //重新定义歌词数据格式
          const lyric = result.lrc.lyric.split("\n");
          const timeArr = [];
          const lyricInfo = lyric.map((ele, index) => {
            const spIndex = ele.indexOf("]");
            const timeStr = ele.slice(1, spIndex);
            timeArr.push(timeFormat(timeStr));
            const lyricStr = ele.slice(spIndex + 1);
            return {
              timeStr,
              lyricStr,
            };
          });
          this.lyrics.lrc = lyricInfo;
          this.lyrics.times = timeArr;
        } else {
          return Promise.reject("faild to get lyrics");
        }
      }
    },
    //更新正在播放的歌曲
    updatePlayingSong(song) {
      this.playingSong = song;
    },
  },
});
