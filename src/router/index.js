import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    component: () => import("@/views/Home"),
    redirect:'/home/recommond',
    children: [
          {
            path:"rank",
            component:()=>import("@/views/Home/Rank")
          },
          {
            path:"recommond",
            component:()=>import("@/views/Home/Recommond")
          },
        ],
  },
  {
    path: "/search",
    component: () => import("@/views/Search"),
    children:[
      {
        path:'searchResult',
        component:()=>import('@/views/Search/SearchResult')
      }
    ]
  },
  {
    path:'/listDetails/:listId',
    component:()=>import('@/views/ListDetail')
  },
  {
    path:'/:pathMatch(.*)',
    redirect:'/home',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
