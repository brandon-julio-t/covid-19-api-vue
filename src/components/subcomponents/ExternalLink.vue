<template>
    <v-btn :href="href" rel="noreferrer noopener" small target="_blank" text>
        <slot></slot>
        <v-icon v-if="icon">{{ icon }}</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "ExternalLink",
        props: ["href", "icon"],
    }
</script>

<style scoped></style>
