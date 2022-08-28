<template>
  <section class="recItem">
    <h4 class="mtitle">{{title}}</h4>
    <ul class="slList">
      <li
        class="slItem"
        v-for="item in playlist"
        :key="item.id"
        @click="toDetails(item.id)"
      >
        <section class="slImg">
          <img v-lazy="item.picUrl||item.coverImgUrl" />
        </section>
        <section class="slInfo">
          <p class="slTitle">{{ item.name }}</p>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  name: "ListMod",
  props:['playlist','title'],
  setup(props) {
    const router = useRouter();
    const toDetails = function (id) {
      router.push(`/listDetails/${id}`);
    };
    return{
        toDetails
    }
  },
};
</script>

<style lang="less">
.recItem {
  margin-bottom: 0.2rem;
  padding: 0.2rem;
  height: 4rem;
  overflow: hidden;
  .mtitle {
    margin-left: 0.2rem;
    font-size: 0.4rem;
  }
  .slList {
    display: flex;
    overflow: scroll;
    height: 3.6rem;
    .slItem {
      flex: 0 0 2.6rem;
      padding: 0.2rem;
      .slImg {
        height: 2.2rem;
        border-radius: 0.2rem;
        overflow: hidden;
      }
      .slInfo {
        margin-top: 0.1rem;
        .slTitle {
          font-size: 0.26rem;
          line-height: 0.3rem;
          letter-spacing: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
