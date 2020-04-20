<template>
    <v-container>
        <h1 class="display-4 text-center py-6">Summary</h1>

        <v-skeleton-loader v-if="!data" type="table"></v-skeleton-loader>
        <div v-else>
            <h2 class="display-3 text-center py-12">Global</h2>

            <v-row justify="center">
                <v-col md="8">
                    <v-simple-table>
                        <tbody>
                            <tr v-for="(value, label) in data.Global" :key="label">
                                <th scope="row" class="py-5 display-2">
                                    {{ splitByCapitalLetter(label) }}
                                </th>
                                <td class="display-1">
                                    {{ value.toLocaleString() }}
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-col>
            </v-row>

            <v-spacer class="py-12"></v-spacer>

            <h2 class="display-3 text-center py-12" id="Countries">Countries</h2>

            <v-row justify="center">
                <v-col md="3">
                    <v-text-field
                        append-icon="mdi-filter"
                        clearable
                        label="Search"
                        outlined
                        v-model="search"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col md="8">
                    <v-data-table
                        :headers="[
                            { text: 'Country', value: 'Country' },
                            { text: 'New Confirmed', value: 'NewConfirmed' },
                            {
                                text: 'Total Confirmed',
                                value: 'TotalConfirmed',
                            },
                            { text: 'New Deaths', value: 'NewDeaths' },
                            { text: 'Total Deaths', value: 'TotalDeaths' },
                            { text: 'New Recovered', value: 'NewRecovered' },
                            {
                                text: 'Total Recovered',
                                value: 'TotalRecovered',
                            },
                            { text: 'Last Update', value: 'Date' },
                        ]"
                        :items-per-page="10"
                        :items="data.Countries"
                        :search="search"
                        item-key="Country"
                    ></v-data-table>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                data: null,
                search: "",
            }
        },
        methods: {
            splitByCapitalLetter: function (text) {
                return text.match(/[A-Z][a-z]+/g).join(" ") // https://stackoverflow.com/a/7888303
            },
        },
        created() {
            fetch("https://api.covid19api.com/summary")
                .then(data => data.json())
                .then(json => {
                    this.data = json
                })
                .then(() => {
                    this.data.Countries.map(d => {
                        d.Date = new Date(d.Date).toLocaleString()
                        return d
                    })
                })
        },
    }
</script>

<style scoped></style>
