import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import { createPinia } from "pinia";
import {
  Search,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Icon,
  PullRefresh,
  Loading,
  Grid,
  GridItem,
  Lazyload,
  Popup,
} from "vant";

const app = createApp(App);
app.use(router).use(createPinia()).mount("#app");
app.config.globalProperties.$bus = new mitt();

app.use(Search);
app.use(Tab);
app.use(Tab);
app.use(Tabs);
app.use(Swipe);
app.use(SwipeItem);
app.use(Icon);
app.use(PullRefresh);
app.use(Loading);
app.use(Grid);
app.use(GridItem);
app.use(Lazyload);
app.use(Popup);
