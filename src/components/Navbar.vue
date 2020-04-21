<template>
    <v-app-bar app hide-on-scroll>
        <v-toolbar-title>Vue and COVID 19 API</v-toolbar-title>

        <v-spacer />

        <div v-for="route in routes" :key="route.name">
            <nav-item :to="route.name" :exact="route.name === 'Summary'" />
        </div>
    </v-app-bar>
</template>

<script>
    import NavItem from "./subcomponents/NavItem"
    import { routes } from "../router/index"

    export default {
        name: "Navbar",

        components: {
            NavItem,
        },

        data: () => ({
            routes: routes
        })
    }
</script>

<style scoped></style>
