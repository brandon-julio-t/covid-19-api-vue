import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Summary",
        component: () => import("../views/Summary.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
