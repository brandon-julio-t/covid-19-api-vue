<template>
    <v-app>
        <navbar />

        <v-content>
            <router-view />
        </v-content>

        <my-footer />
    </v-app>
</template>

<script>
    import MyFooter from "./components/MyFooter"
    import Navbar from "./components/Navbar"

    export default {
        name: "App",

        components: {
            MyFooter,
            Navbar
        },
    }
</script>
