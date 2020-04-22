<template>
    <v-app>
        <v-app-bar app hide-on-scroll>
            <v-toolbar-title>
                <v-btn href="/" text x-large>
                    Vue and COVID 19 API
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon @click="toggleDrawer()" v-if="isSmallDisplay"></v-app-bar-nav-icon>

            <app-nav-item
                :exact="route.name === 'Summary'"
                :icon="route.icon"
                :key="route.name"
                :to="route.name"
                v-else
                v-for="route in routes"
            ></app-nav-item>
        </v-app-bar>

        <v-navigation-drawer app v-model="openDrawer" temporary v-if="isSmallDisplay">
            <v-list nav>
                <v-subheader>Vue and COVID 19 API</v-subheader>
                <v-list-item
                    :exact="route.name === 'Summary'"
                    :key="route.name"
                    :to="route.path"
                    v-for="route in routes"
                >
                    <v-list-item-icon>
                        <v-icon>{{ route.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ route.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <router-view></router-view>
        </v-content>

        <app-footer></app-footer>
    </v-app>
</template>

<script>
    import { routes } from "./router/index"

    import AppFooter from "./components/AppFooter"
    import AppNavItem from "./components/AppNavItem"

    export default {
        name: "App",

        components: {
            AppFooter,
            AppNavItem,
        },

        data: function () {
            return {
                openDrawer: false,
                routes: routes,
            }
        },

        computed: {
            isSmallDisplay: function () {
                return this.$vuetify.breakpoint.xsOnly
            },
        },

        methods: {
            toggleDrawer: function () {
                this.openDrawer = !this.openDrawer
            },
        },
    }
</script>
