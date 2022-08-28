<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Main",
  setup(props) {
    
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
</style>
