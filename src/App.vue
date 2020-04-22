<template>
    <v-app>
        <v-app-bar app hide-on-scroll>
            <v-app-bar-nav-icon v-if="isSmallDisplay" @click="toggleDrawer()"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-btn href="/" text x-large>
                    COVID 19 API Vue
                </v-btn>
            </v-toolbar-title>

            <div v-if="!isSmallDisplay">
                <app-nav-item
                    v-for="route in routes"
                    :exact="route.name === 'Summary'"
                    :icon="route.icon"
                    :key="route.name"
                    :to="route.name"
                ></app-nav-item>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-if="isSmallDisplay" v-model="openDrawer" app temporary>
            <v-list nav>
                <v-subheader>Vue and COVID 19 API</v-subheader>

                <v-list-item
                    v-for="route in routes"
                    :exact="route.name === 'Summary'"
                    :key="route.name"
                    :to="route.path"
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
