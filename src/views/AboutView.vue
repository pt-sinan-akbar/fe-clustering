<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GlassMorphismContainer from '@/components/GlassMorphismContainer.vue'
import TheHeader from '@/components/TheHeader.vue'
import sinanImg from '@/assets/sinan.jpg'
import maulanaImg from '@/assets/maulana.jpg'   
import raditImg from '@/assets/radit.jpg'

const isVisible = ref(false)
const textVisible = ref(false)

const authors = [
    {
        name: 'Sinan',
        color: 'from-pink-500/20 to-purple-500/20',
        textColor: 'text-pink-400',
        photo: sinanImg,
    },
    {
        name: 'Maulana',
        color: 'from-blue-500/20 to-cyan-500/20',
        textColor: 'text-blue-400',
        photo: maulanaImg,
    },
    {
        name: 'Radit',
        color: 'from-green-500/20 to-teal-500/20',
        textColor: 'text-green-400',
        photo: raditImg,
    }
]

onMounted(() => {
    setTimeout(() => isVisible.value = true, 300)
    setTimeout(() => textVisible.value = true, 800)
})
</script>

<template>
    <div class="min-h-screen w-screen overflow-hidden">
        <div class="flex items-center justify-center min-h-screen">
            <div class="w-full max-w-6xl mx-auto">
                <GlassMorphismContainer class="relative overflow-hidden transition-all duration-1000 transform py-10"
                    :class="isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'">

                    <div class="text-center mb-12 relative">
                        <TheHeader title="About"
                            class="text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse" />
                    </div>

                    <div class="space-y-12">
                        <div class="transition-all duration-1000 transform"
                            :class="textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                <div v-for="(author, index) in authors" :key="author.name"
                                    class="group cursor-pointer transition-all duration-500 hover:scale-105"
                                    :style="{ animationDelay: (index * 200) + 'ms' }">
                                    <GlassMorphismContainer
                                        :class="`p-6 bg-gradient-to-br ${author.color} border border-white/20 hover:border-white/40 transition-all duration-500 text-center hover:shadow-2xl`">

                                        <div class="relative mb-6">
                                            <div
                                                class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/60 transition-all duration-500 shadow-lg">
                                                <img :src="author.photo" :alt="author.name + ' photo'"
                                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy" />
                                            </div>
                                        </div>

                                        <h3
                                            :class="`font-bold text-2xl ${author.textColor} group-hover:text-white transition-colors duration-500 mb-2`">
                                            {{ author.name }}
                                        </h3>
                                    </GlassMorphismContainer>
                                </div>
                            </div>
                        </div>

                        <div class="transition-all duration-1000 transform"
                            :class="textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
                            <div class="max-w-4xl mx-auto">
                                <div class="text-xl leading-relaxed text-white/80 space-y-6">
                                    <p class="text-pink-500/70 font-semibold text-justify indent-20">
                                        This thesis is a collaborative effort by a dedicated team of students from the
                                        Bina Nusantara University. Our goal is to compare and analyze clustering
                                        algorithms for customer segmentation in e-commerce data, evaluating their
                                        effectiveness using evaluation metric such as Calinski-Harabasz Index,
                                        Silhouette Score, and Davies-Bouldin Index. The algorithms we focused on include
                                        K-Means, K-Prototypes, DBSCAN, and Hierarchical, and also Gaussian Mixture
                                        Modelling (GMM).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassMorphismContainer>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover\:scale-105:hover {
    transform: scale(1.05);
}
</style>