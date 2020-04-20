<template>
    <v-app>
        <v-app-bar app>
            <v-row justify="center">
                <nav-item to="Summary" :exact="true" />
            </v-row>
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
    import NavItem from "./components/NavItem"

    export default {
        name: "App",

        components: {
            NavItem,
        },

        data: () => ({
            //
        }),
    }
</script>
