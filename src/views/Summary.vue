<template>
    <v-container>
        <h1 class="display-2 text-center py-6">Summary</h1>

        <error-view v-if="error" />

        <v-row justify="center" v-else-if="!data">
            <v-col md="8">
                <v-skeleton-loader class="text-center py-6" type="heading" />
                <v-skeleton-loader type="list-item@6" />
                <v-skeleton-loader class="text-center py-6" type="heading" />

                <v-row justify="center">
                    <v-col md="4">
                        <v-skeleton-loader type="text" />
                    </v-col>
                </v-row>

                <v-skeleton-loader type="table" />
            </v-col>
        </v-row>

        <v-row justify="center" v-else>
            <v-col md="8">
                <section>
                    <h2 class="display-1 text-center py-6">Global</h2>

                    <v-simple-table>
                        <tbody>
                            <tr v-for="(value, label) in data.Global" :key="label">
                                <th scope="row" class="py-5 headline">
                                    {{ splitByCapitalLetter(label) }}
                                </th>
                                <td class="headline">
                                    {{ value.toLocaleString() }}
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </section>

                <section>
                    <h2 class="display-1 text-center py-6">Countries</h2>

                    <v-row justify="center">
                        <v-col md="6">
                            <v-text-field
                                clearable
                                label="Search"
                                outlined
                                prepend-inner-icon="mdi-filter"
                                v-model="search"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-data-table
                        :headers="[
                            { text: 'Country', value: 'Country' },
                            { text: 'New Confirmed', value: 'NewConfirmed' },
                            { text: 'Total Confirmed', value: 'TotalConfirmed' },
                            { text: 'New Deaths', value: 'NewDeaths' },
                            { text: 'Total Deaths', value: 'TotalDeaths' },
                            { text: 'New Recovered', value: 'NewRecovered' },
                            { text: 'Total Recovered', value: 'TotalRecovered' },
                            { text: 'Last Update', value: 'Date' },
                        ]"
                        :items-per-page="10"
                        :items="data.Countries"
                        :search="search"
                        item-key="Country"
                    />
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ErrorView from "../components/subcomponents/ErrorView"

    export default {
        components: {
            ErrorView,
        },

        created() {
            const summaryUrl = "https://api.covid19api.com/summary"

            fetch(summaryUrl)
                .then(response => response.json())
                .then(json => (this.data = json))
                .then(() => this.data.Countries.map(d => (d.Date = new Date(d.Date).toLocaleString())))
                .catch(err => (this.error = err))
        },

        data: () => ({
            data: null,
            error: null,
            search: "",
        }),

        methods: {
            splitByCapitalLetter: text => text.match(/[A-Z][a-z]+/g).join(" "), // https://stackoverflow.com/a/7888303
        },

        name: "Home",
    }
</script>

<style scoped></style>
