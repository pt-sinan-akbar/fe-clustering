import { defineStore } from 'pinia'
import axios from 'axios'

interface Algorithm {
    id: number
    name: string
}

interface Customer {
    id: string
    recency: number
    frequency: number
    monetary: number
    state: string
    dbscan_cluster: number;
    hierarchical_cluster: number;
    gmm_cluster: number;
    kmeans_cluster: number;
    kprototypes_cluster: number;
}

interface ClusteringResult {
    cluster: number
    customer_count: number
    percentage: number
    mid_west: number
    north: number
    northeast: number
    south: number
    southeast: number
}

interface AlgorithmParameter {
    name: string
    value: number | string | boolean
    type: 'number' | 'string' | 'boolean'
}

interface MetricResult {
    id: number
    algorithm_id: number
    metric_name: string
    metric_value: number
}

interface ClusteringMetrics {
    silhouette: number | null
    calinski_harabasz: number | null
    davies_bouldin: number | null
}

interface CustomerWithCluster extends Customer {
    cluster: number;
}

interface ClusteringData {
    algorithm: string;
    customers: CustomerWithCluster[]
    results: ClusteringResult[]
    metrics: ClusteringMetrics | null
    parameters: AlgorithmParameter[]
}

function getClusterForCustomer(customer: Customer, algorithm: string): number {
    switch (algorithm.toLowerCase()) {
        case 'dbscan':
            return customer.dbscan_cluster;
        case 'hierarchical':
            return customer.hierarchical_cluster;
        case 'gmm':
            return customer.gmm_cluster;
        case 'kmeans':
            return customer.kmeans_cluster;
        case 'kprototypes':
            return customer.kprototypes_cluster;
        default:
            return 0;
    }
}

export const useClusteringStore = defineStore('clustering', {
    state: () => ({
        currentAlgorithm: '',
        currentAlgorithmId: null as number | null,
        algorithms: [] as Algorithm[],
        customersData: [] as Customer[],
        isCustomersDataFetched: false,

        algorithmData: new Map<number, {
            results: ClusteringResult[]
            metrics: ClusteringMetrics | null
            parameters: AlgorithmParameter[]
        }>(),
    }),

    getters: {
        getCurrentAlgorithmData(): ClusteringData | null {
            if (!this.currentAlgorithm || !this.currentAlgorithmId) return null;

            const algorithmSpecificData = this.algorithmData.get(this.currentAlgorithmId);
            if (!algorithmSpecificData) return null;

            const customersWithCluster: CustomerWithCluster[] = this.customersData.map(customer => ({
                ...customer,
                cluster: getClusterForCustomer(customer, this.currentAlgorithm)
            }));

            return {
                algorithm: this.currentAlgorithm,
                customers: customersWithCluster,
                results: algorithmSpecificData.results,
                metrics: algorithmSpecificData.metrics,
                parameters: algorithmSpecificData.parameters
            };
        }
    },

    actions: {
        getClusterForCustomer(customer: Customer, algorithm: string): number {
            return getClusterForCustomer(customer, algorithm);
        },

        getAlgorithmIdByName(algorithmName: string): number | null {
            const normalizedSearch = algorithmName.toLowerCase().replace(/-/g, '');

            const algorithm = this.algorithms.find(algo => {
                const normalizedName = algo.name.toLowerCase().replace(/-/g, '');
                return normalizedName === normalizedSearch;
            });

            return algorithm ? algorithm.id : null;
        },

        async fetchCustomersData() {
            if (this.isCustomersDataFetched) {
                return;
            }

            try {
                const customersResponse = await axios.get('/api/v1/clustering/customers');
                const customersData = await customersResponse.data;
                this.customersData = customersData;
                this.isCustomersDataFetched = true;
            } catch (error) {
                console.error('Error fetching customers data:', error);
                throw error;
            }
        },

        async fetchAlgorithmsData() {
            if (this.algorithms.length > 0) {
                return;
            }

            try {
                const algorithmsResponse = await axios.get('/api/v1/clustering/algorithms');
                const algorithmsData = await algorithmsResponse.data;
                this.algorithms = algorithmsData;
            } catch (error) {
                console.error('Error fetching algorithms data:', error);
                throw error;
            }
        },

        async fetchAlgorithmSpecificData(algorithmId: number) {
            if (this.algorithmData.has(algorithmId)) {
                return;
            }

            try {
                const [resultsResponse, metricsResponse, paramsResponse] = await Promise.all([
                    axios.get(`/api/v1/clustering/clustering-results/${algorithmId}`),
                    axios.get(`/api/v1/clustering/metric-results/${algorithmId}`),
                    axios.get(`/api/v1/clustering/parameters/${algorithmId}`)
                ]);

                const [resultsData, metricsData, paramsData] = await Promise.all([
                    resultsResponse.data,
                    metricsResponse.data,
                    paramsResponse.data
                ]);

                console.log(`Metrics for algorithm ID ${algorithmId}:`, metricsData);

                const metric_data: ClusteringMetrics = {
                    silhouette: null,
                    calinski_harabasz: null,
                    davies_bouldin: null
                };

                (metricsData as MetricResult[]).forEach(metric => {
                    if (metric.metric_name === 'silhouette_score') {
                        metric_data.silhouette = parseFloat(metric.metric_value.toFixed(4));
                    } else if (metric.metric_name === 'calinski_harabasz_score') {
                        metric_data.calinski_harabasz = parseFloat(metric.metric_value.toFixed(2));
                    }
                    else if (metric.metric_name === 'davies_bouldin_score') {
                        metric_data.davies_bouldin = parseFloat(metric.metric_value.toFixed(2));
                    }
                });

                this.algorithmData.set(algorithmId, {
                    results: resultsData,
                    metrics: metric_data,
                    parameters: paramsData
                });

            } catch (error) {
                console.error(`Error fetching data for algorithm ID ${algorithmId}:`, error);
                throw error;
            }
        },

        async initializeData() {
            try {
                await Promise.all([
                    this.fetchAlgorithmsData(),
                    this.fetchCustomersData()
                ]);
            } catch (error) {
                console.error('Error initializing base data:', error);
                throw error;
            }
        },

        async switchToAlgorithm(algorithmName: string) {
            this.currentAlgorithm = algorithmName;

            await this.initializeData();

            // Get algorithm_id by name
            const algorithmId = this.getAlgorithmIdByName(algorithmName);
            if (!algorithmId) {
                throw new Error(`Algorithm '${algorithmName}' not found`);
            }

            this.currentAlgorithmId = algorithmId;
            await this.fetchAlgorithmSpecificData(algorithmId);
        },

        // Alternative method to switch by algorithm_id directly
        async switchToAlgorithmById(algorithmId: number) {
            await this.initializeData();

            // Find algorithm name by ID
            const algorithm = this.algorithms.find(algo => algo.id === algorithmId);
            if (!algorithm) {
                throw new Error(`Algorithm with ID ${algorithmId} not found`);
            }

            this.currentAlgorithm = algorithm.name;
            this.currentAlgorithmId = algorithmId;
            await this.fetchAlgorithmSpecificData(algorithmId);
        },

        async runKMeans() {
            await this.switchToAlgorithm('kmeans');
        },

        async runKPrototypes() {
            await this.switchToAlgorithm('kprototypes');
        },

        async runDBSCAN() {
            await this.switchToAlgorithm('dbscan');
        },

        async runHierarchical() {
            await this.switchToAlgorithm('hierarchical');
        },

        async runGaussianMixture() {
            await this.switchToAlgorithm('gmm');
        },

        async preloadAllAlgorithmData() {
            await this.initializeData();

            // Get all algorithm IDs from the fetched algorithms
            const algorithmIds = this.algorithms.map(algo => algo.id);

            await Promise.all(
                algorithmIds.map(algorithmId => this.fetchAlgorithmSpecificData(algorithmId))
            );
        },

        clearCache() {
            this.customersData = [];
            this.isCustomersDataFetched = false;
            this.algorithmData.clear();
            this.algorithms = [];
            this.currentAlgorithmId = null;
        }
    }
})
