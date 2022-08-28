<template>
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    indicator-color="#00adb5"
    lazy-render
  >
    <van-swipe-item v-for="banner in banners" :key="banner.targetId">
      <img :src="banner.imageUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { useMusicStore } from "@/store/music";
import { toRef } from "@vue/reactivity";
export default {
  name: "Banner",
  setup() {
    const MusicStore = useMusicStore();
    const banners = toRef(MusicStore, "bannerInfos");
    return {
      banners,
    };
  },
};
</script>

<style lang="less">
.my-swipe {
  height: 100%;
  .van-swipe-item {
    text-align: center;
    background-color: #f5f5f5;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
