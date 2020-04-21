<template>
    <v-btn :exact="exact" :to="{ name: to }" class="mx-3" text>{{ to }}</v-btn>
</template>

<script>
    export default {
        name: "NavItem",
        props: ["to", "exact"],
    }
</script>

<style scoped></style>
