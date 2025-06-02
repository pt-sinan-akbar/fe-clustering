<script setup lang="ts">
import { ref } from "vue";

interface MenuItem {
    label: string;
    icon?: string;
    route?: { name: string };
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
        label: "About",
        icon: "ℹ️",
        route: { name: "about" },
    },
    {
        label: "Algorithms",
        icon: "🧠",
        submenu: [
            {
                label: "K-Means",
                route: { name: "kmeans" },
            },
            {
                label: "K-Prototypes",
                route: { name: "kprototypes" },
            },
            {
                label: "GMM",
                route: { name: "GMM" },
            },
            {
                label: "Hierarchical",
                route: { name: "hierarchical" },
            },
            {
                label: "DBSCAN",
                route: { name: "dbscan" },
            },


        ],
    },
    {
        label: "Comparison",
        icon: "📊",
        route: { name: "comparison" },
    },
    {
        label: "Results",
        icon: "📈",
        route: { name: "results" },
    },
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

const handleNavigation = (item: MenuItem) => {
    if (item.route) {
        // Handle Vue Router navigation
        console.log('Navigate to:', item.route);
        // router.push(item.route);
    } else if (item.url) {
        if (item.target === '_blank') {
            window.open(item.url, '_blank');
        } else {
            window.location.href = item.url;
        }
    }
    closeDropdown();
    isMenuOpen.value = false;
};
</script>

<template>
    <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-pink-900/70">
        <!-- Desktop Navigation -->

        <div class="flex items-center justify-between p-3 px-6 bg-white/10 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:bg-white/15">
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-2">
                <div v-for="(item, index) in items" 
                     :key="index" 
                     class="relative"
                     @mouseenter="item.submenu ? toggleDropdown(index) : null" 
                     @mouseleave="closeDropdown">
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
                         :class="{ 'opacity-100 visible translate-y-0': activeDropdown === index, 
                                 'opacity-0 invisible -translate-y-2': activeDropdown !== index }">
                        <button v-for="(subItem, subIndex) in item.submenu" 
                                :key="subIndex"
                                class="flex items-center gap-3 w-full px-4 py-3 hover:text-pink-900 font-semibold hover:bg-white/10 transition-all duration-200 border-b border-white/10 last:border-0"
                                @click="handleNavigation(subItem)">
                            <span class="text-lg">{{ subItem.icon }}</span>
                            <span>{{ subItem.label }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2" @click="toggleMobileMenu">
                <div class="w-6 h-5 relative flex flex-col justify-between">
                    <span class="w-full h-0.5 bg-white rounded-full transition-all duration-300"
                          :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
                    <span class="w-full h-0.5 bg-white rounded-full transition-all duration-300"
                          :class="{ 'opacity-0': isMenuOpen }"></span>
                    <span class="w-full h-0.5 bg-white rounded-full transition-all duration-300"
                          :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
                </div>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-h-[80vh] overflow-y-auto"
             :class="{ 'opacity-100 visible translate-y-0': isMenuOpen, 
                      'opacity-0 invisible -translate-y-4': !isMenuOpen }">
            <!-- Mobile menu items here - similar structure but with mobile-specific classes -->
        </div>

        <!-- Backdrop -->
        <div v-if="isMenuOpen" 
             class="fixed inset-0 bg-black/20 z-40"
             @click="toggleMobileMenu"></div>
    </nav>
</template>
