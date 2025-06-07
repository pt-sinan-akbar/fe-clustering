<script setup lang="ts">
import GlassMorphismContainer from '@/components/GlassMorphismContainer.vue'
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
    <div class="h-[90vh] p-4">
        <div class="h-full w-full">
            <GlassMorphismContainer class="h-full w-full p-6 flex justify-center gap-10 text-xl font-semibold text-pink-600/70">
                <TheHeader title="🤹‍♀️About" class="w-full text-center text-7xl" />
                <h2 class="w-[50%] indent-20">
                    This thesis was collaboratively written by Sinan, Maulana, and Radit as
                    part of our undergraduate studies. The main objective of our research was to explore customer
                    segmentation techniques using unsupervised machine learning methods.
                    <br />
                    Throughout this project, we implemented and compared five clustering algorithms:
                </h2>
                <ul class="w-[35%] list-disc">
                    <li>K-Means</li>
                    <li>K-Prototypes</li>
                    <li>Gaussian Mixture Models (GMM)</li>
                    <li>Hierarchical Clustering</li>
                    <li>DBSCAN (Density-Based Spatial Clustering of Applications with Noise)</li>
                </ul>
                <h2 class="w-[50%] indent-20">
                    Each algorithm was applied to customer data in order to discover meaningful patterns, segment
                    behavior, and evaluate the quality of clustering results using both visual and statistical
                    approaches. This project reflects our collaborative effort in data preprocessing, algorithm tuning,
                    evaluation, and documentation. We hope that our work contributes to a better understanding of clustering methods and provides
                    valuable insights for future research or practical business applications involving customer
                    segmentation.
                </h2>
            </GlassMorphismContainer>
        </div>
    </div>
</template>
