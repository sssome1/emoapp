<template>
  <div class="searchContainer" v-show="isShow()">
    <van-search
      class="search"
      v-model="keyword"
      placeholder="搜索歌曲"
      shape="round"
      @search="onSearch"
      clearable
    />
    <span
      class="cancel"
      @click="onCancel"
      v-show="route.path.indexOf('/search') != -1"
      >取消</span
    >
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/store/search";
import debounce from "../hooks/debounce";
export default {
  name: "Header",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const searchStore = useSearchStore();
    const keyword = ref("");

    const isShow = function () {
      const paths = ["/listDetails", "/player"];
      let flag=true
      paths.forEach((ele) => {
        if (route.path.indexOf(ele) != -1) {
          flag=false;
        }
      });
      return flag;
    };

    const onSearch = () => {
      searchStore.getSearchResult(keyword.value);
      router.push("/search/searchResult");
    };

    //搜索框输入关键词发送请求函数防抖
    let requestSearchSuggest = debounce(() => {
      //keyword不为空时发送请求
      if (keyword.value != "") {
        searchStore.getSearchSuggest(keyword.value);
      } else {
        searchStore.searchSuggest = {};
      }
    }, 500);

    //监听keword发送请求
    watch(keyword, (newValue, oldValue) => {
      //关键词不为空（取消键置空keyword会被监听到）,或在/search/searchResult下修改关键词,路由跳转到/search
      if (keyword.value != "" && route.path.indexOf("/searchResult")) {
        router.push("/search");
      }
      requestSearchSuggest();
    });

    //点击取消触发
    function onCancel() {
      keyword.value = "";
      router.push("/home");
    }
    return { keyword, isShow, onCancel, route, onSearch };
  },
};
</script>

<style lang="less" scoped>
.searchContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  .search {
    flex: 1 0 6.2rem;
    input {
      border-radius: 40px;
    }
  }
  .cancel {
    flex: 1;
    display: block;
    margin-left: -0.1rem;
    font-size: 0.28rem;
  }
}
</style>
