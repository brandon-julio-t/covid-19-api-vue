<template>
    <v-container>
        <h1 class="display-2 text-center py-6" id="Detailed">Detailed</h1>

        <error-view v-if="error" />

        <v-row justify="center" v-else-if="!countries">
            <v-col>
                <v-skeleton-loader type="text"></v-skeleton-loader>
            </v-col>
            <v-col>
                <v-skeleton-loader type="text"></v-skeleton-loader>
            </v-col>
        </v-row>

        <v-row justify="center" v-else>
            <v-col>
                <v-autocomplete
                    :items="countries"
                    cache-items
                    clearable
                    label="Country"
                    open-on-clear
                    outlined
                    v-model="selectedCountry"
                />
            </v-col>
            <v-col>
                <v-select
                    :items="
                        selectedCountryData && selectedCountryData.length > 0
                            ? Object.keys(selectedCountryData[0]).filter(key => key !== 'Date')
                            : []
                    "
                    label="Data Category"
                    no-data-text="Please select a country"
                    outlined
                    v-model="selectedCountryDataCategoryName"
                />
            </v-col>
        </v-row>

        <v-subheader class="d-flex justify-center" v-if="selectedCountryData && selectedCountryData.length <= 0">
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
                    {{ new Number(item.value).toLocaleString() }}
                </template>
            </v-sparkline>

            <v-row justify="center">
                <v-col md="4">
                    <v-row>
                        <v-col>
                            <v-switch v-model="fillSparkline" label="Graph fill" />
                        </v-col>
                        <v-col>
                            <v-switch v-model="animateSparkline" label="Graph animation" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <h2 class="display-1 text-center py-6">Timeline</h2>

            <v-timeline>
                <v-timeline-item right v-for="(data, index) in selectedCountryData" :key="index">
                    <span slot="opposite">{{ new Date(data.Date).toLocaleDateString() }}</span>

                    <v-card>
                        <v-card-text>Confirmed: {{ data.Confirmed }}</v-card-text>
                        <v-card-text>Deaths: {{ data.Deaths }}</v-card-text>
                        <v-card-text>Recovered: {{ data.Recovered }}</v-card-text>
                    </v-card>
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
    import ErrorView from "../components/subcomponents/ErrorView"

    export default {
        components: {
            ErrorView,
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
                        .sort((v1, v2) => {
                            const a = v1.text
                            const b = v2.text

                            return a < b ? -1 : a > b ? 1 : 0
                        })
                })
                .catch(err => (this.error = err))
        },

        data: () => ({
            animateSparkline: true,
            countries: null,
            error: null,
            fillSparkline: false,
            selectedCountry: "",
            selectedCountryCategorizedData: null,
            selectedCountryData: null,
            selectedCountryDataCategoryName: "",
        }),

        name: "Detailed",

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
                    category === "Confirmed" ? this.confirmed : category === "Deaths" ? this.deaths : this.recovered
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
