<template>
    <v-btn :to="{ name: to }" :exact="exact" text>{{ to }}</v-btn>
</template>

<script>
    export default {
        name: "NavItem",
        props: ["to", "exact"],
    }
</script>

<style scoped></style>
