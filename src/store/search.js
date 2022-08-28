import { defineStore } from "pinia";
import { reqSearchSuggest, reqSearchResult } from "@/api/index";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchSuggest: {},
    searchResult: {},
  }),
  getters: {
    
  },
  actions: {
    async getSearchSuggest(keyword) {
      const result = await reqSearchSuggest(keyword);
      if (result.code == 200) {
        this.searchSuggest = result.result.allMatch;
      } else {
        return Promise.reject("请求失败！");
      }
    },
    async getSearchResult(keyword) {
      //清除之前searchResult的记录
      this.searchResult={}
      const result = await reqSearchResult(keyword);
      if (result.code == 200) {
        this.searchResult = result.result.songs;
      } else {
        return Promise.reject("请求失败！");
      }
    },
  },
});
