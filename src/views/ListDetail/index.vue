<template>
  <div class="ldetail">
    <van-icon name="arrow-left" class="back" @click="onBack" />
    <div class="listbg">
      <img :src="playlist.coverImgUrl" />
    </div>
    <div class="listImg">
      <img :src="playlist.coverImgUrl" />
    </div>
    <section class="listContent">
      <p class="listTitle">{{ playlist.name }}</p>
      <section class="ls">
        <List :searchResult="playlist.tracks"></List>
      </section>
    </section>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import { onMounted, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMusicStore } from "@/store/music";
export default {
  name: "ListDetail",
  components: { List },
  setup() {
    const musicStore = useMusicStore();
    const router = useRouter();
    const route = useRoute();
    const playlist = toRef(musicStore, "playlist");
    const onBack = function () {
      router.back();
    };
    onMounted(() => {
      musicStore.getListDetails(route.params.listId);
    });
    return {
      playlist,
      onBack,
    };
  },
};
</script>

<style lang="less">
.ldetail {
  // margin-top: 0.86rem;
  .back {
    position: absolute;
    top: 0.4rem;
    left: 0.2rem;
    font-size: 0.4rem;
    z-index: 999;
  }
  .listbg {
    position: relative;
    height: 2rem;
    filter: blur(40px);
  }
  .listImg {
    position: absolute;
    top: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 10px;
    box-shadow: 0 7px 13px rgba(0, 0, 0, 21%);
    background-color: rgba(240, 240, 240, 0.8);
    overflow: hidden;
  }
  .listContent {
    padding-top: 1.6rem;
    background-color: #f9f9f9;
    border-radius: 0.2rem;
    //   padding-bottom: 2rem;
    .listTitle {
      margin: 0 auto;
      padding: 0rem 0.1rem;
      padding-bottom: 0.2rem;
      width: 60%;
      text-align: center;
      font-size: 0.3rem;
      border-radius: 999rem;
      border-bottom: 1px solid rgba(222, 222, 222, 0.3);
    }
    .ls {
      padding: 0 0.2rem;
      overflow: scroll;
    }
  }
}
</style>
