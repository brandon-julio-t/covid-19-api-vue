import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Summary",
        icon: "mdi-earth",
        component: () => import("../views/Summary.vue"),
    },
    {
        path: "/detailed",
        name: "Detailed",
        icon: "mdi-chart-line",
        component: () => import("../views/Detailed.vue"),
    },
]

const router = new VueRouter({
    routes,
})

export default router

export { routes }
