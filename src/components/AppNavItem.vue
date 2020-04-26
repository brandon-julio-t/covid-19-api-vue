<template>
  <v-btn :exact="exact" :to="{ name: to }" class="mx-3" text>
    <v-icon left>{{ icon }}</v-icon>
    {{ to }}
  </v-btn>
</template>

<script>
  export default {
    name: "AppNavItem",

    props: {
      exact: Boolean,
      icon: String,
      to: String,
    },
  }
</script>

<style scoped></style>
