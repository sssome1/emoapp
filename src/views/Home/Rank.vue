<template>
  <div class="rank">
    <section
      class="hasTracks"
      v-for="item in musicStore.rankHasTracks"
      :key="item.id"
      @click="toDetails(item.id)"
    >
      <section class="coverImg">
        <img v-lazy="item.coverImgUrl" alt="" />
      </section>
      <section class="tracks">
        <h4>{{ item.name }}</h4>
        <div class="track">
          <p v-for="(track, index) in item.tracks" :key="track.first">
            <span>{{ index + 1 }}</span>
            {{ track.first }}-{{track.second}}
          </p>
        </div>
      </section>
    </section>
    <van-grid class="grid" :column-num="3" :border="false">
      <van-grid-item
        class="gridItem"
        v-for="item in musicStore.rankNoTracks"
        :key="item.id"
        @click="toDetails(item.id)"
      >
        <img v-lazy="item.coverImgUrl" />
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMusicStore } from "@/store/music";
export default {
  name: "Rank",
  setup() {
    const musicStore = useMusicStore();
    const router = useRouter();
    const toDetails = function (id) {
      router.push(`/listDetails/${id}`);
    };
    onMounted(() => {
      musicStore.getRankList();
    });
    return {
      musicStore,
      toDetails,
    };
  },
};
</script>

<style lang="less">
.rank {
  padding: 0.4rem 0.3rem;
  .hasTracks {
    display: flex;
    margin: 0 0.1rem;
    margin-bottom: 0.2rem;
    height: 2.4rem;
    background-color: #fff;
    border-radius: 0.2rem;
    overflow: hidden;
    .coverImg {
      flex: 0 0 2.4rem;
    }
    .tracks {
      flex: 1;
      padding: 0.1rem 0.2rem;
      h4 {
        font-size: 0.4rem;
      }
      .track {
        display: flex;
        flex-direction: column;
        margin-top: 0.1rem;
        width: 3.6rem;
        height: 1.5rem;
        p{
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.26rem;
        }
        span {
          font-weight: 600;
        }
      }
    }
  }
  .grid {
    margin-top: 0.2rem;
    .gridItem {
      --van-grid-item-content-background-color: #f9f9f9;
      img {
        width: 80%;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
