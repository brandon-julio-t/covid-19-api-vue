<template>
    <v-container>
        <h1 class="display-2 text-center py-6" id="Detailed">Detailed</h1>

        <app-error v-if="error"></app-error>

        <v-row v-else-if="!countries" justify="center">
            <v-col>
                <v-skeleton-loader type="text"></v-skeleton-loader>
            </v-col>
            <v-col>
                <v-skeleton-loader type="text"></v-skeleton-loader>
            </v-col>
        </v-row>

        <v-row v-else justify="center">
            <v-col lg="4">
                <v-autocomplete
                    v-model="selectedCountry"
                    :items="countries"
                    cache-items
                    clearable
                    label="Country"
                    open-on-clear
                    outlined
                ></v-autocomplete>
            </v-col>
            <v-col lg="4">
                <v-select
                    v-model="selectedCountryDataCategoryName"
                    :disabled="!selectedCountryDataHasValue"
                    :items="selectedCountryDataKeys"
                    label="Data Category"
                    outlined
                ></v-select>
            </v-col>
        </v-row>

        <v-subheader v-if="selectedCountryData && selectedCountryData.length <= 0" class="d-flex justify-center">
            No Data
        </v-subheader>

        <section v-else-if="selectedCountryCategorizedData">
            <h2 class="display-1 text-center py-6">Graph</h2>

            <v-sparkline
                :auto-draw="animateSparkline"
                :fill="fillSparkline"
                :gradient="['#eeaeca', '#94bbe9']"
                :value="selectedCountryCategorizedData"
                label-size="2.5"
                line-width="1"
                padding="12"
                show-labels
                smooth="0"
                stroke-linecap="round"
            >
                <template v-slot:label="item">
                    {{ toLocaleNumber(item.value) }}
                </template>
            </v-sparkline>

            <v-row justify="center">
                <v-col lg="2" sm="3">
                    <v-row justify="center">
                        <v-switch v-model="fillSparkline" label="Graph fill"></v-switch>
                    </v-row>
                </v-col>
                <v-col lg="2" sm="3">
                    <v-row justify="center">
                        <v-switch v-model="animateSparkline" label="Graph animation"></v-switch>
                    </v-row>
                </v-col>
            </v-row>

            <h2 class="display-1 text-center py-6">Timeline</h2>

            <v-timeline>
                <v-timeline-item v-for="(data, index) in selectedCountryData" :key="index" right>
                    <span slot="opposite">{{ toLocaleDate(data.Date) }}</span>

                    <v-row>
                        <v-col lg="4" md="6" sm="8">
                            <v-card>
                                <v-card-text>Confirmed: {{ toLocaleNumber(data.Confirmed) }}</v-card-text>
                                <v-card-text>Deaths: {{ toLocaleNumber(data.Deaths) }}</v-card-text>
                                <v-card-text>Recovered: {{ toLocaleNumber(data.Recovered) }}</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>

            <v-row class="py-6" justify="center">
                <v-btn @click="$vuetify.goTo('#Detailed', { duration: 1000, easing: 'easeInOutCubic' })">
                    Back to Top
                </v-btn>
            </v-row>
        </section>
    </v-container>
</template>

<script>
    import AppError from "../components/AppError"

    export default {
        name: "Detailed",

        components: {
            AppError,
        },

        data: function () {
            return {
                animateSparkline: true,
                countries: null,
                error: null,
                fillSparkline: false,
                selectedCountry: "",
                selectedCountryCategorizedData: null,
                selectedCountryData: null,
                selectedCountryDataCategoryName: "",
            }
        },

        computed: {
            confirmed: function () {
                return !this.selectedCountryData
                    ? []
                    : this.selectedCountryData.map(data => data.Confirmed).filter(data => data > 0)
            },
            deaths: function () {
                return !this.selectedCountryData
                    ? []
                    : this.selectedCountryData.map(data => data.Deaths).filter(data => data > 0)
            },
            recovered: function () {
                return !this.selectedCountryData
                    ? []
                    : this.selectedCountryData.map(data => data.Recovered).filter(data => data > 0)
            },

            selectedCountryDataHasValue: function () {
                return this.selectedCountryData && this.selectedCountryData.length > 0
            },

            selectedCountryDataKeys: function () {
                return this.selectedCountryDataHasValue
                    ? Object.keys(this.selectedCountryData[0]).filter(key => key !== "Date")
                    : []
            },
        },

        watch: {
            selectedCountry: function (country) {
                if (country) {
                    const countryDataUrl = `https://api.covid19api.com/total/country/${country}`

                    fetch(countryDataUrl)
                        .then(res => res.json())
                        .then(json => {
                            this.selectedCountryData = json
                                .map(data => ({
                                    Confirmed: data.Confirmed,
                                    Deaths: data.Deaths,
                                    Recovered: data.Recovered,
                                    Date: data.Date,
                                }))
                                .filter(data => {
                                    return data.Confirmed > 0 && data.Deaths > 0 && data.Recovered > 0
                                })

                            if (this.selectedCountryData && this.selectedCountryData.length > 0) {
                                this.selectedCountryCategorizedData = this.confirmed
                                this.selectedCountryDataCategoryName = "Confirmed"
                            }
                        })
                        .catch(err => (this.error = err))
                }
            },

            selectedCountryDataCategoryName: function (category) {
                this.selectedCountryCategorizedData =
                    category === "Confirmed" // Prevent prettier formatting into one line
                        ? this.confirmed
                        : category === "Deaths"
                        ? this.deaths
                        : this.recovered
            },
        },

        created() {
            const countriesUrl = "https://api.covid19api.com/countries"

            fetch(countriesUrl)
                .then(response => response.json())
                .then(json => {
                    this.countries = json
                        .map(j => ({
                            text: j.Country,
                            value: j.ISO2,
                        }))
                        /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
                        .sort((v1, v2) => {
                            const a = v1.text
                            const b = v2.text
                            return a < b ? -1 : a > b ? 1 : 0
                        })
                })
                .catch(err => (this.error = err))
        },

        methods: {
            toLocaleNumber: function (n) {
                return Number(n).toLocaleString()
            },

            toLocaleDate: function (d) {
                return new Date(d).toLocaleDateString()
            },
        },
    }
</script>

<style scoped>
    svg >>> text {
        /* https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation */
        writing-mode: vertical-rl;
        text-orientation: mixed;
    }
</style>
