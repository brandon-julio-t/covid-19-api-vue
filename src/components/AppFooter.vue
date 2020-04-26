<template>
  <v-footer app absolute padless>
    <v-row justify="center" no-gutters>
      <v-col>
        <v-card class="text-center">
          <v-card-text>
            Made with
            <app-external-link href="https://vuejs.org/" icon="mdi-vuejs">
              Vue
            </app-external-link>
            and
            <app-external-link href="https://vuetifyjs.com/en/" icon="mdi-vuetify">
              Vuetify
            </app-external-link>

            <br />

            Data sourced from
            <app-external-link href="https://covid19api.com/" icon="mdi-virus">
              COVID 19 API
            </app-external-link>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            Released under the
            <app-external-link href="https://opensource.org/licenses/MIT">
              MIT License
            </app-external-link>

            <br />

            Copyright &copy; {{ currentYear }} Brandon Julio Thenaro
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  import AppExternalLink from "./AppExternalLink"

  export default {
    name: "AppFooter",

    components: {
      AppExternalLink,
    },

    computed: {
      currentYear: function () {
        return new Date().getFullYear()
      },
    },
  }
</script>

<style scoped></style>
