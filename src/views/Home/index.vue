<template>
  <div class="home">
    <!-- 导航 -->
      <van-tabs v-model:active="navActive" color="#00adb5" sticky>
        <van-tab
          v-for="navItem in navList"
          :title="navItem.title"
          :key="navItem"
          :to="navItem.path"
        >
        </van-tab>
      </van-tabs>
    <div class="discoverMusic">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <p class="copyright">copyright©陈梓楷🤣🤣🤣</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
export default {
  name: "Home",
  setup(props) {
    const route = useRoute();
    const navList = [
      {
        iconName: "icon-gedan",
        title: "推荐",
        path: "/home/recommond",
      },
      {
        iconName: "icon-paihangbang",
        title: "排行榜",
        path: "/home/rank",
      },
    ];
    const navActive = ref(initNavActive());
    //初始化navActive
    function initNavActive() {
      let num;
      navList.forEach((ele, index) => {
        if (ele.path == route.path) {
          num = index;
        }
      });
      return num;
    }
    function changeActive(index) {
      navActive.value = index;
    }
    onBeforeRouteLeave(() => {
      navActive.value = 0;
    });
    return { navActive, navList, changeActive };
  },
};
</script>

<style lang="less">
.home {
  margin-top: 0.86rem;
  padding-bottom: 1.6rem;
  height: 100%;
  // background-color: #f7f7f7;
}
.discoverMusic{
  padding: 0.2rem 0 0.4rem;
  background-color: #f7f7f7;
}
.copyright {
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>
