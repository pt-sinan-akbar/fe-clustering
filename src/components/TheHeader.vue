<script lang="ts">
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <h1 class="text-2xl font-semibold text-pink-800/70">{{ title }}</h1>
</template>
