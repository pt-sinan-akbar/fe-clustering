<script lang="ts">
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <p class="text-xs text-pink-600/70 line-clamp-2">{{ text }}</p>
</template>