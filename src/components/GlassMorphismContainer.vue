<template>
    <div class="flex flex-col items-center justify-between bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl transition-all duration-300 ease-in-out">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: "GlassMorphismContainer",
};
</script>