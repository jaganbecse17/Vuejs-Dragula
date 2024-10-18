import VueRouter from "vue-router";
// import store from "@/store";
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

    component: () =>
      import(
        /* webpackChunkName: "FormComponent" */ `@/components/pages/FormComponent.vue`
      ),

    aliasname: "Form",
    meta: {
      auth: ["admin"],
    },
  },
  {
    path: "/",
    name: "home",
    component: lazy("pages/Home"),
    auth: true, //use flag for check auth guard
    meta: {
      auth: ["admin", "dev", ""],
    },
  },
  {
    path: "/mobile",
    name: "mobile",
    component: lazy("pages/Home"),
    auth: true,
    meta: {
      auth: ["admin", "dev", ""],
    },
  },
  {
    path: "/about/:name/:project",
    name: "about",
    component: lazy("pages/About"),
    props: true,
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/webview",
    name: "webview",
    component: lazy("pages/WebView"),
    meta: {
      auth: ["admin", "dev", ""],
    },
  },
  {
    path: "/audio",
    name: "audio",
    component: () =>
      import(
        /* webpackChunkName: "[request]" */ `@/components/pages/AudioComponent.vue`
      ),
    meta: {
      auth: ["admin", "dev", ""],
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
    component: lazy("pages/Parent"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/store",
    name: "store",
    component: lazy("pages/Store"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/network",
    name: "network",
    component: lazy("pages/Network"),
    meta: {
      auth: ["admin"],
    },
  },
  {
    path: "/other",
    name: "other",
    component: lazy("pages/Other"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/style",
    name: "style",
    component: lazy("pages/Utils"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    path: "/table",
    name: "table",
    component: lazy("pages/Table"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    name: "practice",
    path: "/practice",
    component: lazy("practice/Demo"),
    meta: {
      auth: ["admin", "dev"],
    },
  },
  {
    name: "others",
    path: "/about/others",
    component: lazy("pages/Table"),
    meta: {
      auth: ["admin", "dev"],
    },
  },

  {
    name: "routeparent",
    path: "/routeparent",
    component: lazy("pages/routingcomponent/Parent"),
    meta: {
      auth: ["admin", "dev"],
    },
    redirect: "firstroute",
    children: [
      {
        name: "firstroute",
        path: "/firstroute",
        component: lazy("pages/routingcomponent/First"),
        meta: {
          auth: ["admin", "dev"],
        },
      },
      {
        name: "secondroute",
        path: "/secondroute",
        component: lazy("pages/routingcomponent/Second"),
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
  // {
  //   name: "noaccess",
  //   path: "/noacc",
  //   component: lazy("NoAccess"),
  //   meta: {
  //     auth: ["admin", "dev", ""],
  //   },
  // },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

// const role = "admin";
// router.beforeEach((to, from, next) => {
//   // console.log("router", from, to);
//   // if (to.name === "parent") {
//   //   next({ name: "404" });
//   // } else {
//   //   next();
//   // }
//   // let { role } = store.state.profile;
//   // // console.log("to.meta.auth", role);
//   // if (to.meta.auth.includes(role)) {
//   //   next();
//   // } else {
//   //   next({ name: "noaccess" });
//   // }
//   next()
//   // return true;
// });
export default router;
