<template>
    <v-btn :href="href" rel="noreferrer noopener" small target="_blank" text>
        <slot></slot>
        <v-icon v-if="icon" right>{{ icon }}</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "AppExternalLink",

        props: {
            href: String,
            icon: String,
        },
    }
</script>

<style scoped></style>
