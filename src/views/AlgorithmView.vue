<template>
    <div class="h-[90vh] p-4">
        <div class="h-full w-full font-semibold">
            <GlassMorphismContainer class="grid grid-cols-12 grid-rows-8 gap-4 w-full h-full p-4">
                <GlassMorphismContainer class="col-span-6 row-span-7 h-full w-full overflow-hidden">
                    <RFMScatterPlot :rfmData="customers" class="w-full h-full" />
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-2 row-span-2 col-start-1 row-start-8 w-full h-full flex flex-col justify-center items-center">
                    <h3 class="text-md font-semibold text-pink-800/70">Calinski-Harabasz Metric</h3>
                    <p class="text-lg font-bold text-pink-600/70">xxxx,xx</p>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-2 row-span-2 col-start-3 row-start-8 w-full h-full flex flex-col justify-center items-center">
                    <h3 class="text-md font-semibold text-pink-800/70">Silhouette Metric</h3>
                    <p class="text-lg font-bold text-pink-600/70">xxxx,xx</p>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-2 row-span-2 col-start-5 row-start-8 w-full h-full flex flex-col justify-center items-center">
                    <h3 class="text-md font-semibold text-pink-800/70">Davies-Bouldin Metric</h3>
                    <p class="text-lg font-bold text-pink-600/70">xxxx,xx</p>
                </GlassMorphismContainer>
                <GlassMorphismContainer
                    class="col-span-6 row-span-4 col-start-7 row-start-2 w-full h-full flex flex-col gap-2 justify-start max-w-full max-h-full p-4">
                    <TheHeader title="Customer Overview" class="w-full text-center" />
                    <GlassMorphismContainer class="overflow-y-hidden w-full h-full flex justify-center items-center">
                        <DataTable v-model:filters="filters" :value="customers" paginator showGridlines :rows="4"
                            dataKey="id" filterDisplay="menu" :loading="loading" size="medium"
                            :globalFilterFields="['id', 'recency', 'frequency', 'monetary', 'state', 'cluster']"
                            class="max-w-full max-h-full h-full w-full flex flex-col" tableStyle="font-size: 12px;">
                            <template #empty> No customers found. </template>
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
                                    <InputText v-model="filterModel.value" type="text" placeholder="Search by cluster" />
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
                        <DataTable :value="clustering_results" removableSort size="medium" tableStyle="font-size: 12px"
                            class="max-w-full max-h-full h-full w-full">
                            <Column field="cluster" header="Cluster" sortable style="width: 12.5%"></Column>
                            <Column field="customer_count" header="Count" sortable style="width: 12.5%"></Column>
                            <Column field="percentage" header="Percentage" sortable style="width: 12.5%">
                                <template #body="slotProps">
                                    {{ (slotProps.data.percentage).toFixed(2) }}%
                                </template>
                            </Column>
                            <Column field="mid_west" header="Mid West" sortable style="width: 12.5%"></Column>
                            <Column field="north" header="North" sortable style="width: 12.5%"></Column>
                            <Column field="northeast" header="Northeast" sortable style="width: 12.5%"></Column>
                            <Column field="south" header="South" sortable style="width: 12.5%"></Column>
                            <Column field="southeast" header="Southeast" sortable style="width: 12.5%"></Column>
                        </DataTable>
                    </GlassMorphismContainer>
                </GlassMorphismContainer>
                <div class="col-span-6 col-start-7 row-start-1 h-full w-full flex items-center justify-between">
                    <h1 class="text-5xl font-bold text-pink-800/70 h-full flex items-center justify-center">
                        DBSCAN Clustering
                    </h1>
                    <div class="col-span-2 col-start-11 row-start-1 h-full flex flex-col items-end justify-center">
                        <p class="text-md font-semibold text-pink-800/70">Algorithm Parameters</p>
                        <p class="text-pink-600/70 text-xs">MinPts: 12</p>
                        <p class="text-pink-600/70 text-xs">Epsilon: 0,167</p>
                    </div>
                </div>
            </GlassMorphismContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import TheGraph from '@/components/RFMScatterPlot.vue';
import TheHeader from '@/components/TheHeader.vue';
import GlassMorphismContainer from '@/components/GlassMorphismContainer.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import RFMScatterPlot from '@/components/RFMScatterPlot.vue';

const clustering_results = [
    {
        cluster: '-1',
        customer_count: 347,
        percentage: 0.38,
        mid_west: 17,
        north: 7,
        northeast: 18,
        south: 45,
        southeast: 260
    },
    {
        cluster: '0',
        customer_count: 78933,
        percentage: 86.37,
        mid_west: 4587,
        north: 1502,
        northeast: 7556,
        south: 11296,
        southeast: 53992
    },
    {
        cluster: '1',
        customer_count: 11925,
        percentage: 13.05,
        mid_west: 733,
        north: 191,
        northeast: 1010,
        south: 1739,
        southeast: 8252
    },
    {
        cluster: '2',
        customer_count: 188,
        percentage: 0.21,
        mid_west: 9,
        north: 3,
        northeast: 24,
        south: 32,
        southeast: 120
    }
];

const customers = ref();
const filters = ref();
const loading = ref(false);

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

customers.value = [
    { id: 'C001', recency: 10, frequency: 5, monetary: 150.00, state: 'CA', cluster: '0' },
    { id: 'C002', recency: 20, frequency: 3, monetary: 200.00, state: 'NY', cluster: '1' },
    { id: 'C003', recency: 5, frequency: 10, monetary: 300.00, state: 'TX', cluster: '0' },
    { id: 'C004', recency: 15, frequency: 2, monetary: 100.00, state: 'FL', cluster: '-1' },
    { id: 'C005', recency: 30, frequency: 1, monetary: 50.00, state: 'WA', cluster: '2' }  
];

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};
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