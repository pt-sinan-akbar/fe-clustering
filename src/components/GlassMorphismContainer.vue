<template>
    <div class="flex flex-col items-center justify-between bg-gray-200/20 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl transition-all duration-300 ease-in-out">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: "GlassMorphismContainer",
};
</script>