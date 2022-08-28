<template>
  <ul class="suggestList" v-if="searchStore.searchSuggest && isShowKeywords">
    <li
      class="suggestItem"
      v-for="item in searchStore.searchSuggest"
      :key="item"
      @click="searchSongs(item.keyword)"
    >
      {{ item.keyword }}
    </li>
  </ul>
  <router-view></router-view>
</template>

<script>
import { useSearchStore } from "@/store/search";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "Search",
  setup() {
    const searchStore = useSearchStore();
    const router = useRouter();
    const route = useRoute();
    const isShowKeywords = computed(() => {
      return route.path.indexOf("/searchResult") != -1 ? false : true;
    });
    function searchSongs(keyword) {
      searchStore
        .getSearchResult(keyword)
        .then(() => {})
        .catch((err) => {
          alert(err.response.data.message)
        });

      router.push("/search/searchResult");
    }
    return {
      searchStore,
      searchSongs,
      route,
      isShowKeywords,
    };
  },
};
</script>

<style lang="less">
.suggestList {
  margin-top: 0.86rem;
  padding: 0.2rem 0.3rem;
  .suggestItem {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    border-bottom: 1px solid rgba(244, 244, 244, 0.6);
  }
  .sres {
    padding: 0 0.2rem;
  }
}
</style>
