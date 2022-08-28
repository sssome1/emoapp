<template>
  <List :searchResult=searchStore.searchResult></List>
</template>

<script>
import { useSearchStore } from "@/store/search";
import List from "@/components/List.vue";
export default {
  name: "SearchResult",
  components:{List},
  setup() {
    const searchStore = useSearchStore();
    return {
      searchStore,      
    };
  },
};
</script>

<style lang="less">

</style>
