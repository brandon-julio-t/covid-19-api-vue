<template>
  <v-container>
    <h1 class="display-2 text-center py-6">Summary</h1>

    <app-error v-if="error"></app-error>

    <v-row v-else-if="!data" justify="center">
      <v-col lg="8">
        <v-skeleton-loader class="text-center py-6" type="heading"></v-skeleton-loader>
        <v-skeleton-loader type="list-item@6"></v-skeleton-loader>
        <v-skeleton-loader class="text-center py-6" type="heading"></v-skeleton-loader>

        <v-row justify="center">
          <v-col lg="4">
            <v-skeleton-loader type="text"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-skeleton-loader type="table"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col lg="8">
        <section>
          <h2 class="display-1 text-center py-6">Global</h2>

          <v-simple-table>
            <tbody>
              <tr v-for="(data, index) in globalData" :key="index">
                <th scope="row" class="py-5 headline">
                  {{ data.key }}
                </th>
                <td class="headline">
                  {{ data.value }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </section>

        <section>
          <h2 class="display-1 text-center py-6">Countries</h2>

          <v-row justify="center">
            <v-col lg="6">
              <v-text-field
                v-model="search"
                clearable
                label="Search"
                outlined
                placeholder="Country Name / Number"
                prepend-inner-icon="mdi-filter"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-subheader class="d-flex justify-center pb-6"> API Date: {{ toLocaleDateTime(data.Date) }} </v-subheader>

          <v-data-table
            :headers="tableHeaders"
            :items-per-page="10"
            :items="countriesData"
            :search="search"
            item-key="Country"
          >
            <template v-slot:item.NewConfirmed="{ item }">
              {{ toLocaleNumber(item.NewConfirmed) }}
            </template>
            <template v-slot:item.TotalConfirmed="{ item }">
              {{ toLocaleNumber(item.TotalConfirmed) }}
            </template>
            <template v-slot:item.NewDeaths="{ item }">
              {{ toLocaleNumber(item.NewDeaths) }}
            </template>
            <template v-slot:item.TotalDeaths="{ item }">
              {{ toLocaleNumber(item.TotalDeaths) }}
            </template>
            <template v-slot:item.NewRecovered="{ item }">
              {{ toLocaleNumber(item.NewRecovered) }}
            </template>
            <template v-slot:item.TotalRecovered="{ item }">
              {{ toLocaleNumber(item.TotalRecovered) }}
            </template>
          </v-data-table>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AppError from "../components/AppError"

  export default {
    name: "Home",

    components: {
      AppError,
    },

    data() {
      return {
        data: null,
        error: null,
        search: "",
      }
    },

    computed: {
      globalData: function () {
        return Object.entries(this.data.Global).map(entry => {
          const [key, value] = entry
          return {
            key: this.splitByCapitalLetter(key),
            value: Number(value).toLocaleString(),
          }
        })
      },

      countriesData: function () {
        return this.data.Countries
      },

      tableHeaders: function () {
        return this.unusedProperties.map(key => {
          return {
            text: this.splitByCapitalLetter(key),
            value: key,
          }
        })
      },

      unusedProperties: function () {
        return Object.keys(this.countriesData[0]).filter(key => !["CountryCode", "Slug", "Date"].includes(key))
      },
    },

    created() {
      const summaryUrl = "https://api.covid19api.com/summary"

      fetch(summaryUrl)
        .then(response => response.json())
        .then(json => (this.data = json))
        .catch(err => (this.error = err))
    },

    methods: {
      splitByCapitalLetter: text => text.match(/[A-Z][a-z]+/g).join(" "), // https://stackoverflow.com/a/7888303

      toLocaleDateTime: date => new Date(date).toLocaleString(),

      toLocaleNumber: num => Number(num).toLocaleString(),
    },
  }
</script>

<style scoped></style>
