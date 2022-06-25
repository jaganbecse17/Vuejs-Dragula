import VueRouter from "vue-router";
import store from "@/store";
// lazy loading utility function
function lazy(path) {
  return () => import(`@/components/${path}Component.vue`);
}
export function addroutes(route) {
  let cur = {
    ...route,
    component: () => import(`@/components/${route.aliasname}Component.vue`),
  };
  console.log("route", route.aliasname);
  // routes.push(cur);
  router.addRoute(cur);
  console.log("routes", routes);
}
var routes = [
  {
    path: "/form",
    name: "form",
    component: lazy("Form"),

    aliasname: "Form",
    meta: {
      auth: ["admin"],
    },
  },
  {
    path: "/",
    name: "home",
    component: lazy("Home"),
    auth: true, //use flag for check auth guard
    meta: {
      auth: ["admin", "dev", ""],
    },
  },
  {
    path: "/about/:name/:project",
    name: "about",
    component: lazy("About"),
    props: true,
    meta: {
      auth: ["admin", "dev"],
    },
  },
  // {
  //   path: "/form",
  //   name: "form",
  //   component: lazy("Form"),
  //   meta: {
  //     auth: ["admin"],
  //   },
  // },
  {
    path: "/parent",
    name: "parent",
    component: lazy("Parent"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/store",
    name: "store",
    component: lazy("Store"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/network",
    name: "network",
    component: lazy("Network"),
    meta: {
      auth: ["admin"],
    },
  },
  {
    path: "/style",
    name: "style",
    component: lazy("Utils"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/table",
    name: "table",
    component: lazy("Table"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    name: "other",
    path: "/about/other",
    component: lazy("Other"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    name: "others",
    path: "/about/others",
    component: lazy("Table"),
    meta: {
      auth: ["admin", "dev"],
    },
  },

  {
    name: "routeparent",
    path: "/routeparent",
    component: lazy("routingcomponent/Parent"),
    meta: {
      auth: ["admin", "dev"],
    },
    redirect: "firstroute",
    children: [
      {
        name: "firstroute",
        path: "/firstroute",
        component: lazy("routingcomponent/First"),
        meta: {
          auth: ["admin", "dev"],
        },
      },
      {
        name: "secondroute",
        path: "/secondroute",
        component: lazy("routingcomponent/Second"),
        meta: {
          auth: ["admin", "dev"],
        },
      },
    ],
  },
  // fallback
  {
    path: "*",
    name: "404",
    component: lazy("PageNotFound"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    name: "noaccess",
    path: "/noacc",
    component: lazy("NoAccess"),
    meta: {
      auth: ["admin", "dev", ""],
    },
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

// const role = "admin";
router.beforeEach((to, from, next) => {
  // console.log("router", from, to);
  // if (to.name === "parent") {
  //   next({ name: "404" });
  // } else {
  //   next();
  // }
  let role = store.state.profile;
  console.log("to.meta.auth", role.role);
  if (to.meta.auth.includes(role.role)) {
    next();
  } else {
    next({ name: "noaccess" });
  }

  // return true;
});
export default router;
