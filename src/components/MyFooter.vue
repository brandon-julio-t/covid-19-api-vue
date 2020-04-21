<template>
    <v-footer app absolute padless>
        <v-row justify="center" no-gutters>
            <v-col>
                <v-card class="text-center">
                    <v-card-text>
                        Made with
                        <external-link href="https://vuejs.org/" icon="mdi-vuejs">
                            Vue
                        </external-link>
                        and
                        <external-link href="https://vuetifyjs.com/en/" icon="mdi-vuetify">
                            Vuetify
                        </external-link>

                        <br />

                        Data sourced from
                        <external-link href="https://covid19api.com/" icon="mdi-virus">
                            COVID 19 API
                        </external-link>
                    </v-card-text>

                    <v-divider />

                    <v-card-text>
                        Released under the
                        <external-link href="https://opensource.org/licenses/MIT">
                            MIT License
                        </external-link>

                        <br />

                        Copyright &copy; {{ new Date().getFullYear() }} Brandon Julio Thenaro
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
    import ExternalLink from "./subcomponents/ExternalLink"

    export default {
        name: "MyFooter",
        components: {
            ExternalLink
        },
    }
</script>

<style scoped></style>
