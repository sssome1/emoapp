<template>
  <ListMod :playlist="musicStore.personalized" title="推荐歌单"></ListMod>
  <ListMod :playlist="musicStore.hightquality" title="精品歌单"></ListMod>
  <ListMod :playlist="musicStore.netizen" title="网友精选碟"></ListMod>
</template>

<script>
import { useMusicStore } from "@/store/music";
import { onMounted } from "vue";
import ListMod from '@/components/ListMod';
export default {
  name: "Recommond",
  components:{ListMod},
  setup() {
    const musicStore = useMusicStore();
    
    onMounted(() => {
      musicStore.getPersonalized();
      musicStore.getHightquality();
      musicStore.getNetizen();
    });

    return {
      musicStore,
    };
  },
};
</script>

<style lang="less">

</style>
