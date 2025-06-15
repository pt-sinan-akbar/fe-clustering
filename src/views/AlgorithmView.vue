<template>
    <div class="h-[90vh] p-4">
        <div class="h-full w-full font-semibold">
            <GlassMorphismContainer class="grid grid-cols-12 grid-rows-8 gap-4 w-full h-full p-4">
                <GlassMorphismContainer class="col-span-6 row-span-7 h-full w-full overflow-hidden">
                    <RFMScatterPlot :rfmData="customersWithStringCluster" class="w-full h-full" />
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-2 row-span-2 col-start-1 row-start-8 w-full h-full flex flex-col justify-center items-center">
                    <h3 class="text-md font-semibold text-pink-800/70">Calinski-Harabasz Metric</h3>
                    <p class="text-lg font-bold text-pink-600/70">
                        {{ formatDecimal(calinski_harabasz ?? undefined) }}
                    </p>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-2 row-span-2 col-start-3 row-start-8 w-full h-full flex flex-col justify-center items-center">
                    <h3 class="text-md font-semibold text-pink-800/70">Silhouette Metric</h3>
                    <p class="text-lg font-bold text-pink-600/70">
                        {{ formatDecimal(silhouette ?? undefined) }}
                    </p>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-2 row-span-2 col-start-5 row-start-8 w-full h-full flex flex-col justify-center items-center">
                    <h3 class="text-md font-semibold text-pink-800/70">Davies-Bouldin Metric</h3>
                    <p class="text-lg font-bold text-pink-600/70">
                        {{ formatDecimal(davies_bouldin ?? undefined) }}
                    </p>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-6 row-span-4 col-start-7 row-start-2 w-full h-full flex flex-col gap-2 justify-start max-w-full max-h-full p-4">
                    <TheHeader title="Customer Overview" class="w-full text-center" />
                    <GlassMorphismContainer class="overflow-y-hidden w-full h-full flex justify-center items-center">
                        <DataTable v-model:filters="filters" :value="customers" paginator showGridlines :rows="4"
                            dataKey="id" filterDisplay="menu" :loading="loading" size="small"
                            :globalFilterFields="['id', 'recency', 'frequency', 'monetary', 'state', 'cluster']"
                            class="max-w-full max-h-full h-full w-full flex flex-col">
                            <template #loading> Loading customers data. Please wait. </template>
                            <Column field="id" header="Customer ID" style="min-width: 6rem">
                                <template #body="{ data }">
                                    {{ data.id }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" placeholder="Search by ID" />
                                </template>
                            </Column>
                            <Column field="recency" header="Recency" dataType="numeric" style="min-width: 6rem">
                                <template #body="{ data }">
                                    {{ data.recency }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputNumber v-model="filterModel.value" />
                                </template>
                            </Column>
                            <Column field="frequency" header="Frequency" dataType="numeric" style="min-width: 6rem">
                                <template #body="{ data }">
                                    {{ data.frequency }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputNumber v-model="filterModel.value" />
                                </template>
                            </Column>
                            <Column field="monetary" header="Monetary" dataType="numeric" style="min-width: 6rem">
                                <template #body="{ data }">
                                    {{ formatCurrency(data.monetary) }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputNumber v-model="filterModel.value" mode="currency" currency="USD"
                                        locale="en-US" />
                                </template>
                            </Column>
                            <Column field="state" header="State" style="min-width: 4rem">
                                <template #body="{ data }">
                                    {{ data.state }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" placeholder="Search by state" />
                                </template>
                            </Column>
                            <Column field="cluster" header="Cluster" dataType="numeric" style="min-width: 6rem">
                                <template #body="{ data }">
                                    {{ data.cluster }}
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text"
                                        placeholder="Search by cluster" />
                                </template>
                            </Column>
                        </DataTable>
                    </GlassMorphismContainer>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-6 row-span-4 col-start-7 row-start-6 w-full h-full flex flex-col gap-2 justify-start max-w-full max-h-full p-4">
                    <TheHeader title="Clustering Results" class="w-full text-center" />
                    <GlassMorphismContainer
                        class="overflow-hidden border w-full h-full flex justify-center items-center">
                        <DataTable :value="clustering_results" removableSort size="small" :loading="loading"
                            class="max-w-full max-h-full h-full w-full">
                            <template #loading> Loading cluster results data. Please wait. </template>
                            <Column field="cluster" header="Cluster" sortable style="width: 12.5%"></Column>
                            <Column field="count" header="Count" sortable style="width: 12.5%"></Column>
                            <Column field="percentage" header="Percentage" sortable style="width: 12.5%">
                                <template #body="slotProps">
                                    {{ (slotProps.data.percentage).toFixed(2) }}%
                                </template>
                            </Column>
                            <Column field="midwest" header="Mid West" sortable style="width: 12.5%"></Column>
                            <Column field="north" header="North" sortable style="width: 12.5%"></Column>
                            <Column field="northeast" header="Northeast" sortable style="width: 12.5%"></Column>
                            <Column field="south" header="South" sortable style="width: 12.5%"></Column>
                            <Column field="southeast" header="Southeast" sortable style="width: 12.5%"></Column>
                        </DataTable>
                    </GlassMorphismContainer>
                </GlassMorphismContainer>
                <div class="col-span-6 col-start-7 row-start-1 h-full w-full flex items-center justify-between">
                    <h1 class="ml-2 text-5xl font-bold text-pink-800/70 h-full flex items-center justify-center">
                        {{ formatAlgorithmName(algorithm_name) }} Clustering
                    </h1>
                    <div class="col-span-2 col-start-11 row-start-1 h-full flex flex-col items-end justify-center">
                        <p class="text-md font-semibold text-pink-800/70">Algorithm Parameters</p>
                        <div class="grid grid-rows-2 gap-2 w-full" style="grid-auto-flow: column; direction: rtl;">
                            <div v-for="parameter in algorithm_parameters" :key="parameter.name" class="text-right" style="direction: ltr;">
                                <p class="text-pink-600/70 text-xs w-full">{{ parameter.name }}: {{ parameter.value }};</p>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassMorphismContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import TheHeader from '@/components/TheHeader.vue';
import GlassMorphismContainer from '@/components/GlassMorphismContainer.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import RFMScatterPlot from '@/components/RFMScatterPlot.vue';
import { useClusteringStore } from '@/stores/clustering-store';
import { storeToRefs } from 'pinia';
import { formatCurrency, formatDecimal, formatAlgorithmName } from '@/utils/utils';

interface Props {
    algorithm: 'kmeans' | 'kprototypes' | 'dbscan' | 'hierarchical' | 'gmm';
}

const props = defineProps<Props>();

const currentAlgorithm = computed(() => props.algorithm);

const filters = ref();
const loading = ref(false);

const clusteringStore = useClusteringStore();
const { getCurrentAlgorithmData } = storeToRefs(clusteringStore);

const customers = computed(() => getCurrentAlgorithmData.value?.customers || [])
const customersWithStringCluster = computed(() =>
    customers.value.map(c => ({
        ...c,
        cluster: c.cluster != null ? String(c.cluster) : ''
    }))
)
const clustering_results = computed(() => getCurrentAlgorithmData.value?.results || [])
const algorithm_name = computed(() => getCurrentAlgorithmData.value?.algorithm || '')
const algorithm_parameters = computed(() => getCurrentAlgorithmData.value?.parameters || [])

const calinski_harabasz = computed(() => getCurrentAlgorithmData.value?.metrics?.calinski_harabasz)
const silhouette = computed(() => getCurrentAlgorithmData.value?.metrics?.silhouette)
const davies_bouldin = computed(() => getCurrentAlgorithmData.value?.metrics?.davies_bouldin)

onMounted(async () => {
    if (currentAlgorithm.value) {
        await loadAlgorithmData(currentAlgorithm.value);
    }
});

const loadAlgorithmData = async (algorithm: string) => {
    try {
        loading.value = true;
        await clusteringStore.switchToAlgorithm(algorithm);
    } catch (error) {
        console.error('Failed to load algorithm data:', error);
    } finally {
        loading.value = false;
    }
};

// Watch for algorithm changes
watch(currentAlgorithm, async (newAlgorithm) => {
    if (newAlgorithm) {
        await loadAlgorithmData(newAlgorithm);
    }
}, { immediate: true });

const initFilters = () => {
    filters.value = {
        global: {
            value: null,
            matchMode: FilterMatchMode.CONTAINS
        },
        id: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
        },
        recency: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        frequency: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        monetary: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
        },
        state: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
        },
        cluster: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
        }
    };
};

initFilters();
</script>

<style>
.p-datatable-table-container {
    height: 100%;
}

.p-datatable-table {
    height: 100%;
}

.p-datatable-thead {
    padding: 20px;
}

.p-paginator {
    font-size: 12px;
}

/* Fix for DataTable overflow in flex containers */
:deep(.p-datatable-wrapper) {
    overflow: auto;
    height: 100%;
}

:deep(.p-datatable-table) {
    width: 100%;
}
</style>