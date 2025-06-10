<script setup lang="ts">
import GlassMorphismContainer from '@/components/GlassMorphismContainer.vue'

const algorithms = [
    {
        name: 'DBSCAN',
        description: 'Density-based clustering for arbitrary shaped clusters',
        icon: '🎯'
    },
    {
        name: 'K-Means',
        description: 'Centroid-based clustering with spherical clusters',
        icon: '⭕'
    },
    {
        name: 'K-Prototypes',
        description: 'Extension of K-Means for mixed data types',
        icon: '🔀'
    },
    {
        name: 'Hierarchical',
        description: 'Tree-based clustering with dendrogram visualization',
        icon: '🌳'
    },
    {
        name: 'GMM',
        description: 'Probabilistic clustering with Gaussian distributions',
        icon: '📊'
    }
]

const evaluationMetrics = [
    { name: 'Silhouette Score', description: 'Measures cluster cohesion and separation', icon: '📏' },
    { name: 'Davies-Bouldin Index', description: 'Evaluates cluster compactness and separation', icon: '📐' },
    { name: 'Calinski-Harabasz Index', description: 'Ratio of between-cluster to within-cluster dispersion', icon: '📊' }
]

const systemSpecs = [
    { component: 'RAM', spec: '128GB', icon: '💾' },
    { component: 'Storage', spec: '20GB HDD', icon: '💿' },
    { component: 'OS', spec: 'Ubuntu 24.04', icon: '🖱️' },
    { component: 'Python', spec: 'Python 3.11', icon: '🐍' },
    { component: 'Processor', spec: 'Intel Xeon Platinum 8488C @3.796GHz', icon: '🖥️' },
]

const objectives = [
    'Compare clustering algorithm performance',
    'Evaluate algorithm efficiency',
    'Identify and analyze cluster characteristics',
    'Provide insights for customer segmentation',
    'Visualize clustering results'
]

const methodology = [
    { step: 'Data Preparation', description: 'Cleaning and preprocessing the dataset', icon: '📝' },
    { step: 'Algorithm Execution', description: 'Running clustering algorithms on the dataset', icon: '⚡' },
    { step: 'Evaluation', description: 'Assessing clustering results using metrics', icon: '📊' },
    { step: 'Analysis', description: 'Interpreting and visualizing clustering outcomes', icon: '📈' }
]

const keyFindings = [
    {
        title: 'DBSCAN Best Performance',
        description: 'DBSCAN achieved the best clustering performance with distinct customer segments.',
        icon: '🏆',
        results: [
            {
                label: 'Valuable Customers',
                description: 'High value inactive customers (0.38%)',
                icon: '🔴'
            },
            {
                label: 'Gone Customers',
                description: 'Inactive single-transaction customers (86.37%)',
                icon: '⚫'
            },
            {
                label: 'Regular Customers',
                description: 'Active multi-transaction customers (13.05%)',
                icon: '🔵'
            },
            {
                label: 'Rookies',
                description: 'Low-value inactive customers (0.21%)',
                icon: '🟡'
            }
        ]
    }
]
</script>

<template>
    <div class="h-screen p-4">
        <div class="h-full w-full font-semibold">
            <div class="grid grid-cols-5 grid-rows-10 gap-4 w-full h-full">
                <!-- Title - Full Width -->
                <div class="col-span-5 row-span-2 h-full w-full">
                    <GlassMorphismContainer class="overflow-hidden flex justify-center items-center h-full">
                        <h2 class="text-4xl font-bold text-pink-800/80 mb-3 flex items-center">
                            <span class="mr-2">📚</span> Clustering Algorithms Comparison
                        </h2>
                    </GlassMorphismContainer>
                </div>

                <!-- Dataset Info -->
                <div class="row-start-3 row-span-3 h-full w-full">
                    <GlassMorphismContainer
                        class="overflow-hidden flex flex-col justify-center items-center h-full w-full p-4">
                        <h3 class="text-sm font-bold text-pink-800/80 mb-3 flex items-center w-full justify-center">
                            <span class="mr-2 text-lg">📊Dataset Info</span>
                        </h3>
                        <div class="grid grid-cols-3 gap-2 mb-3 w-full justify-evenly px-10">
                            <div class="text-center">
                                <p class="text-lg font-bold text-pink-600/80">93,335</p>
                                <p class="text-md text-pink-600/80">Points</p>
                            </div>
                            <div class="text-center">
                                <p class="text-lg font-bold text-pink-600/80">RFM+D</p>
                                <p class="text-md text-pink-600/80">Features</p>
                            </div>
                            <div class="text-center">
                                <p class="text-lg font-bold text-pink-600/80">Mixed</p>
                                <p class="text-md text-pink-600/80">Type</p>
                            </div>
                        </div>
                        <GlassMorphismContainer class="p-2">
                            <p class="text-xs text-pink-600/80 text-center">
                                <strong>R</strong>ecency, <strong>F</strong>requency, <strong>M</strong>onetary,
                                <strong>D</strong>emography
                            </p>
                        </GlassMorphismContainer>
                    </GlassMorphismContainer>
                </div>

                <!-- Algorithms Used -->
                <div class="col-span-2 row-span-5 col-start-2 row-start-3">
                    <GlassMorphismContainer class="overflow-hidden flex flex-col w-full h-full p-4">
                        <h3 class="text-sm font-bold text-pink-800/80 mb-3 flex items-center">
                            <span class="mr-2 text-lg">🔬Algorithms Used</span>
                        </h3>
                        <div class="flex flex-col gap-2 flex-1 w-full">
                            <div v-for="i in Math.ceil(algorithms.length / 2)" :key="i"
                                class="flex gap-2 flex-1 w-full">
                                <GlassMorphismContainer v-for="algorithm in algorithms.slice((i - 1) * 2, i * 2)"
                                    :key="algorithm.name" class="p-2 flex-1 flex flex-col items-center justify-center">
                                    <div class="flex items-center gap-2 mb-1 w-full justify-center">
                                        <span class="text-lg">{{ algorithm.icon }}</span>
                                        <p class="text-md font-semibold text-pink-800/80">{{ algorithm.name }}</p>
                                    </div>
                                    <p class="text-xs text-pink-600/80 line-clamp-2">{{ algorithm.description }}</p>
                                </GlassMorphismContainer>
                            </div>
                        </div>
                    </GlassMorphismContainer>
                </div>

                <!-- Methodology -->
                <div class="row-span-5 col-start-4 row-start-3 h-full w-full">
                    <GlassMorphismContainer class="overflow-hidden h-full w-full p-4 flex flex-col">
                        <h3 class="text-sm font-bold text-pink-800/80 mb-3 flex items-center">
                            <span class="mr-2 text-lg">🔄Methodology</span> 
                        </h3>
                        <div class="flex flex-col gap-3 flex-1 w-full">
                            <GlassMorphismContainer v-for="method in methodology" :key="method.step"
                                class="p-2 flex-1 flex flex-col items-center justify-center">
                                <div class="flex items-center gap-2 mb-1 w-full justify-center">
                                    <span class="text-lg">{{ method.icon }}</span>
                                    <p class="text-md font-semibold text-pink-800/80">{{ method.step }}</p>
                                </div>
                                <p class="text-xs text-pink-600/80 line-clamp-2">{{ method.description }}</p>
                            </GlassMorphismContainer>
                        </div>
                    </GlassMorphismContainer>
                </div>

                <!-- Objectives -->
                <div class="row-span-5 col-start-5 row-start-3 h-full w-full">
                    <GlassMorphismContainer class="overflow-hidden h-full w-full p-4 flex flex-col">
                        <h3 class="text-sm font-bold text-pink-800/80 mb-3 flex items-center">
                            <span class="mr-2 text-lg">🎯Objectives</span>
                        </h3>
                        <div class="flex flex-col gap-2 flex-1 w-full">
                            <GlassMorphismContainer v-for="(objective, index) in objectives" :key="index"
                                class="p-4 flex-1 flex flex-col items-center justify-center">
                                <span class="text-xs text-pink-800/80 w-full">🎯 {{ objective }}</span>
                            </GlassMorphismContainer>
                        </div>
                    </GlassMorphismContainer>
                </div>

                <!-- System Specs -->
                <div class="row-span-4 col-start-1 row-start-6 w-full h-full">
                    <GlassMorphismContainer class="overflow-hidden h-full w-full p-4 flex flex-col">
                        <h3 class="text-sm font-bold text-pink-800/80 mb-3 flex items-center w-full justify-center">
                            <span class="mr-2 text-lg">⚙️System Specs</span>
                        </h3>
                        <div class="flex flex-col gap-2 flex-1 w-full">
                            <div v-for="i in Math.ceil(systemSpecs.length / 2)" :key="i" class="flex gap-2 flex-1">
                                <GlassMorphismContainer v-for="spec in systemSpecs.slice((i - 1) * 2, i * 2)"
                                    :key="spec.component" class="p-2 flex-1 flex flex-col items-center justify-center">
                                    <div class="flex items-center gap-2 mb-1 w-full justify-center">
                                        <span class="text-lg">{{ spec.icon }}</span>
                                        <p class="text-xs font-bold text-pink-800/80">{{ spec.component }}</p>
                                    </div>
                                    <p class="text-xs font-semibold text-pink-600/80 line-clamp-2">{{ spec.spec }}</p>
                                </GlassMorphismContainer>
                            </div>
                        </div>
                    </GlassMorphismContainer>
                </div>

                <!-- Evaluation Metrics -->
                <div class="row-span-2 col-span-2 col-start-2 row-start-8 h-full w-full">
                    <GlassMorphismContainer class="overflow-hidden h-full w-full p-4 flex flex-col">
                        <h3 class="text-lg font-bold text-pink-800/80 mb-3 flex items-center">
                            <span class="mr-2">📈</span> Evaluation Metrics
                        </h3>
                        <div class="grid grid-cols-3 gap-2 flex-1">
                            <GlassMorphismContainer v-for="metric in evaluationMetrics" :key="metric.name"
                                class="p-2 flex-1 flex flex-col items-center justify-center">
                                <div class="flex items-center gap-2 mb-2 w-full justify-center">
                                    <span class="text-lg">{{ metric.icon }}</span>
                                    <p class="text-md font-semibold text-pink-800/80">{{ metric.name }}</p>
                                </div>
                                <p class="text-xs text-center text-pink-600/80 line-clamp-2">{{ metric.description }}
                                </p>
                            </GlassMorphismContainer>
                        </div>
                    </GlassMorphismContainer>
                </div>

                <!-- Key Findings -->
                <div class="row-span-2 col-span-2 col-start-4 row-start-8 h-full w-full">
                    <GlassMorphismContainer class="overflow-hidden h-full w-full p-4 flex flex-col">
                        <h3 class="text-lg font-bold text-pink-800/80 mb-3 flex items-center">
                            <span class="mr-2">🏆</span> Key Findings (DBSCAN)
                        </h3>
                        <div class="flex flex-row gap-2 flex-1">
                            <div class="flex flex-row gap-2 flex-1">
                                <GlassMorphismContainer
                                    v-for="result in keyFindings[0].results"
                                    :key="result.label"
                                    class="p-2 flex-1 flex flex-col items-center justify-center relative overflow-visible"
                                >
                                    <span
                                        class="text-2xl absolute -top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                                        style="pointer-events: none;"
                                        aria-hidden="true"
                                    >
                                        {{ result.icon }}
                                    </span>
                                    <div class="flex items-center mb-1 w-full justify-center gap-1 mt-0">
                                        <p class="text-md font-semibold text-pink-800/80">{{ result.label }}</p>
                                    </div>
                                    <p class="text-xs text-center text-pink-600/80 line-clamp-2">{{ result.description }}</p>
                                </GlassMorphismContainer>
                            </div>
                        </div>
                    </GlassMorphismContainer>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>