<script setup lang="ts">
import { ref } from "vue";

interface MenuItem {
    label: string;
    icon?: string;
    route?: { name: string; params?: Record<string, string | number | string[] | number[]> };
    url?: string;
    target?: string;
    submenu?: MenuItem[];
}

const items = ref<MenuItem[]>([
    {
        label: "Home",
        icon: "🏠",
        route: { name: "home" },
    },
    {
        label: "Algorithms",
        icon: "🧠",
        submenu: [
            {
                label: "K-Means",
                route: {
                    name: "algorithm",
                    params: { algorithm: 'kmeans' }
                },
            },
            {
                label: "K-Prototypes",
                route: {
                    name: "algorithm",
                    params: { algorithm: 'kprototypes' }
                },
            },
            {
                label: "GMM",
                route: {
                    name: "algorithm",
                    params: { algorithm: 'gmm' }
                },
            },
            {
                label: "Hierarchical",
                route: {
                    name: "algorithm",
                    params: { algorithm: 'hierarchical' }
                },
            },
            {
                label: "DBSCAN",
                route: {
                    name: "algorithm",
                    params: { algorithm: 'dbscan' }
                },
            },
        ],
    },
    {
        label: "About",
        icon: "ℹ️",
        route: { name: "about" },
    }
]);

const activeDropdown = ref<number | null>(null);
const isMenuOpen = ref(false);

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index;
};

const closeDropdown = () => {
    activeDropdown.value = null;
};

const toggleMobileMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    if (!isMenuOpen.value) {
        activeDropdown.value = null;
    }
};

import { useRouter } from "vue-router";
const router = useRouter();

const handleNavigation = (item: MenuItem) => {
    if (item.route) {
        router.push(item.route);
        // Close dropdowns after navigation
        closeDropdown();
    } else if (item.url) {
        window.location.href = item.url;
    }
};
</script>

<template>
    <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-pink-900/70">

        <div
            class="flex items-center justify-between p-3 px-6 bg-white/10 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:bg-white/15">
            <div class="hidden md:flex items-center gap-2">
                <div v-for="(item, index) in items" :key="index" class="relative"
                    @mouseenter="item.submenu ? toggleDropdown(index) : null" @mouseleave="closeDropdown">
                    <button v-if="item.submenu"
                        class="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:shadow-s hover:text-pink-900 hover:bg-white/10 transition-all duration-300 font-medium"
                        @click="toggleDropdown(index)">
                        <span class="text-lg drop-shadow">{{ item.icon }}</span>
                        <span class="drop-shadow">{{ item.label }}</span>
                        <span class="text-xs ml-1 transition-transform duration-300"
                            :class="{ 'rotate-180': activeDropdown === index }">
                            ▼
                        </span>
                    </button>

                    <button v-else
                        class="flex items-center gap-2 px-4 py-2.5  hover:shadow-sm rounded-xl hover:text-pink-900 hover:bg-white/10 transition-all duration-300 font-medium"
                        @click="handleNavigation(item)">
                        <span class="text-lg drop-shadow">{{ item.icon }}</span>
                        <span class="drop-shadow">{{ item.label }}</span>
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="item.submenu"
                        class="absolute bottom-full left-0 mb-2 w-48 bg-gray-100/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform origin-bottom"
                        :class="{
                            'opacity-100 visible translate-y-0': activeDropdown === index,
                            'opacity-0 invisible -translate-y-2': activeDropdown !== index
                        }">
                        <button v-for="(subItem, subIndex) in item.submenu" :key="subIndex"
                            class="flex items-center gap-3 w-full px-4 py-3 hover:text-pink-900 font-semibold hover:bg-white/10 transition-all duration-200 border-b border-white/10 last:border-0"
                            @click="handleNavigation(subItem)">
                            <span class="text-lg">{{ subItem.icon }}</span>
                            <span>{{ subItem.label }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Backdrop -->
        <div v-if="isMenuOpen" class="fixed inset-0 bg-black/20 z-40" @click="toggleMobileMenu"></div>
    </nav>
</template>